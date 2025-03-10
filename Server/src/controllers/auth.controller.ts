import {Request,Response} from 'express'
import zod from 'zod';
import User from "../models/user.model";
import { generateTokens } from "../utils/jwt.util";
import { redis, removeRefreshToken, storeRefreshToken } from "../services/redis.service";
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
        const { accessToken, refreshToken } = generateTokens(user._id as unknown as string);
        //store refresh token in redis
        await storeRefreshToken(user._id as unknown as string, refreshToken);
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

const loginSchema = zod.object({
    email:zod.string().email(),
    password:zod.string()
})
export const handleLogin = async (req: Request, res: Response):Promise<any> => {
    try {
        const validBody = loginSchema.safeParse(req.body);
        if(!validBody.success){
            return res.status(403).json({
                message:'invalid request',
                error:validBody.error.format()
            })
        }
        else{
            const {email,password} = validBody.data;
            const user = await User.findOne({
                email
            });
            if(!user){
                return res.status(400).json({
                    message:'email not found'
                })
            }
            if(!await user.comparePassword(password)){
                return res.status(400).json({
                    message:'incorrect password'
                })
            }
            const {accessToken,refreshToken} = generateTokens(user._id as unknown as string);
            await storeRefreshToken(user._id as unknown as string,refreshToken);
            setCookies(res,accessToken,refreshToken);
            return res.status(200).json({
                message:'logged in successfully',
                user: {
                    "name": user.name,
                    "email": user.email,
                    "_id": user._id,
                    "cartItems": user.cartItems
                }
            })
        }
    } catch (error) {
        console.log('error in login:'+error);
        return res.status(500).json({
            message:'internal server error:'
        })
    }
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

//recreate access token
//if this request fails login again
export const refreshToken = async (req:Request,res:Response):Promise<any> => {
   try {
    const refreshToken = req.cookies['refreshToken'];
    if(!refreshToken){
        return res.status(401).json({
            message:'token not found'
        })
    }
    const {userId} = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET as string) as {userId:string}
    //we have a valid refreshToken now
    const storedToken = await redis.get(`refreshToken:${userId}`);
    if(storedToken !== refreshToken){ //to avoid any cheating
        return res.status(403).json({
            message:'invalid refresh token'
        })
    }
    const {accessToken} = generateTokens(userId);
    res.cookie('accessToken',accessToken,{
        maxAge:15*60*1000,
        secure:process.env.ENVIRONMENT != "development",
        httpOnly:true,
        sameSite:'strict'
    });
    return res.status(200).json({
        message:'token created successfully'
    })
   } catch (error) {
    console.log('error in refreshToken:' + error);
        return res.status(500).json({
            message: "internal server error"
        })
   }
}

export const getProfile = async (req:Request,res:Response):Promise<any>=>{
    try {
        return res.status(200).json({
            message:'user fetched successully',
            user:req.user
        })
    } catch (error) {
        console.log('error in getProfile:' + error);
        return res.status(500).json({
            message: "internal server error"
        })
   }
}