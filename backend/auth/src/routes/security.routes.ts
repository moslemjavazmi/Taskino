//backend/auth/src/routes/security.routes.ts
import { Router } from "express";
import {
  getSecurityOverview,
  revokeSession,
  removeDevice,
} from "../controllers/securityController";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.get("/", requireAuth, getSecurityOverview);
router.delete("/sessions/:sessionId", requireAuth, revokeSession);
router.delete("/devices/:deviceId", requireAuth, removeDevice);

export default router;