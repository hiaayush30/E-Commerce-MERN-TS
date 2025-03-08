import { Router } from "express";
import { createProduct, getAllProducts, getCategory, getFeaturedProducts, getRecommendations, toggleFeaturedProduct } from "../controllers/product.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";

export const productRouter = Router(); 

//protected routes
productRouter.get('/products',authMiddleware,adminMiddleware,getAllProducts);

productRouter.get('/featured',getFeaturedProducts);
productRouter.get('/recommendations',getRecommendations);
productRouter.get('/category/:category',getCategory);

//admin only routes
//create product
productRouter.post('/',authMiddleware,adminMiddleware,createProduct);
//toggle isFeatured
productRouter.patch('/:productId',authMiddleware,adminMiddleware,toggleFeaturedProduct);
//delete product
productRouter.delete('/:productId',authMiddleware,adminMiddleware,createProduct);