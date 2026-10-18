// RatingService/src/index.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import ratingRoutes from "./routes/rating.routes";
// import { initProducer } from "./eventBus/producer";
// import { runOutboxWorker } from "./outbox/outbox.worker";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/ratings", ratingRoutes);

const PORT = process.env.PORT || 8600;

// async function bootstrap() {
//   await initProducer();

//   // Outbox worker (polling)
//   setInterval(() => {
//     runOutboxWorker().catch(console.error);
//   }, 3000);

  // app.listen(PORT, () => {
  //   console.log(`⭐ Rating Service running on port ${PORT}`);
  // });
// }

// bootstrap().catch((err) => {
//   console.error("❌ Failed to start Rating Service", err);
//   process.exit(1);
// });
  app.listen(PORT, () => {
    console.log(`⭐ Rating Service running on port ${PORT}`);
  });