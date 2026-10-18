

// import { Request, Response } from 'express';
// import prisma from '../lib/prisma';
// import { OfferStatus, Prisma } from '@prisma/client'; // اضافه کردن Prisma

// export async function createOffer(req: Request, res: Response) {
//   try {
//     const taskId = req.params.taskId;
//     const taskerId = req.headers['x-user-id'] as string;
//     const { price, estimatedMinutes, message } = req.body;

//     const task = await prisma.taskProjection.findUnique({
//       where: { id: taskId },
//     });

//     if (!task) return res.status(404).json({ message: 'Task not found' });
//     if (task.status !== 'APPROVED') {
//       return res.status(400).json({ message: 'Task is not approved' });
//     }

//     const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
//       const offer = await tx.taskOffer.create({
//         data: { taskId, taskerId, price, estimatedMinutes, message },
//       });

//       await tx.outboxEvent.create({
//         data: {
//           aggregateId: offer.id,
//           aggregate: 'offers',
//           type: 'OFFER_CREATED',
//           payload: {
//             offerId: offer.id,
//             taskId,
//             taskerId,
//             price,
//             estimatedMinutes,
//           },
//         },
//       });

//       return offer;
//     });

//     return res.status(201).json(result);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }

// export async function getOffers(req: Request, res: Response) {
//   try {
//     const taskId = req.params.taskId;
//     const offers = await prisma.taskOffer.findMany({
//       where: { taskId },
//       orderBy: { createdAt: 'desc' },
//     });
//     return res.json(offers);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }

// export async function acceptOffer(req: Request, res: Response) {
//   try {
//     const offerId = req.params.offerId;

//     const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
//       const offer = await tx.taskOffer.findUnique({
//         where: { id: offerId },
//       });

//       if (!offer) throw new Error('Offer not found');

//       await tx.taskOffer.update({
//         where: { id: offerId },
//         data: { status: OfferStatus.ACCEPTED },
//       });

//       await tx.taskOffer.updateMany({
//         where: {
//           taskId: offer.taskId,
//           NOT: { id: offerId },
//         },
//         data: { status: OfferStatus.REJECTED },
//       });

//       await tx.outboxEvent.create({
//         data: {
//           aggregateId: offer.taskId,
//           aggregate: 'offers',
//           type: 'OFFER_ACCEPTED',
//           payload: {
//             offerId,
//             taskId: offer.taskId,
//             taskerId: offer.taskerId,
//           },
//         },
//       });

//       return { message: 'Offer accepted, task status will be updated asynchronously' };
//     });

//     return res.json(result);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }
// backend/Offer-service/src/controllers/offer.controller.ts

import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { OfferStatus, Prisma } from '@prisma/client';
import axios from 'axios'; // برای fallback (اختیاری)

/**
 * ایجاد پیشنهاد جدید برای یک تسک
 */
