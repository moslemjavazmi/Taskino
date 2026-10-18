// eventBus/dlq.ts
import { producer, initProducer } from "./producer";

export async function sendToDLQ(
  originalTopic: string,
  event: any,
  error: unknown
) {
  await initProducer();

  await producer.send({
    topic: `${originalTopic}.dlq`,
    messages: [
      {
        key: event?.eventId ?? undefined,
        value: JSON.stringify({
          event,
          error: error instanceof Error ? error.message : String(error),
          failedAt: new Date().toISOString(),
        }),
      },
    ],
  });
}
