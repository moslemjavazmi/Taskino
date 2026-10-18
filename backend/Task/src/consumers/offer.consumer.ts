// import { createConsumer } from '../lib/kafka';
// import prisma from '../lib/prisma';
// import { TaskStatus } from '../../generated/prisma/client';

// export async function startOfferConsumer() {
//   const consumer = createConsumer('task-offer-group');
//   await consumer.connect();
//   await consumer.subscribe({ topic: 'offers', fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ message }) => {
//       if (!message.value) return;
//       const payload = JSON.parse(message.value.toString());

//       if (payload.type === 'OFFER_ACCEPTED') {
//         console.log('📩 OFFER_ACCEPTED received:', payload);

//         await prisma.$transaction(async (tx) => {
//           // 1. تغییر وضعیت تسک به CUSTOMER_SELECTED
//           const task = await tx.task.update({
//             where: { id: payload.taskId },
//             data: { status: TaskStatus.CUSTOMER_SELECTED },
//           });

//           // 2. ثبت انتساب تسکر (TaskAssignment)
//           await tx.taskAssignment.upsert({
//             where: {
//               taskId_taskerId: {
//                 taskId: payload.taskId,
//                 taskerId: payload.taskerId,
//               },
//             },
//             update: {}, // در صورت وجود، تغییری نمی‌دهیم
//             create: {
//               taskId: payload.taskId,
//               taskerId: payload.taskerId,
//               assignedAt: new Date(),
//             },
//           });

//           // 3. انتشار رویداد TASK_UPDATED برای سایر سرویس‌ها
//           await tx.outboxEvent.create({
//             data: {
//               aggregateId: task.id,
//               aggregate: 'tasks',
//               type: 'TASK_UPDATED',
//               payload: {
//                 taskId: task.id,
//                 status: task.status,
//                 taskerId: payload.taskerId,
//               },
//             },
//           });
//         });

//         console.log(`✅ Task ${payload.taskId} updated to CUSTOMER_SELECTED`);
//       }
//     },
//   });
// }
import { createConsumer } from '../lib/kafka';
import prisma from '../lib/prisma';
import { TaskStatus } from '../../generated/prisma/client';

export async function startOfferConsumer() {
  const consumer = createConsumer('task-offer-group');
  await consumer.connect();
  await consumer.subscribe({ topic: 'offers', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message, topic, partition, offset }) => {
      if (!message.value) return;
      
      try {
        const payload = JSON.parse(message.value.toString());
        console.log(`📩 Received event on ${topic}:`, payload);
        console.log(`🔍 Event type: ${payload.type}`); // اضافه شده

        if (payload.type === 'OFFER_ACCEPTED') {
          console.log(`🔄 Processing OFFER_ACCEPTED for task ${payload.taskId}`);

          await prisma.$transaction(async (tx) => {
            const task = await tx.task.findUnique({
              where: { id: payload.taskId },
            });

            if (!task) {
              console.error(`❌ Task ${payload.taskId} not found in database, skipping`);
              return;
            }

            if (task.status === TaskStatus.CUSTOMER_SELECTED) {
              console.log(`⚠️ Task ${payload.taskId} already in CUSTOMER_SELECTED status`);
              return;
            }

            const updatedTask = await tx.task.update({
              where: { id: payload.taskId },
              data: { status: TaskStatus.CUSTOMER_SELECTED },
            });

            await tx.taskAssignment.upsert({
              where: {
                taskId_taskerId: {
                  taskId: payload.taskId,
                  taskerId: payload.taskerId,
                },
              },
              update: { assignedAt: new Date() },
              create: {
                taskId: payload.taskId,
                taskerId: payload.taskerId,
                assignedAt: new Date(),
              },
            });

            await tx.outboxEvent.create({
              data: {
                aggregateId: updatedTask.id,
                aggregate: 'tasks',
                type: 'TASK_UPDATED',
                payload: {
                  taskId: updatedTask.id,
                  status: updatedTask.status,
                  taskerId: payload.taskerId,
                },
              },
            });

            console.log(`✅ Task ${payload.taskId} updated to CUSTOMER_SELECTED`);
          });
        }
      } catch (error) {
        console.error(`❌ Error processing message (offset ${offset}):`, error);
      }
    },
  });
}