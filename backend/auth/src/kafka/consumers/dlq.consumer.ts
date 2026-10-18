// auth/src/consumers/dlq.consumer.ts
import { startConsumer } from "@eventBus/consumer";

export async function startDLQConsumer() {
  await startConsumer(
    "auth-dlq-consumer",
    "user.verification.approved.DLQ",
    async (payload) => {
      console.error("❌ DLQ EVENT", payload);

      // بعداً:
      // - save to DB
      // - send Slack alert
      // - manual replay
    }
  );
}
