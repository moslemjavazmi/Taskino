//backend/auth/src/kafka/index.ts
import { startUserVerificationConsumer } from "./consumers/user-verification.consumer";

export async function startKafkaConsumers() {
  await startUserVerificationConsumer();
}
