import { Router } from "express";
import { handleLogin, handleLogout, handleSignup, refreshToken } from "../controllers/auth.controller";
export const authRouter = Router();

authRouter.post('/login',handleLogin);
authRouter.post('/signup',handleSignup);
authRouter.post('/logout',handleLogout);
authRouter.post('/refresh-token',refreshToken);
// authRouter.get('/profile',getProfile);
