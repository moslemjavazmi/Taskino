//backend/SearchService/src/controllers/matching.controller.ts
import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function matchTask(
  req: Request,
  res: Response,
) {
  try {
    const taskId = String(req.params.taskId);
    if (!taskId) {
        return res.status(400).json({
          message: 'taskId required',
      });
}
    const task =
      await prisma.taskSearch.findUnique({
        where: {
          id: taskId,
        },
      });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    const taskers =
      await prisma.taskerSearch.findMany({
        where: {
          isOnline: true,
        },
      });

const taskTitle =
  task.title.toLowerCase();

const matches = taskers.filter(
  (tasker) => {

    const skills =
      tasker.skills
        .toLowerCase()
        .split(',');

    return skills.some(
      (skill) =>
        taskTitle.includes(
          skill.trim(),
        ),
    );
  },
);

    return res.json(matches);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}