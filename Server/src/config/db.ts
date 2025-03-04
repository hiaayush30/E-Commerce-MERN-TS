import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string);
        console.log("db connected");
    } catch (error) {
        throw new Error("db connection failed: " + error);
    }
}