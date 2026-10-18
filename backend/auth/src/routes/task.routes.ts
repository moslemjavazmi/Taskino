// //auth/routes/task.routes.ts


import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { requirePermission } from "../middlewares/requirePermission";

const router = Router();

router.post("/", requireAuth, requirePermission("task.create"), (req, res) => {
  res.json({ message: "Task created" });
});

router.post(
  "/:id/accept",
  requireAuth,
  requirePermission("task.accept"),
  (req, res) => {
    res.json({ message: "Task accepted" });
  }
);

export default router;
