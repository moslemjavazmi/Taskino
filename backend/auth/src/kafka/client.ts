//backend/auth/src/kafka/client.ts
import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "auth-service",
  brokers: [process.env.KAFKA_BROKER!],
});
