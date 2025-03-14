import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// import cors from 'cors';
import { connectDatabase } from './config/db';
import { authRouter } from './routes/auth.route';
import cookieParser from 'cookie-parser';
import { productRouter } from './routes/product.route';

import { Types } from 'mongoose';
import { cartRouter } from './routes/cart.routes';
import { UserModel } from './models/user.model';
import { couponRouter } from './routes/coupon.route';
import { orderRouter } from './routes/order.route';
import { analyticsRouter } from './routes/analytics.route';
declare global {
  namespace Express {
    export interface Request {
      user?: UserModel;
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
app.use('/api/cart',cartRouter);
app.use('/api/cart',couponRouter);
app.use('/api/order',orderRouter);
app.use('/api/analytics',analyticsRouter);

connectDatabase()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server running on port:" + process.env.PORT);
        })
    })