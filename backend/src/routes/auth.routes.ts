import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { asyncHandler } from "../utils/asynchandler";
import { requireAuth } from "../middleware/auth.middleware";

const authrouter = Router();

authrouter.post('/Login', asyncHandler(AuthController.Login));
authrouter.get('/getusercheck', requireAuth, asyncHandler(AuthController.getuser))
authrouter.post('/Register', asyncHandler(AuthController.create));
authrouter.post('/requestotp', asyncHandler(AuthController.requestOTP));
authrouter.post('/verifyotp', asyncHandler(AuthController.verifyOTPcode));
authrouter.post('/resetPassword', asyncHandler(AuthController.resetPassword));
authrouter.post('/update', requireAuth, asyncHandler(AuthController.UpdateProfile));
authrouter.get('/viewsessions/:id',asyncHandler(AuthController.viewAllLiveSessions))
authrouter.post('/Logout', requireAuth, asyncHandler(AuthController.Logout));
authrouter.post('/LogoutAll', requireAuth, asyncHandler(AuthController.LogoutAll));
// authrouter.post('/LogoutwithsessionId',requireAuth, asyncHandler(AuthController.LogoutwithsessionId));

export default authrouter;