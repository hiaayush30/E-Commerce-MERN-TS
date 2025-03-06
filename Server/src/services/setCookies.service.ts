import { Response } from "express";

export const setCookies = (res:Response,accessToken:string,refreshToken:string)=>{
    res.cookie('accessToken',accessToken,{
        maxAge:15*60*1000,  //15min
        httpOnly:true,  //prevents xss attacks
        secure:process.env.ENVIRONMENT!="development", //cookies only over https
        sameSite:"strict" //prevents csrf attacks
    })
    res.cookie('refreshToken',refreshToken,{
        maxAge:7*24*60*60*1000,  //7days
        httpOnly:true,
        secure:process.env.ENVIRONMENT!="development",
        sameSite:"none"
    })
}