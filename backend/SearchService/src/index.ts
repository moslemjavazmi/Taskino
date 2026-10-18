//backend/searchService/src/index.ts
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';

import { startTaskConsumer }
from './consumers/task.consumer';
import searchRoutes from './routes/search.routes';
import matchingRoutes from './routes/matching.routes';
import { startTaskerConsumer } from './consumers/tasker.consumer';
const app = express();

app.use(express.json());
app.use(
  '/api/search',
  searchRoutes,
);

app.use(
  '/api/matching',
  matchingRoutes,
);
async function bootstrap() {

  await startTaskConsumer();

await startTaskerConsumer();
  const port = process.env.PORT || 8300;
  app.listen(port, () => {
    console.log(
      `🚀 Search Service running ${port}`,
    );
  });

}

bootstrap();