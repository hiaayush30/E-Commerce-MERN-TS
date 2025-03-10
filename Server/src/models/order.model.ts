import mongoose, { Document, Types } from "mongoose";

interface OrderModel extends Document {
    createdAt: Date;
    updatedAt: Date;
    user: Types.ObjectId;
    products: Array<{
        product: Types.ObjectId,
        quantity: number;
        price: number;

    }>;
    totalAmount: number;
    stripeSessionId: string;
}

const orderSchema = new mongoose.Schema<OrderModel>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: { //for 1 unit
            type: Number,
            required: true,
            min: 0
        }
    }],
    stripeSessionId: {
        type: String,
        unique: true
    }
}, { timestamps: true })

const Order = mongoose.model<OrderModel>('Order', orderSchema);
export default Order;