// APIGateway/auth/src/routes/authRoutes.ts

import { Router } from "express";
import {
  sendCode,
  verifyCode,
  refreshToken,
  logout,
  logoutAll,
} from "../controllers/authController";

import { requireAuth } from "../middlewares/requireAuth";
import { otpSendRateLimit } from "../middlewares/otpRateLimit";
import { otpVerifyLimit } from "../middlewares/otpVerifyLimit";
import { me } from "../controllers/meController";
import sessionRoutes from "./sessionRoutes";

const router = Router();

router.use("/sessions", sessionRoutes);

router.post("/send-code", sendCode);
router.post("/verify-code",  verifyCode);
router.post("/refresh", refreshToken);

router.post("/logout", requireAuth, logout);
router.post("/logout-all", requireAuth, logoutAll);

router.get("/me", requireAuth, me);

export default router;