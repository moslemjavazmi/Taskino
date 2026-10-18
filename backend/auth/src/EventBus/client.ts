// backend/auth/src/eventBus/client.ts
import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "task-service",
    brokers: [
    process.env.KAFKA_BROKER ||
      'localhost:29092',
  ],
});
