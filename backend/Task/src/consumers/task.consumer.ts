// backend/Task/src/consumers/task.consumer.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'test-consumer',
  brokers: ['localhost:29092'],
});

const consumer = kafka.consumer({
  groupId: 'test-group',
});

async function run() {
  await consumer.connect();

  await consumer.subscribe({
    topic: 'tasks',
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(
        'EVENT =>',
        message.value?.toString(),
      );
    },
  });
}

run();