import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// import cors from 'cors';
import { connectDatabase } from './config/db';
import { authRouter } from './routes/auth.route';
import cookieParser from 'cookie-parser';
import { productRouter } from './routes/product.route';

import { Types } from 'mongoose';
declare global {
  namespace Express {
    export interface Request {
      user?: {
        _id: string;
        name: string;
        email: string;
        cartItems: {
          quantity: number;
          product: Types.ObjectId;
        }[];
        role: "customer" | "admin";
      };
    }
  }
}


const app = express();

app.use(cookieParser());
app.use(express.json());
// app.use(cors({
//     origin: process.env.BE_DOMAIN,
//     credentials: true
// }))

app.get('/api/health', (req, res) => {
    res.json({
        message: "server running"
    })
})

app.use('/api/auth',authRouter);
app.use('/api/product',productRouter);

connectDatabase()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server running on port:" + process.env.PORT);
        })
    })