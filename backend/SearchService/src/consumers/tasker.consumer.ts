// backend/searchService/src/consumers/tasker.consumer.ts

import { Kafka } from 'kafkajs';
import prisma from '../lib/prisma';

const kafka = new Kafka({
  clientId: 'search-service',
  brokers: [
    process.env.KAFKA_BROKER ||
      'localhost:29092',
  ],
});

const consumer = kafka.consumer({
  groupId: 'search-tasker-group',
});

export async function startTaskerConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: 'taskers',
    fromBeginning: true,
  });

  console.log(
    '✅ Tasker consumer started',
  );

  await consumer.run({
    eachMessage: async ({
      message,
    }) => {
      if (!message.value) return;

      const payload = JSON.parse(
        message.value.toString(),
      );

      console.log(
        'TASKER EVENT =>',
        payload,
      );

      await prisma.taskerSearch.upsert({
        where: {
          userId: payload.userId,
        },

        update: {
          fullName: payload.fullName,
          skills: payload.skills,
          rating: payload.rating,
          city: payload.city,
          lat: payload.lat,
          lng: payload.lng,
          isOnline: payload.isOnline,
        },

        create: {
          id: payload.id,
          userId: payload.userId,
          fullName: payload.fullName,
          skills: payload.skills,
          rating: payload.rating,
          city: payload.city,
          lat: payload.lat,
          lng: payload.lng,
          isOnline: payload.isOnline,
        },
      });

      console.log(
        '✅ Tasker Search Updated'
      );
    },
  });
}