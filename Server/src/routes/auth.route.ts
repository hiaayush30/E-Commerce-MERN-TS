import { Router } from "express";
import { getProfile, handleLogin, handleLogout, handleSignup, refreshToken } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
export const authRouter = Router();

authRouter.post('/login',handleLogin);
authRouter.post('/signup',handleSignup);
authRouter.post('/logout',handleLogout);
authRouter.post('/refresh-token',refreshToken);
authRouter.get('/profile',authMiddleware,getProfile);
