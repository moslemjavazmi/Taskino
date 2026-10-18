import { Router } from 'express';

import {
    nearbyTasks,
  searchTasks,
} from '../controllers/search.controller';

const router = Router();

router.get('/tasks', searchTasks);
router.get(
  '/nearby',
  nearbyTasks,
);
export default router;