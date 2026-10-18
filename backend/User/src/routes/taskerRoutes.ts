// APIGateway/User/src/routes/taskerRoutes.ts
// import { Router } from "express";
// import {
//   getMyTaskerProfile,
//   upsertMyTaskerProfile,
//   checkTaskerProfileExists,
// } from "../controllers/taskerController";

// const router = Router();

// router.get("/me", getMyTaskerProfile);
// router.put("/me",  upsertMyTaskerProfile);
// router.get("/exists", checkTaskerProfileExists);

// export default router;

// backend/User/src/routes/taskerRoutes.ts

import { Router } from "express";
import { extractUser } from "../middlewares/extractUser";
import {
  getMyTaskerProfile,
  upsertMyTaskerProfile,
  checkTaskerProfileExists,
} from "../controllers/taskerController";

const router = Router();

router.use(extractUser); // مهم: احراز هویت از طریق Gateway

router.get("/me", getMyTaskerProfile);
router.put("/me", upsertMyTaskerProfile);
router.get("/exists", checkTaskerProfileExists);

export default router;