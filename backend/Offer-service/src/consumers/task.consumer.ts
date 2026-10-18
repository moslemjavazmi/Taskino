// // src/consumers/task.consumer.ts
// import { Kafka } from 'kafkajs';
// import prisma from '../lib/prisma';

// const kafka = new Kafka({ clientId: 'offer-service', brokers: ['localhost:29092'] });
// const consumer = kafka.consumer({ groupId: 'offer-task-group' });

// export async function startTaskConsumer() {
//   await consumer.connect();
//   await consumer.subscribe({ topic: 'tasks', fromBeginning: true });
//   await consumer.run({
//     eachMessage: async ({ message }) => {
//       const payload = JSON.parse(message.value.toString());
//       // به‌روزرسانی TaskProjection بر اساس نوع رویداد
//       if (payload.type === 'TASK_CREATED') {
//         await prisma.taskProjection.upsert({
//           where: { id: payload.taskId },
//           update: { /* ... */ },
//           create: { /* ... */ }
//         });
//       } else if (payload.type === 'TASK_APPROVED') {
//         await prisma.taskProjection.update({
//           where: { id: payload.taskId },
//           data: { approved: true, status: 'APPROVED' }
//         });
//       } else if (payload.type === 'TASK_UPDATED') {
//         // به‌روزرسانی سایر فیلدها
//       }
//     }
//   });
// }


// // src/consumers/task.consumer.ts

import { createConsumer } from '../lib/kafka';
import prisma from '../lib/prisma';

export async function startTaskConsumer() {
  const consumer = createConsumer('offer-task-group');
  await consumer.connect();
  await consumer.subscribe({ topic: 'tasks', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const payload = JSON.parse(message.value.toString());

      // به‌روزرسانی Projection بر اساس نوع رویداد
      if (payload.type === 'TASK_CREATED') {
        await prisma.taskProjection.upsert({
          where: { id: payload.taskId },
          update: {
            userId: payload.userId,
            title: payload.title,
            category: payload.category,
            description: payload.description,
            budget: payload.budget,
            location: payload.location,
            status: payload.status,
            approved: payload.approved || false,
            scheduledAt: payload.scheduledAt ? new Date(payload.scheduledAt) : null,
            createdAt: new Date(payload.createdAt),
          },
          create: {
            id: payload.taskId,
            userId: payload.userId,
            title: payload.title,
            category: payload.category,
            description: payload.description,
            budget: payload.budget,
            location: payload.location,
            status: payload.status,
            approved: payload.approved || false,
            scheduledAt: payload.scheduledAt ? new Date(payload.scheduledAt) : null,
            createdAt: new Date(payload.createdAt),
          },
        });
        console.log(`✅ TaskProjection upserted for task ${payload.taskId}`);
      } else if (payload.type === 'TASK_APPROVED') {
        await prisma.taskProjection.update({
          where: { id: payload.taskId },
          data: { approved: true, status: 'APPROVED' },
        });
        console.log(`✅ TaskProjection approved for task ${payload.taskId}`);
      } else if (payload.type === 'TASK_UPDATED' || payload.type === 'TASK_REJECTED') {
        await prisma.taskProjection.update({
          where: { id: payload.taskId },
          data: { status: payload.status },
        });
        console.log(`✅ TaskProjection updated status for task ${payload.taskId}`);
      }
    },
  });
}