import { Request, Response } from "express";
import Product from "../models/product.model";
import { redis } from "../services/redis.service";

//admin only route
export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            message: 'products fetched succesfully',
            products
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error in fetching the products'
        })
    }
}

export const getFeaturedProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await redis.get('featuredProducts');
        if (products) {
            return res.status(200).json({
                message: 'featured products fetched succesfully',
                products: JSON.parse(products)
            })
        } else {
            const featuredProducts = await Product.find({
                isFeatured: true
            }).lean();
             // lean() returns a plain js object instead of a mongodb object which is good for performance
            if (!featuredProducts) {
                return res.status(404).json({
                    message:'no featured products found'
                })
            }
            await redis.set('featuredProducts', JSON.stringify(featuredProducts),"EX",60*60*1000); //60 min
            return res.status(200).json({
                message: 'featured products fetched succesfully',
                products: featuredProducts
            })
        }
    } catch (error) {
        console.log('error in getFeaturedProducts: ' + error);
        return res.status(500).json({
            message: "internal server error in fetching products"
        })
    }
}