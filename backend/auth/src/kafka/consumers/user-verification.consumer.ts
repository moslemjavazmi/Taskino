// auth/src/consumers/user-verification.consumer.ts

import { startConsumer } from "../../EventBus/consumer";

import { UserEvents } from "../../EventBus/contracts/user.events";
import { prisma } from "../../../lib/prisma";

export function startUserVerificationConsumer() {
  startConsumer(
    "auth-service",
    UserEvents.VerificationApproved,
    async (event) => {
      const processed = await prisma.processedEvent.findUnique({
        where: { eventId: event.eventId },
      });

      if (processed) return;

      // business logic
      await prisma.user.update({
        where: { id: event.payload.userId },
        data: { verified: true },
      });

      await prisma.processedEvent.create({
        data: { eventId: event.eventId },
      });
    },
  );
}
