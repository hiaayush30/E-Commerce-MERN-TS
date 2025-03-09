import mongoose, { Document, Types } from "mongoose";


interface CouponModel extends Document {
    code: string;
    discountPercentage: number;
    expirationDate: Date;
    isActive: boolean;
    userId: Types.ObjectId,
    createdAt:Date;
    updatedAt:Date;
}

const couponSchema = new mongoose.Schema<CouponModel>({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    expirationDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique:true
    }
},{timestamps:true})

const Coupon = mongoose.model<CouponModel>("Coupon", couponSchema);
export default Coupon;