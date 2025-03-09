import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller";

export const couponRouter = Router();

//coupon we have generated for a particular user
couponRouter.get("/",authMiddleware,getCoupon);
//check if coupon is there,expired ...  
couponRouter.post("/validate",authMiddleware,validateCoupon);
//add coupon,
// couponRouter.post('/',authMiddleware,adminMiddleware,addCoupon);
//dactivate coupon
// couponRouter.patch('/',authMiddleware,adminMiddleware,deactivateCoupon);
//delete coupon
// couponRouter.delete('/',authMiddleware,adminMiddleware,deleteCoupon);