import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/db';
import { authRouter } from './routes/auth.route';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.BE_DOMAIN,
    credentials: true
}))

app.get('/api/health', (req, res) => {
    res.json({
        message: "server running"
    })
})

app.use('/api/auth',authRouter);

connectDatabase()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server running on port:" + process.env.PORT);
        })
    })