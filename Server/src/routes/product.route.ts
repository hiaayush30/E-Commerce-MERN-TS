import { Router } from "express";
import { getAllProducts, getFeaturedProducts } from "../controllers/product.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";

export const productRouter = Router(); 

productRouter.get('/products',authMiddleware,adminMiddleware,getAllProducts);
productRouter.get('/featured',getFeaturedProducts);