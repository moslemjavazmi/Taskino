// src/routes/rating.routes.ts
import { Router } from "express";
import { submitRating } from "../controllers/rating.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.post("/", requireAuth, submitRating);

export default router;
