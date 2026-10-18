// //backend/offer-service/src/index.ts
// import dotenv from 'dotenv'

// dotenv.config();
// import express from 'express';
// import offerRoutes
// from './routes/offer.routes';

// const app = express();

// app.use(express.json());




// app.use(
//   '/api',
//   offerRoutes,
// );

// const port = process.env.PORT || 8500;
// app.listen(port, () => {
//     console.log(
//       `🚀 Offer Service running ${port}`,
//     );
//   });
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import offerRoutes from './routes/offer.routes';
import { connectKafka } from './lib/kafka';
import { publishOutboxEvents } from './jobs/outbox.publisher';
import { startTaskConsumer } from './consumers/task.consumer';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ service: 'offer-service', ok: true });
});

app.use('/api', offerRoutes);

const PORT = process.env.PORT || 8501;

async function bootstrap() {
  try {
    await connectKafka();
    await startTaskConsumer(); // به‌روزرسانی Projection از رویدادهای Task

    setInterval(async () => {
      await publishOutboxEvents();
    }, 5000);

    app.listen(PORT, () => {
      console.log(`🚀 Offer Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();