import { Router } from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller";
import { authRouter } from "./auth.route";

export const cartRouter = Router();

cartRouter.get('/',authRouter,getCartProducts);
cartRouter.post('/',authRouter,addToCart);
cartRouter.delete('/',authRouter,removeAllFromCart);
cartRouter.put('/:productId',authRouter,updateQuantity);