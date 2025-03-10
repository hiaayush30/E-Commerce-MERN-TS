import { Router } from "express";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const orderRouter = Router();

orderRouter.post('/create-checkout-session',authMiddleware,createCheckoutSession);
orderRouter.post('/checkout-success',authMiddleware,checkoutSuccess);