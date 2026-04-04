
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { JWT_SECRET, COOKIE_NAME } from '../passport';
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data.source';
import { Roleenum, User } from '../entities/User';
import passport from 'passport';
import { sessionStore } from '../utils/sessionstore';
import * as bcrypt from 'bcryptjs';
import { hash } from 'node:crypto';
import { clearOTP, generateOTP, verifyOTP } from '../utils/otpservice';

export class AuthController {
private static userRepo = AppDataSource.getRepository(User);

static async create(req: Request, res: Response): Promise<void>{
  const { name, email, password, address, contactno, dateofbirth, role   } = req.body as { email?: string; name?:string; password?: string; address?:string; contactno?:string; dateofbirth?:string; role?: Roleenum };
  if (!name || !email || !password ||!address || !contactno || !dateofbirth) {
    res.status(400).json({ error: 'Mandatory fields are required' });
    return;
  }


  if (await AuthController.userRepo.findOneBy({ email : email })) {
    res.status(409).json({ error: 'Username already taken' });
    return;
  }
    
  const user =  AuthController.userRepo.create({ name: name, email: email, password: await bcrypt.hash(password, 10), role: role, address: address, contactno: contactno, dateofbirth: dateofbirth });
  await AuthController.userRepo.save(user);
  res.status(201).json({ message: 'Registered successfully' });
};

static async Login(req: Request, res: Response, next: NextFunction): Promise<void> {
  passport.authenticate('local', (err: any, user: User | false, info: any) => {
    
    if (err) return next(err); 
    if (!user) {

      res.status(401).json({ error: info?.message || 'Invalid credentials' });
      return;
    }
    const jti = uuidv4();
    const token = jwt.sign({ sub: user.id, jti }, JWT_SECRET, { expiresIn: '7d' });

    sessionStore.create(jti, {
      userId: user.id,
      email: user.email,
      createdAt: new Date(),
      userAgent: req.headers['user-agent'] || 'Unknown',
      ip: req.ip || 'Unknown',
    });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Logged in successfully' });

  })(req, res, next);
};


static async requestOTP(req: Request, res: Response){
    const { email } = req.body; 
    const user = await AuthController.userRepo.findOneBy({email: email});
    console.log(user);
    if (!user)
    {
        return res.status(403).json({error: "Email Invalid"});
    }
    const otp = generateOTP(email);
    return res.json({message: `The OTP for ${email} is ${otp}`}); 
}

static async verifyOTPcode(req: Request, res: Response)
{
    const { email, otp } = req.body;
    
    const isValid = verifyOTP(email, otp);
    if (!isValid) {
        return res.status(400).json({error: "Invalid or expired OTP"})
    }
    res.status(200).json({message: "OTP verified. You can now reset your password"})
};



static async UpdateProfile(req: Request, res:Response)
{
    const userId = (req as any).user.id;
    if(!await AuthController.userRepo.findOneBy({id: userId}))
    {
        return res.status(404).json("User not available")
    }
    if (req.body.name)
    {
        await AuthController.userRepo.update(userId, {name: req.body.name});
    }
    if (req.body.newpassword)
    {
        if (req.body.newpassword !== req.body.confirmPassword)
        {
            return res.status(400).json({error:"New Password and confirm password does not match"})
        }
        const hashPassword = await bcrypt.hash(req.body.newpassword, 10);
        await AuthController.userRepo.update(userId, {password: hashPassword})
       
    }
     return res.json({message: "All things updated sucessfully"})
}

static async resetPassword(req: Request, res: Response)
{
    const {email, otp, newPassword, confirmPassword } = req.body;

    if (!verifyOTP(email, otp)) {
        return res.status(401).json({ error: "Session expired. Please request a new OTP"});
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({error: "Password do not match"});
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await AuthController.userRepo.update(
    { email: email },          
    { password: hashPassword } 
)

    clearOTP(email);

    res.status(200).json({message: "Password updated sucessfully"});
}

static async Logout(req: Request, res: Response): Promise<void> {
  const user = req.user as User & { jti: string };
  sessionStore.delete(user.jti);
  res.clearCookie(COOKIE_NAME);
  res.json({ message: 'Logged out' });
};

static async LogoutAll(req: Request, res: Response): Promise<void>{
  const user = req.user as User & { jti: string };
  sessionStore.deleteAllForUser(user.id);
  res.clearCookie(COOKIE_NAME);
  res.json({ message: 'All sessions terminated' });
};

static async LogoutwithsessionId(id: number,req: Request, res: Response): Promise<void>{
  const user = req.user as User & { jti: string };
  const { sessionId } = req.params;

  const session = sessionStore.get(String(sessionId));
  if (!session || session.userId !== user.id) {
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  sessionStore.delete(String(sessionId));
  if (sessionId === user.jti) {
    res.clearCookie(COOKIE_NAME);
  }
  res.json({ message: 'Session terminated' });
};




}