
// backend/Task/src/routes/task.routes.ts

import { Router } from 'express';
import {
  createTask,
  getTasks,
  getMyTasks,
  getTaskById,        
  approveTask,
  rejectTask,
  taskerAccept,
  readyToStart,
  startTask,
  completeTask,
} from '../controllers/task.controllers';

const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/user/me', getMyTasks);
router.get('/:id', getTaskById); 
router.post('/:id/approve', approveTask);
router.post('/:id/reject', rejectTask);
router.post('/:taskId/tasker-accept', taskerAccept);
router.post('/:taskId/ready', readyToStart);
router.post('/:taskId/start', startTask);
router.post('/:taskId/complete', completeTask);

export default router;