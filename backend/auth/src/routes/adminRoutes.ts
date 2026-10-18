//auth/src/routes/adminRoutes.ts

import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { requireRole } from "../middlewares/requireRole";
import { requirePermission } from "../middlewares/requirePermission";
import { Permission } from "../constants/permissions";

const router = Router();

/**
 * فقط ADMIN
 */
router.post(
  "/dashboard",
  requireAuth,
  requireRole("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

/**
 * نیاز به permission خاص
 */
router.post(
  "/create-user",
  requireAuth,
  requirePermission(Permission.USER_VERIFY),
  (req, res) => {
    res.json({ message: "User created" });
  }
);

export default router;
