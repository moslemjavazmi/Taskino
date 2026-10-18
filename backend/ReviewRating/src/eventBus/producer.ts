// src/eventBus/producer.ts
import { kafka } from "./client";
import { randomUUID } from "crypto";

const producer = kafka.producer();
let connected = false;

export async function initProducer() {
  if (!connected) {
    await producer.connect();
    connected = true;
  }
}

export async function publishEvent<TPayload>(
  topic: string,
  payload: TPayload,
  options: { correlationId?: string } = {},
) {
  const event = {
    eventId: randomUUID(),
    eventType: topic,
    version: 1,
    occurredAt: new Date().toISOString(),
    correlationId: options.correlationId ?? randomUUID(),
    payload,
  };

  await producer.send({
    topic,
    messages: [
      {
        key: event.eventId,
        value: JSON.stringify(event),
      },
    ],
  });

  return event;
}
