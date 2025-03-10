import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { analyticsData } from "../controllers/analytics.controller";

export const analyticsRouter = Router();

analyticsRouter.get('/',authMiddleware,adminMiddleware,analyticsData);