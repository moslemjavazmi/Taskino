//backend/SearchService/src/controllers/search.controller.ts

import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { calculateDistance }
from '../utils/distance';
export async function searchTasks(
  req: Request,
  res: Response,
) {
  try {
    const q = req.query.q as string;
    const location = req.query.location as string;
    const userId = req.query.userId as string;

    const tasks =
      await prisma.taskSearch.findMany({
        where: {
          approved: true,
          ...(q && {
            OR: [
              {
                title: {
                  contains: q,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: q,
                  mode: 'insensitive',
                },
              },
            ],
          }),

          ...(location && {
            location: {
              contains: location,
              mode: 'insensitive',
            },
          }),

          ...(userId && {
            userId,
          }),
        },

        orderBy: {
          createdAt: 'desc',
        },
      });

    return res.json(tasks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
export async function nearbyTasks(
  req: Request,
  res: Response,
) {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);

    const radius =
      Number(req.query.radius) || 10;

    if (!lat || !lng) {
      return res.status(400).json({
        message: 'lat and lng required',
      });
    }

    const tasks =
      await prisma.taskSearch.findMany({
        where: {
          locationLat: {
            not: null,
          },
          locationLng: {
            not: null,
          },
        },
      });

    const nearby = tasks.filter((task) => {
      const distance =
        calculateDistance(
          lat,
          lng,
          task.locationLat!,
          task.locationLng!,
        );

      return distance <= radius;
    });

    return res.json(nearby);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}