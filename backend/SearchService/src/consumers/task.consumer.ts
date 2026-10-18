// // src/consumers/task.consumer.ts
// import { Kafka } from 'kafkajs';
// import prisma from '../lib/prisma';

// const kafka = new Kafka({
//   clientId: 'search-service',
//   brokers: [
//     process.env.KAFKA_BROKER || 'localhost:29092',
//   ],
// });

// const consumer = kafka.consumer({
//   groupId: 'search-group',
// });

// export async function startTaskConsumer() {
//   await consumer.connect();

//   await consumer.subscribe({
//     topic: 'tasks',
//     fromBeginning: true,
//   });

//   console.log('✅ Search consumer started');

//   await consumer.run({
//     eachMessage: async ({ message }) => {
//       if (!message.value) return;

//       const payload = JSON.parse(
//         message.value.toString(),
//       );

//       console.log('EVENT =>', payload);

//       await prisma.taskSearch.upsert({
//         where: {
//           id: payload.taskId,
//         },

//         update: {
//           title: payload.title,
//         },

//         create: {
//           id: payload.taskId,
//           userId: payload.userId,
//           title: payload.title,
//           createdAt: new Date(
//             payload.createdAt,
//           ),
//         },
//       });
//     },
//   });
// }


// backend/searchService/src/consumers/task.consumer.ts

import { Kafka } from 'kafkajs';
import prisma from '../lib/prisma';

const kafka = new Kafka({
  clientId: 'search-service',
  brokers: [
    process.env.KAFKA_BROKER || 'localhost:29092',
  ],
});

const consumer = kafka.consumer({
  groupId: 'search-group',
});

export async function startTaskConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: 'tasks',
    fromBeginning: true,
  });

  console.log('✅ Search consumer started');

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const payload = JSON.parse(
        message.value.toString(),
      );

      console.log('EVENT =>', payload);


      if (
          payload.status ===
          "APPROVED"
        ) {
          await prisma.taskSearch.update({
            where: {
              id: payload.taskId,
            },

            data: {
              approved: true,
              status: "APPROVED",
            },
          });

          return;
        } 


      await prisma.taskSearch.upsert({
        where: {
          id: payload.taskId,
        },

        update: {
          title: payload.title,

          category: payload.category,
          budget: payload.budget,

          description: payload.description,

          location: payload.location,

          locationLat: payload.locationLat,
          locationLng: payload.locationLng,

          status: payload.status,

          approved: payload.approved ?? false,
        },

        create: {
          id: payload.taskId,
          userId: payload.userId,
          title: payload.title,

          category: payload.category,
          budget: payload.budget,

          description: payload.description,

          location: payload.location,
          locationLat: payload.locationLat,
          locationLng: payload.locationLng,

          status: payload.status,

          approved: payload.approved ?? false,

          scheduledAt: payload.scheduledAt
            ? new Date(payload.scheduledAt)
            : null,

          createdAt: new Date(payload.createdAt),
        },
      });

      console.log(
        '✅ Search model updated:',
        payload.taskId,
      );
    },
  });
}