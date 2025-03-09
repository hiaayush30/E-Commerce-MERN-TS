import { Request, Response } from "express";
import Coupon from "../models/coupon.model";


export const getCoupon = async (req: Request, res: Response): Promise<any> => {
   try {
    const coupon = await Coupon.findOne({
        userId:req.user?._id,
        isActive:true
    })
    if(!coupon) throw new Error('coupon not found');
    res.status(200).json({
        coupon,
        message:'coupon fetched'
    })
   } catch (error) {
    console.log('error in getCoupon:'+error);
    return res.status(500).json({
        message:'error in getting coupon or coupon not found'
    })
   }
}

export const getCoupon1 = async (req: Request, res: Response): Promise<any> => {
    try {
     
    } catch (error) {
     console.log('error in getCoupon:'+error);
     return res.status(500).json({
         message:'error in getting coupon'
     })
    }
 }

 export const validateCoupon = async (req: Request, res: Response): Promise<any> => {
    try {
     const {code} = req.body;
     if(!code){
        return res.status(403).json({
            message:'invalid request - coupon code required'
        })
     }
     const coupon = await Coupon.findOne({
        code
     })
     if(!coupon){
        return res.status(404).json({message:'coupon not found'})
     }
     else if(new Date(coupon.expirationDate) < new Date()){
        return res.status(403).json({
            message:'coupon has expired'
        })
     }
     else if(String(coupon.userId)!==String(req.user?.id)){
        return res.status(403).json({
            message:'coupon not applicable for this user'
        })
     }
     else {
        res.status(200).json({
            message:'coupon validated',
            code:coupon.code,
            discountPercentage:coupon.discountPercentage
        })
     }
    } catch (error) {
     console.log('error in getCoupon:'+error);
     return res.status(500).json({
         message:'error in getting coupon',
     })
    }
 }