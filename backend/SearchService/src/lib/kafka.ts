// src/lib/kafka.ts

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'task-service',
   brokers: [
    process.env.KAFKA_BROKER ||
      'localhost:29092',
  ],
});

export const producer = kafka.producer();

export async function connectKafka() {
  await producer.connect();

  console.log('✅ Kafka connected');
}

export async function publishEvent(
  topic: string,
  key: string,
  value: object,
) {
  await producer.send({
    topic,
    messages: [
      {
        key,
        value: JSON.stringify(value),
      },
    ],
  });
}

