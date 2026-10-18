// // APIGateway/User/src/routes/skillRoutes.ts
// import { Router } from "express";
// import { requireRole } from "../middlewares/requireRole";
// import {
//   createSkill,
//   listSkills,
//   setMySkills,
// } from "../controllers/skillController";

// const router = Router();

// router.post("/",  requireRole("ADMIN"), createSkill);
// router.get("/",  listSkills);
// router.put("/me",  setMySkills);

// export default router;


// backend/User/src/routes/skillRoutes.ts
import { Router } from "express";
import { extractUser } from "../middlewares/extractUser"; // اضافه کردن ایمپورت
import { requireRole } from "../middlewares/requireRole";
import {
  createSkill,
  listSkills,
  setMySkills,
} from "../controllers/skillController";

const router = Router();

router.post("/", requireRole("ADMIN"), createSkill);
router.get("/", listSkills); 
router.put("/me", extractUser, setMySkills);
export default router;