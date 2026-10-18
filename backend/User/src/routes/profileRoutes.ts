// // APIGateway/User/src/routes/profileRoutes.ts
// import { Router } from "express";
// import { validate } from "../middlewares/validate";
// import { updateProfileSchema } from "../validators/profile.schema";
// // import { requireAuth } from "../middlewares/requireAuth";
// import {
//   checkProfileExists,
//   getMyProfile,
//   updateMyProfile,
// } from "../controllers/profileController";

// const router = Router();

// router.get("/me",  getMyProfile);
// router.put("/me",  validate(updateProfileSchema), updateMyProfile);
// router.get("/exists",  checkProfileExists);
// export default router;


// // // APIGateway/User/src/routes/profileRoutes.ts

// import { Router } from "express";
// import { validate } from "../middlewares/validate";
// import { updateProfileSchema } from "../validators/profile.schema";
// import { requireAuth } from "../middlewares/requireAuth";   // ✅ import
// import {
//   checkProfileExists,
//   getMyProfile,
//   updateMyProfile,
// } from "../controllers/profileController";

// const router = Router();

// router.get("/me", requireAuth, getMyProfile);            // ✅
// router.put("/me", requireAuth, validate(updateProfileSchema), updateMyProfile); // ✅
// router.get("/exists", requireAuth, checkProfileExists);  // ✅

// export default router;


// // // APIGateway/User/src/routes/profileRoutes.ts
import { Router } from "express";
import { extractUser } from "../middlewares/extractUser";
import {
  checkProfileExists,
  getMyProfile,
  updateMyProfile,
} from "../controllers/profileController";
import { updateProfileSchema } from "../validators/profile.schema";
import { validate } from "../middlewares/validate";

const router = Router();

// تمام مسیرهای این روتر نیاز به کاربر احراز هویت شده دارند
router.use(extractUser);

router.get("/me", getMyProfile);
router.put("/me", validate(updateProfileSchema), updateMyProfile);
router.get("/exists", checkProfileExists);

export default router;