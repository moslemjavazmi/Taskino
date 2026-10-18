//backend/User/src/index.ts
import dotenv from "dotenv";
dotenv.config();
import { env } from "./config/env";
import express from "express";
import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');

// import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

import profileRoutes from "./routes/profileRoutes";
import taskerRoutes from "./routes/taskerRoutes";
import skillRoutes from "./routes/skillRoutes";
import verificationRoutes from "./routes/verificationRoutes";
import verificationAdminRoutes from "./routes/verificationAdminRoutes";

// kafka code
import { initProducer } from "./eventBus/producer";
// import { initProducer } from "@eventBus/producer";
import { runOutboxWorker } from "./outbox/outbox.worker";


import adminUserRoutes from "./routes/adminUserRoutes";
const app = express();
const port = process.env.PORT || "8100";
// app.use(
//   cors({
//     origin: process.env.ALLOWED_ORIGINS?.split(","),
//     credentials: true,
//   }),
// );
// تنظیمات صحیح CORS
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"], // پورت‌های مختلف فرانت
//     credentials: true, // بسیار مهم برای کوکی‌ها
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/user/profile", profileRoutes);
app.use("/api/user/tasker", taskerRoutes);
app.use("/api/user/skills", skillRoutes);
app.use("/api/user/verification", verificationRoutes);
app.use("/api/user/admin/verifications", verificationAdminRoutes);
app.use("/api/user/admin", adminUserRoutes);
app.use(errorHandler);

// async function bootstrap() {
//   await initProducer();

//   setInterval(() => {
//     runOutboxWorker().catch(console.error);
//   }, 3000);

//   app.listen(port, () => {
//     console.log(`🚀 User Service on ${port}`);
//   });
// }

app.listen(port, () => {
  console.log(`🚀 User Service on http://localhost:${port}`);
});
