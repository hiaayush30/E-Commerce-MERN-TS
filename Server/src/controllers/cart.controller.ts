import { Request, Response } from "express";
import Product from "../models/product.model";
import User from "../models/user.model";
import { Types } from "mongoose";

export const addToCart = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.user) { throw new Error('auth error in addToCart') } //fix ts errors
        const { productId } = req.body;
        if (!productId) {
            return res.status(404).json({
                message: 'invalid request - Product id required'
            })
        }
        const product = await Product.findOne({
            _id: productId
        })
        if (!product) {
            return res.status(403).json({
                message: 'product not found'
            })
        }
        const productExisting = req.user.cartItems.find(product => String(product.product) === String(productId));
        if (productExisting) {
            productExisting.quantity++;
        } else {
            req.user.cartItems.push({
                quantity: 1,
                product: product._id as Types.ObjectId
            })
        }
        await req.user.save();
        return res.status(200).json({
            message: 'product added',
            cartItems: req.user.cartItems
        })
    } catch (error) {
        console.log('error in addProduct:' + error);
        return res.status(500).json({
            message: 'error in adding product to cart'
        })
    }
}

export const removeAllFromCart = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.user) { throw new Error('auth error in addToCart') } //fix ts errors
        const { productId } = req.body;
        if (!productId) {
            return res.status(404).json({
                message: 'inval;id request - Product id required'
            })
        }
        const product = req.user.cartItems.find(item => String(item.product) === String(productId));
        if (!product) {
            return res.status(404).json({
                message: 'product not found'
            })
        }
        else {
            req.user.cartItems = req.user.cartItems.filter(item => String(item.product) !== String(productId))
            await req.user?.save();
            return res.status(200).json({
                message: 'product removed',
                cartItems: req.user.cartItems
            })
        }

    } catch (error) {
        console.log('error in removeAllFromCart:' + error);
        return res.status(500).json({
            message: 'error in adding product to cart'
        })
    }
}

export const updateQuantity = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.user) { throw new Error('auth error in addToCart') } //fix ts errors
        const { productId } = req.params;
        const { quantity } = req.body;
        if (!productId || !quantity || quantity < 0) {
            return res.status(403).json({
                message: 'productId and quantity required'
            })
        }
        const product = req.user?.cartItems.find(item => String(item.product) === String(productId));
        if (!product && quantity != 0) {
            //check if product legit then add
            const productExists = await Product.findOne({ _id: productId });
            if (!productExists) { return res.status(403).json({ message: 'product not found' }) }
            else {
                req.user?.cartItems.push({ quantity, product: productId as unknown as Types.ObjectId });
                await req.user?.save();
                return res.status(200).json({
                    message: 'product quantity updated',
                    cartItems: req.user?.cartItems
                })
            }
        }
        else if (product) {
            if (quantity == 0) {
                req.user.cartItems = req.user?.cartItems.filter(item => String(item.product) !== String(productId));
            }
            else {
                product.quantity = quantity;
            }
            await req.user?.save();
            return res.status(200).json({
                message: 'product quantity updated',
                cartItems: req.user?.cartItems
            })
        }
    } catch (error) {
        console.log('error in updateQuantity:' + error);
        return res.status(500).json({
            message: 'error in adding product to cart'

        })
    }
}

export const getCartProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await Product.find({
            _id: {
                $in:req.user?.cartItems.map(item=>item.product) || []
            }
        })
        const cartItems = products.map(item=>{
              const product = req.user?.cartItems.find(obj=>String(obj.product)===String(item._id));
              if(product){
                return ({
                    quantity:product.quantity,
                    product
                })
              }
        })
        return res.status(200).json({
            message: 'cart items fetched successfully',
            cartItems
        })
    } catch (error) {
        console.log('error in getProducts:' + error);
        return res.status(500).json({
            message: 'error in adding product to cart'
        })
    }
}