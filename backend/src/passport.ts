import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt"
import { Request } from "express";
import { AppDataSource } from "./data.source";
import { User } from "./entities/User";
import { verifyPassword } from "./password";
import passport from "passport";
import { sessionStore } from "./utils/sessionstore";

export const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
export const COOKIE_NAME = "token";

const cookieExctractor = (req: Request): string | null => {
  return req?.cookies?.[COOKIE_NAME] ?? null;
};

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
      try {
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo
          .createQueryBuilder("user")
          .addSelect("user.password")
          .where("user.email = :email", { email: email.toLocaleLowerCase() })
          .getOne();

        if (!user || !(await verifyPassword(password, user.password))) {
          return done(null, false, { message: "Invalid Credentials" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    { jwtFromRequest: cookieExctractor, secretOrKey: JWT_SECRET },
    async (payload: { sub: number; jti: string }, done) => {
      try {
        const session = sessionStore.get(payload.jti);
        console.log("Hii 1")
        if (!session) {
          return done(null, false);
        }
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOneBy({ id: payload.sub });
        console.log(user);

        if (!user) {
          return done(null, false);
        }
        return done(null, { ...user, jti: payload.jti });
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await AppDataSource.getRepository(User).findOneBy({id: parseInt(id)});
    done(null, user); 
  } catch (err) {
    done(err);
  }
});
 