import { Request, Response } from "express";
import zod, { string } from 'zod';
import User from "../models/user.model";
import { generateTokens } from "../utils/jwt.util";
import { removeRefreshToken, storeRefreshToken } from "../services/redis.service";
import { setCookies } from "../utils/setCookies.util";
import jwt from 'jsonwebtoken';

const SignupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})
export const handleSignup = async (req: Request, res: Response): Promise<any> => {
    try {
        const validRequest = SignupSchema.safeParse(req.body);
        if (!validRequest.success) {
            return res.status(400).json({
                message: "invalid request",
                error: validRequest.error.format()
            })
        }
        const { email, password, name } = req.body;
        const existingUser = await User.findOne({
            email,
        })
        if (existingUser) {
            return res.status(403).json({
                message: "email already exists"
            })
        }
        const user = await User.create({
            name,
            password,
            email
        });
        //generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id as string);
        //store refresh token in redis
        await storeRefreshToken(user._id as string, refreshToken);
        //set cookies
        setCookies(res, accessToken, refreshToken);
        return res.status(201).json({
            message: "user signed up successfully",
            user: {
                "name": user.name,
                "email": user.email,
                "_id": user._id,
                "cartItems": user.cartItems
            }
        })
    } catch (error) {
        console.log('Error in signup: ' + error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

export const handleLogin = async (req: Request, res: Response) => {
    res.send('login route called');
}

export const handleLogout = async (req: Request, res: Response):Promise<any> => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        if (refreshToken) {
            const {userId} = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET as string) as {userId:string};
            await removeRefreshToken(userId);
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({
            message: 'logged out successfully'
        })
    } catch (error) {
        console.log('error in logout:' + error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}