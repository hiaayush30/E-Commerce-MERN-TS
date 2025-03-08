import { Request, Response } from "express";
import Product from "../models/product.model";
import { redis } from "../services/redis.service";
import { cloudinary } from "../services/cloudinary.service";

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
                    message: 'no featured products found'
                })
            }
            await redis.set('featuredProducts', JSON.stringify(featuredProducts));
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

export const createProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, price, image, category, quantity } = req.body;
        let cloudinaryResponse = null;
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }
        const product = await Product.create({
            name,
            category,
            description,
            price,
            quantity,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
        })
        res.status(201).json({
            message: 'product created successfully',
            product
        })
    } catch (error) {
        console.log('error in createProduct: ' + error);
        return res.status(500).json({
            message: 'internal server error in adding product'
        })
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(403).json({
                message: 'invalid request - productId required'
            })
        }
        const product = await Product.findOne({
            _id: productId
        })
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        if (product.image) {
            const publicId = product.image.split('/').pop()?.split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log('deleted image from cloudinary');
            } catch (error) {
                console.log('Cloudinary deletion error:' + error);
            }
        }
        return res.status(200).json({
            message: 'product deleted successfully!'
        })
    } catch (error) {
        console.log('error in deleteProduct: ' + error);
        return res.status(500).json({
            message: 'error in deleting product'
        })
    }
}

export const getRecommendations = async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await Product.aggregate([{
            $sample: { size: 3 } //$sample is a MongoDB aggregation stage that randomly selects documents.
        }, {
            $project: {    //$project is used to select only specific fields from the documents.
                _id: 1,
                name: 1,
                description: 1,
                image: 1,
                price: 1,
                quantity: 1
            }
        }])
        res.json({
            message: 'recommendations fetched successfully',
            products
        })
    } catch (error) {
        console.log('error in getRecommendations: ' + error);
        return res.status(500).json({
            message: 'internal server error in getting recommendations'
        })
    }
}

export const getCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { category } = req.params;
        if (!category) {
            return res.status(403).json({
                message: 'invalid request'
            })
        }
        const products = await Product.find({
            category
        })
        if (!products) {
            return res.status(404).json({
                message: 'no products found'
            })
        }
        return res.status(200).json({
            message: 'products fetched succesfully',
            products
        })
    } catch (error) {
        console.log('error in getRecommendations: ' + error);
        return res.status(500).json({
            message: 'internal server error in getting recommendations'
        })
    }
}

export const toggleFeaturedProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(403).json({
                message: 'invalid request - productId required'
            })
        }
        const product = await Product.findOne({
            _id: productId
        })
        if (!product) {
            return res.status(404).json({
                message: 'product not found'
            })
        }
        else {
            product.isFeatured = !product.isFeatured;
            await product.save();
            //update cache
            await updateFeaturedProductsCahe();
            return res.status(200).json({
                message: 'product featured set to ' + product.isFeatured
            })
        }
    } catch (error) {
        console.log('error in toggleFeatured: ' + error);
        return res.status(500).json({
            message: 'error in toggling featured product'
        })
    }
}
const updateFeaturedProductsCahe = async () => {
    try {
        const featured = await Product.find({
            isFeatured: true
        }).lean();
        await redis.set('featuredProducts', JSON.stringify(featured));
    } catch (error) {
        console.log('error in fetching featuredProductsCache:' + error);
    }
}