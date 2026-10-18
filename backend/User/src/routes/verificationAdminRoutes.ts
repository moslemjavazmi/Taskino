// // APIGateway/User/src/routes/verificationAdminRoutes.ts
// import { Router } from "express";
// import { requireRole } from "../middlewares/requireRole";
// import {
//   approveVerification,
//   rejectVerification,
//   listPendingVerifications,
// } from "../controllers/verificationAdminController";

// const router = Router();

// router.use( requireRole("ADMIN"));

// router.get("/pending", listPendingVerifications);
// router.patch("/:id/approve", approveVerification);
// router.patch("/:id/reject", rejectVerification);

// export default router;

// backend/User/src/routes/verificationAdminRoutes.ts
import { Router } from "express";
import { extractUser } from "../middlewares/extractUser";
import { requireRole } from "../middlewares/requireRole";
import {
  approveVerification,
  rejectVerification,
  listPendingVerifications,
} from "../controllers/verificationAdminController";

const router = Router();

// میدلورها: ابتدا extractUser (تنظیم req.user) سپس requireRole
router.use(extractUser);
router.use(requireRole("ADMIN"));

router.get("/pending", listPendingVerifications);
router.patch("/:id/approve", approveVerification);
router.patch("/:id/reject", rejectVerification);

export default router;