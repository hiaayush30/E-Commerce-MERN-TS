import dotenv from 'dotenv';
dotenv.config();

import Redis from "ioredis"

export const redis = new Redis(process.env.UPSTASH_REDIS_URL as string);
// await client.set('foo', 'bar');

export const storeRefreshToken = async (userId:string,refreshToken:string)=>{
     await redis.set(`refreshToken:${userId}`,refreshToken,"EX",7*24*60*60);
}

export const removeRefreshToken = async(userId:string)=>{
     await redis.del([`refreshToken:${userId}`]);
}