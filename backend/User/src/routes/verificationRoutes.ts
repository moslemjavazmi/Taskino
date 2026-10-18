// APIGateway/User/src/routes/verificationRoutes.ts
import { Router } from "express";
import {
  getMyVerifications,
  requestVerification,
} from "../controllers/verificationController";

const router = Router();

router.get("/me",  getMyVerifications);
router.post("/me",  requestVerification);

export default router;