//APIGateway/auth/index.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/authRoutes";
import securityRoutes from "./routes/security.routes";
import { startAuthConsumers } from "./kafka/consumer";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';

// import cookieParser from 'cookie-parser'
const app = express();

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
// app.use(cookieParser());
app.use(express.json());

// میدلور برای لاگ کردن کوکی‌ها (برای دیباگ)
app.use((req, res, next) => {
  // console.log('Cookies received:', req.cookies);
  // console.log('Headers:', req.headers);
  next();
});


app.use("/api/auth", authRoutes);
app.use("/security", securityRoutes);
// async function bootstrap() {
//   await startAuthConsumers();

//   const PORT = process.env.PORT || 8000;
//   app.listen(PORT, () =>
//     console.log(`🚀 Auth Service on http://localhost:${PORT}`)
//   );
// }

// bootstrap().catch(console.error);
  const PORT = process.env.PORT || 8000;

 app.listen(PORT, () =>
    console.log(`🚀 Auth Service on http://localhost:${PORT}`)
  );