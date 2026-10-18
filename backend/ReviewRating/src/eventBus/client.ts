// //ReviewRatingsrc/eventBus/client.ts
//
import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
  clientId: "rating-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:29092"],
  logLevel: logLevel.ERROR,
});
