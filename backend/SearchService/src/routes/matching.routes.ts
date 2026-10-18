import { Router } from 'express';

import { matchTask }
from '../controllers/matching.controller';

const router = Router();

router.get(
  '/:taskId',
  matchTask,
);

export default router;