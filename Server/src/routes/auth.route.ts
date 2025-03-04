import { Router } from "express";
import { handleLogin, handleLogout, handleSignup } from "../controllers/auth.controller";
export const authRouter = Router();

authRouter.post('/login',handleLogin);
authRouter.post('/signup',handleSignup);
authRouter.post('/logout',handleLogout);
