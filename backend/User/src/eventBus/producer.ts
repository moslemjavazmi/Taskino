// task/eventBus/producer.ts
import { kafka } from "./client";

export const producer = kafka.producer();

let connected = false;

export async function initProducer() {
  if (!connected) {
    await producer.connect();
    connected = true;
  }
}

export async function publishEvent<T>(
  topic: string,
  event: T,
  headers: Record<string, Buffer> = {},
) {
  await producer.send({
    topic,
    messages: [
      {
        key: (event as any).eventId,
        value: JSON.stringify(event),
        headers,
      },
    ],
  });
}
