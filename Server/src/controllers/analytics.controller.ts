import { Request, Response } from "express";
import User from "../models/user.model";
import Product from "../models/product.model";
import Order from "../models/order.model";

export const analyticsData = async (req:Request,res:Response):Promise<any> => {
    try {
         const totalUsers = await User.countDocuments();
         const totalProducts = await Product.countDocuments();
         const salesData = await Order.aggregate([
            {
                $group:{  //it groups all docs together
                    _id:null,
                    totalSales:{$sum:1},
                    totalRevenue:{$sum:"totalAmount"}
                }
            }
         ])
         const {totalSales,totalRevenue}= salesData[0] || {totalSales:0,totalRevenue:0};
         return res.status(200).json({
            message:'data fetched succesfully',
            analyticsData:{
                users:totalUsers,
                products:totalProducts,
                totalRevenue,
                totalSales
             }
         })
    } catch (error) {
        console.log('error in fetching analyticsData:'+error);
        return res.status(500).json({
            message:'error in fetching analytics data'
        })
    }
}
