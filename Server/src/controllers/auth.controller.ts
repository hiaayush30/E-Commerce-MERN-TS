import { Request, Response } from "express";
import zod from 'zod';
import User from "../models/user.model";
import jwt from 'jsonwebtoken';
import { generateTokens } from "../utils/jwt.token";
import { storeRefreshToken } from "../services/redis.service";
import { setCookies } from "../services/setCookies.service";

const SignupSchema = zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string()
})
export const handleSignup =async (req:Request,res:Response):Promise<any> => {
    try {
        const validRequest = SignupSchema.safeParse(req.body);
        if(!validRequest.success){
            return res.status(400).json({
                message:"invalid request",
                error:validRequest.error.format()
            })
        }
        const {email,password,name} = req.body;
        const existingUser = await User.findOne({
            email,
        })
        if(existingUser){
            return res.status(403).json({
                message:"email already exists"
            })
        }
        const user = await User.create({
            name,
            password,
            email
        });
        //generate tokens
        const {accessToken,refreshToken} = generateTokens(user._id as string);
        //store refresh token in redis
        storeRefreshToken(user._id as string,refreshToken);
        //set cookies
        setCookies(res,accessToken,refreshToken);
        return res.status(201).json({
            message:"user signed up successfully",
            user:{
                "name":user.name,
                "email":user.email,
                "_id":user._id,
                "cartItems":user.cartItems
            }
        }) 
    } catch (error) {
        console.log('Error in signup: '+error);
    }
}

export const handleLogin =async (req:Request,res:Response) => {
    res.send('login route called');
}

export const handleLogout =async (req:Request,res:Response) => {
    res.send('logout route called');
}