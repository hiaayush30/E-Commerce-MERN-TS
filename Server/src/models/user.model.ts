import mongoose, { Document, ObjectId } from "mongoose";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";

interface UserModel extends Document {
    name: string;
    email: string;
    password: string,
    cartItems: [{
        quantity: Number,
        product: ObjectId
    }],
    role: "customer" | "admin",
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserModel>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be atleast 6 characters long"]
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        }
    ]
}, { timestamps: true }) //provides createdAt and updatedAt

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    else {
        user.password = await hashPassword(user.password);
        next();
    }
})

userSchema.methods.comparePassword = async function (password: string) {
    return await comparePassword(password, this.password);
}

const User = mongoose.model<UserModel>('User', userSchema);
export default User;