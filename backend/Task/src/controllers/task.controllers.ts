// // backend/Task/src/controllers/task.controllers.ts

import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { TaskStatus } from '../../generated/prisma/client';

export async function createTask(req: Request, res: Response) {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { title, category, budget, description, location, locationLat, locationLng, scheduledAt } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const result = await prisma.$transaction(async (tx) => {
      const task = await tx.task.create({
        data: {
          userId,
          title,
          category,
          budget,
          description,
          location,
          locationLat,
          locationLng,
          scheduledAt,
          status: TaskStatus.PENDING_APPROVAL,
        },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateId: task.id,
          aggregate: 'tasks',
          type: 'TASK_CREATED',
          payload: {
            taskId: task.id,
            userId,
            title: task.title,
            category: task.category,
            budget: task.budget,
            description: task.description,
            location: task.location,
            locationLat: task.locationLat,
            locationLng: task.locationLng,
            status: task.status,
            approved: false,
            scheduledAt: task.scheduledAt,
            createdAt: task.createdAt,
          },
        },
      });

      return task;
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function approveTask(req: Request, res: Response) {
  try {
    const { id: taskId } = req.params;
    const adminId = req.headers['x-user-id'] as string;
    // TODO: بررسی نقش ادمین

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status !== TaskStatus.PENDING_APPROVAL) {
      return res.status(400).json({ message: 'Task already processed' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.task.update({
        where: { id: taskId },
        data: { status: TaskStatus.APPROVED, approvedAt: new Date(), approvedByAdminId: adminId },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateId: updated.id,
          aggregate: 'tasks',
          type: 'TASK_APPROVED',
          payload: { taskId: updated.id, status: 'APPROVED', approved: true },
        },
      });

      return updated;
    });

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function rejectTask(req: Request, res: Response) {
  try {
    const { id: taskId } = req.params;
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { status: TaskStatus.REJECTED },
    });

    // اختیاری: انتشار رویداد TASK_REJECTED
    await prisma.outboxEvent.create({
      data: {
        aggregateId: updated.id,
        aggregate: 'tasks',
        type: 'TASK_REJECTED',
        payload: { taskId: updated.id, status: 'REJECTED' },
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// --- توابع جدید برای تغییر وضعیت توسط تسکر و کارفرما ---

// تسکر تسک را می‌پذیرد (بعد از انتخاب کارفرما)
export async function taskerAccept(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const taskerId = req.headers['x-user-id'] as string;
    // TODO: بررسی اینکه تسکر همانی است که در TaskAssignment ثبت شده

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status !== TaskStatus.CUSTOMER_SELECTED) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedTask = await tx.task.update({
        where: { id: taskId },
        data: { status: TaskStatus.TASKER_ACCEPTED },
      });

      await tx.taskAssignment.updateMany({
        where: { taskId, taskerId },
        data: { acceptedAt: new Date() },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateId: updatedTask.id,
          aggregate: 'tasks',
          type: 'TASK_UPDATED',
          payload: { taskId: updatedTask.id, status: updatedTask.status },
        },
      });

      return updatedTask;
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function readyToStart(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status !== TaskStatus.TASKER_ACCEPTED) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedTask = await tx.task.update({
        where: { id: taskId },
        data: { status: TaskStatus.READY_TO_START },
      });
      await tx.outboxEvent.create({
        data: {
          aggregateId: updatedTask.id,
          aggregate: 'tasks',
          type: 'TASK_UPDATED',
          payload: { taskId: updatedTask.id, status: updatedTask.status },
        },
      });
      return updatedTask;
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function startTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.status !== TaskStatus.READY_TO_START) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedTask = await tx.task.update({
        where: { id: taskId },
        data: { status: TaskStatus.IN_PROGRESS },
      });
      await tx.taskAssignment.updateMany({
        where: { taskId },
        data: { startedAt: new Date() },
      });
      await tx.outboxEvent.create({
        data: {
          aggregateId: updatedTask.id,
          aggregate: 'tasks',
          type: 'TASK_UPDATED',
          payload: { taskId: updatedTask.id, status: updatedTask.status },
        },
      });
      return updatedTask;
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function completeTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    // if (task.status !== TaskStatus.IN_PROGRESS) {
    //   return res.status(400).json({ message: 'Invalid status' });
    // }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedTask = await tx.task.update({
        where: { id: taskId },
        data: { status: TaskStatus.COMPLETED },
      });
      await tx.taskAssignment.updateMany({
        where: { taskId },
        data: { finishedAt: new Date() },
      });
      await tx.outboxEvent.create({
        data: {
          aggregateId: updatedTask.id,
          aggregate: 'tasks',
          type: 'TASK_UPDATED',
          payload: { taskId: updatedTask.id, status: updatedTask.status },
        },
      });
      return updatedTask;
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// GET endpoints (بدون تغییر)
export async function getTasks(_req: Request, res: Response) {
  console.log('get task')
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
    console.log('tasks',tasks)
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getMyTasks(req: Request, res: Response) {
  try {
    const userId = req.headers['x-user-id'] as string;

    console.log('userid',userId)
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const tasks = await prisma.task.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
export async function getTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}