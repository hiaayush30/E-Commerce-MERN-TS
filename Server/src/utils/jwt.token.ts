import jwt from 'jsonwebtoken';

export const generateTokens = (userId:string)=>{
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET as string,{
        expiresIn:'15m'
    });
    const refreshToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET as string,{
        expiresIn:'7d'
    });
    return {accessToken,refreshToken}
}