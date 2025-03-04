import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/db';
import { authRouter } from './routes/auth.route';

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.BE_DOMAIN,
    credentials: true
}))

app.get('/health', (req, res) => {
    res.json({
        message: "server running"
    })
})

app.use('/auth',authRouter);

connectDatabase()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server running on port:" + process.env.PORT);
        })
    })