export async function createOffer(req: Request, res: Response) {
  try {
    const taskId = req.params.taskId;
    const taskerId = req.headers['x-user-id'] as string;
    const { price, estimatedMinutes, message } = req.body;

    // ۱) ابتدا از TaskProjection پیدا کن
    let task = await prisma.taskProjection.findUnique({
      where: { id: taskId },
    });

    // ۲) اگر TaskProjection وجود نداشت (هنوز همگام‌سازی نشده)،
    //    مستقیماً از تسک سرویس اطلاعات بگیر و Projection را ایجاد کن
    if (!task) {
      console.warn(`⚠️ TaskProjection not found for ${taskId}, fetching from task service...`);
      try {
        const response = await axios.get(`http://localhost:8200/api/tasks/${taskId}`, {
          headers: {
            'x-user-id': taskerId,
          },
        });
        const taskData = response.data;

        // ایجاد یا به‌روزرسانی Projection
        task = await prisma.taskProjection.upsert({
          where: { id: taskId },
          update: {
            userId: taskData.userId,
            title: taskData.title,
            category: taskData.category,
            description: taskData.description,
            budget: taskData.budget,
            location: taskData.location,
            status: taskData.status,
            approved: taskData.status === 'APPROVED',
            scheduledAt: taskData.scheduledAt ? new Date(taskData.scheduledAt) : null,
            createdAt: new Date(taskData.createdAt),
          },
          create: {
            id: taskId,
            userId: taskData.userId,
            title: taskData.title,
            category: taskData.category,
            description: taskData.description,
            budget: taskData.budget,
            location: taskData.location,
            status: taskData.status,
            approved: taskData.status === 'APPROVED',
            scheduledAt: taskData.scheduledAt ? new Date(taskData.scheduledAt) : null,
            createdAt: new Date(taskData.createdAt),
          },
        });
        console.log(`✅ TaskProjection created/updated for ${taskId} from task service`);
      } catch (error) {
        console.error(`❌ Failed to fetch task ${taskId} from task service:`, error);
        return res.status(404).json({ message: 'Task not found (also not in task service)' });
      }
    }

    // ۳) بررسی وضعیت APPROVED (فقط تسک‌های تأییدشده قابل پیشنهاد هستند)
    // if (task.status !== 'APPROVED') {
    //   return res.status(400).json({ message: 'Task is not approved' });
    // }

    // ۴) ایجاد پیشنهاد در دیتابیس
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const offer = await tx.taskOffer.create({
        data: {
          taskId,
          taskerId,
          price,
          estimatedMinutes,
          message,
        },
      });

      // ثبت رویداد در Outbox برای انتشار به کافکا
      await tx.outboxEvent.create({
        data: {
          aggregateId: offer.id,
          aggregate: 'offers',
          type: 'OFFER_CREATED',
          payload: {
            offerId: offer.id,
            taskId,
            taskerId,
            price,
            estimatedMinutes,
          },
        },
      });
      console.log('offer',offer)
      return offer;
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error in createOffer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * دریافت لیست پیشنهادهای یک تسک
 */
export async function getOffers(req: Request, res: Response) {
  console.log('getoffers')
  try {
    const taskId = req.params.taskId;

    const offers = await prisma.taskOffer.findMany({
      where: { taskId },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(offers);
  } catch (error) {
    console.error('Error in getOffers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


export async function updateOffer(req: Request, res: Response) {
  try {
    const offerId = req.params.offerId;
    const { price, estimatedMinutes, message } = req.body;
    const taskerId = req.headers['x-user-id'] as string; // یا از توکن احراز هویت

    // ۱) پیدا کردن پیشنهاد
    const existingOffer = await prisma.taskOffer.findUnique({
      where: { id: offerId },
    });

    if (!existingOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // ۲) بررسی مالکیت (فقط تسکر سازنده می‌تواند ویرایش کند)
    if (existingOffer.taskerId !== taskerId) {
      return res.status(403).json({ message: 'You are not the owner of this offer' });
    }

    // ۳) بررسی وضعیت (فقط PENDING قابل ویرایش است)
    if (existingOffer.status !== 'PENDING') {
      return res.status(400).json({ message: 'Only pending offers can be edited' });
    }

    // ۴) به‌روزرسانی
    const updatedOffer = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const offer = await tx.taskOffer.update({
        where: { id: offerId },
        data: {
          price: price !== undefined ? price : existingOffer.price,
          estimatedMinutes: estimatedMinutes !== undefined ? estimatedMinutes : existingOffer.estimatedMinutes,
          message: message !== undefined ? message : existingOffer.message,
        },
      });

      // ثبت رویداد در Outbox
      await tx.outboxEvent.create({
        data: {
          aggregateId: offer.id,
          aggregate: 'offers',
          type: 'OFFER_UPDATED',
          payload: {
            offerId: offer.id,
            taskId: offer.taskId,
            taskerId: offer.taskerId,
            price: offer.price,
            estimatedMinutes: offer.estimatedMinutes,
            message: offer.message,
          },
        },
      });

      return offer;
    });

    return res.status(200).json(updatedOffer);
  } catch (error) {
    console.error('Error in updateOffer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
// export async function acceptOffer(req: Request, res: Response) {
//   try {
//     const offerId = req.params.offerId;

//     const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
//       // ۱) پیدا کردن پیشنهاد
//       const offer = await tx.taskOffer.findUnique({
//         where: { id: offerId },
//       });

//       if (!offer) {
//         throw new Error('Offer not found');
//       }

//       // ۲) به‌روزرسانی وضعیت پیشنهاد به ACCEPTED
//       await tx.taskOffer.update({
//         where: { id: offerId },
//         data: { status: OfferStatus.ACCEPTED },
//       });

//       // ۳) رد کردن سایر پیشنهادهای همان تسک
//       await tx.taskOffer.updateMany({
//         where: {
//           taskId: offer.taskId,
//           NOT: { id: offerId },
//         },
//         data: { status: OfferStatus.REJECTED },
//       });

//       // ۴) انتشار رویداد OFFER_ACCEPTED
//       await tx.outboxEvent.create({
//         data: {
//           aggregateId: offer.taskId,
//           aggregate: 'offers',
//           type: 'OFFER_ACCEPTED',
//           payload: {
//             offerId,
//             taskId: offer.taskId,
//             taskerId: offer.taskerId,
//           },
//         },
//       });

//       return { message: 'Offer accepted, task status will be updated asynchronously' };
//     });

//     return res.json(result);
//   } catch (error) {
//     console.error('Error in acceptOffer:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }

export async function acceptOffer(req: Request, res: Response) {
  try {
    const offerId = req.params.offerId;
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const offer = await tx.taskOffer.findUnique({
        where: { id: offerId },
      });

      if (!offer) {
        throw new Error('Offer not found');
      }

      // بررسی مالکیت تسک از TaskProjection
      const task = await tx.taskProjection.findUnique({
        where: { id: offer.taskId },
      });

      if (!task) {
        throw new Error('Task not found in projection');
      }

      if (task.userId !== userId) {
        throw new Error('You are not the owner of this task');
      }

      // بررسی اینکه قبلاً پیشنهادی پذیرفته نشده باشد
      const existingAccepted = await tx.taskOffer.findFirst({
        where: {
          taskId: offer.taskId,
          status: OfferStatus.ACCEPTED,
        },
      });

      if (existingAccepted) {
        throw new Error('This task already has an accepted offer');
      }

      // به‌روزرسانی وضعیت پیشنهاد
      await tx.taskOffer.update({
        where: { id: offerId },
        data: { status: OfferStatus.ACCEPTED },
      });

      // رد سایر پیشنهادها
      await tx.taskOffer.updateMany({
        where: {
          taskId: offer.taskId,
          NOT: { id: offerId },
        },
        data: { status: OfferStatus.REJECTED },
      });

      // ثبت رویداد در Outbox
      const outbox = await tx.outboxEvent.create({
        data: {
          aggregateId: offer.taskId,
          aggregate: 'offers',
          type: 'OFFER_ACCEPTED',
          payload: {
            offerId,
            taskId: offer.taskId,
            taskerId: offer.taskerId,
          },
        },
      });

      console.log('📝 Outbox event created:', outbox);

      return { message: 'Offer accepted successfully' };
    });

    return res.json(result);
  } catch (error: any) {
    console.error('Error in acceptOffer:', error);
    const status = error.message.includes('not found') ? 404 : 400;
    return res.status(status).json({ message: error.message || 'Internal server error' });
  }
}
export async function getMyOfferForTask(req: Request, res: Response) {
  console.log('getMyOfferForTask')
  try {
    const taskId = req.params.taskId;
    const taskerId = req.headers['x-user-id'] as string;

    if (!taskerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const offer = await prisma.taskOffer.findFirst({
      where: {
        taskId,
        taskerId,
      },
    });

    if (!offer) {
      return res.status(404).json({ message: 'No offer found for this tasker' });
    }
console.log('offer',offer)
    return res.json(offer);
  } catch (error) {
    console.error('Error in getMyOfferForTask:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}