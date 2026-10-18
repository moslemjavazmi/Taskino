
import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes';
import { connectKafka } from './lib/kafka';
import { publishOutboxEvents } from './jobs/outbox.publisher';
import { startOfferConsumer } from './consumers/offer.consumer';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ service: 'task-service', ok: true });
});

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 8200;

async function bootstrap() {
  try {
    await connectKafka();
    await startOfferConsumer(); // شروع مصرف‌کننده OFFER_ACCEPTED

    setInterval(async () => {
      await publishOutboxEvents();
    }, 5000);

    app.listen(PORT, () => {
      console.log(`🚀 Task Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();