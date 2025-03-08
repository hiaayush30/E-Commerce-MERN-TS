import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const accessToken = req.cookies['accessToken'];
        if (!accessToken) {
            return res.status(403).json({
                message: 'token not found'
            })
        }
        const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { userId: string };
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(400).json({
                message: 'user not found'
            })
        }
        else {
            req.user = user;
            next();
        }
    } catch (error) {
        console.log('error in authMiddleware:' + error);
        return res.status(401).json({
            message: 'Unauthorized - invalid or expired token'
        })
    }
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction):any=> {
    if (req.user && req.user.role == 'admin') {
        next();
    } else {
        return res.status(403).json({
            message: 'Unauthorized - Admin Only'
        })
    }
}