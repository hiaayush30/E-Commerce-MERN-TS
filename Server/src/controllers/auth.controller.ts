import { Request, Response } from "express";

export const handleLogin =async (req:Request,res:Response) => {
    res.send('login route called');
}

export const handleSignup =async (req:Request,res:Response) => {
    res.send('signup route called');
}

export const handleLogout =async (req:Request,res:Response) => {
    res.send('logout route called');
}