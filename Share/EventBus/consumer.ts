// task/eventBus/consumer.ts
import { kafka } from "./client";
import { sendToDLQ } from "./dlq";
import { publishEvent } from "./producer";

const RETRY_TOPICS = [
  { suffix: "retry.5s", delay: 5_000 },
  { suffix: "retry.30s", delay: 30_000 },
];

export async function startConsumer<T>(
  groupId: string,
  topic: string,
  handler: (event: T) => Promise<void>
) {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    autoCommit: false,

    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString());
      const retryStep = Number(
        message.headers?.["x-retry-step"]?.toString() ?? "0"
      );

      try {
        await handler(event);

        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (Number(message.offset) + 1).toString(),
          },
        ]);
      } catch (err) {
        if (retryStep >= RETRY_TOPICS.length) {
          await sendToDLQ(topic, event, err);
        } else {
          const retry = RETRY_TOPICS[retryStep];

          await publishEvent(`${topic}.${retry.suffix}`, event, {
            "x-retry-step": Buffer.from(String(retryStep + 1)),
          });
        }

        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (Number(message.offset) + 1).toString(),
          },
        ]);
      }
    },
  });
}
