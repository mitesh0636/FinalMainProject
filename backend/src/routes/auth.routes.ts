import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { asyncHandler } from "../utils/asynchandler";
import { requireAuth } from "../middleware/auth.middleware";

const authrouter = Router();

authrouter.post('/Login', asyncHandler(AuthController.Login));
authrouter.post('/Register', asyncHandler(AuthController.create));
authrouter.post('/requestotp', asyncHandler(AuthController.requestOTP));
authrouter.post('/verifyotp', asyncHandler(AuthController.verifyOTPcode));
authrouter.post('/resetPassword', asyncHandler(AuthController.resetPassword));
authrouter.post('/Logout',requireAuth, asyncHandler(AuthController.Logout));
authrouter.post('/LogoutAll', requireAuth, asyncHandler(AuthController.LogoutAll));
authrouter.post('/LogoutAllwithsessionId/:id', asyncHandler(AuthController.LogoutwithsessionId));

export default authrouter;