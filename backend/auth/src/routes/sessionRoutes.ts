
// backend/auth/src/routes/sessionRoutes.ts
import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import {
  listSessions,
  revokeSession,
} from "../controllers/sessionController";

const router = Router();

router.get("/", requireAuth, listSessions);
router.delete("/:sessionId", requireAuth, revokeSession);

export default router;