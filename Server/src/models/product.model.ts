import mongoose, { Document } from "mongoose";

interface ProductInterface extends Document {
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isFeatured: boolean;
    quantity: number;
}

const productSchema = new mongoose.Schema<ProductInterface>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: 0
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    category: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model<ProductInterface>('Product', productSchema);
export default Product;