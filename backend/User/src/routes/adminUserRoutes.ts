// backend/User/src/routes/adminUserRoutes.ts
import { Router } from "express";
import { requireRole } from "../middlewares/requireRole";
import { getAllUsers, getAllTaskers,updateTasker ,getTaskerById} from "../controllers/adminUserController";

const router = Router();

// همه مسیرهای این فایل فقط برای ادمین قابل دسترسی است
// router.use(requireAuth, requireRole("ADMIN"));

router.get("/users", getAllUsers);
router.get("/taskers", getAllTaskers);
router.get("/taskers/:id", getTaskerById);
router.put("/taskers/:id", updateTasker);
export default router;