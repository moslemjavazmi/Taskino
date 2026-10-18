// auth/src/kafka/consumer.ts
import { startConsumer } from "./../EventBus/consumer";
// import { UserEvents } from "@eventBus/contracts/user.events";
import { UserEvents } from "./../EventBus/contracts/user.events";
import { prisma } from "../../lib/prisma";

export async function startAuthConsumers() {
  await startConsumer<UserEvents.VerificationApprovedEvent>(
    "auth-service",
    UserEvents.VerificationApproved,
    async (event) => {
      // const exists = await prisma.processedEvent.findUnique({
      //   where: { eventId: event.eventId },
      // });

      // if (exists) return;

      // // business logic
      // await prisma.userVerificationClaim.upsert({
      //   where: {
      //     userId_verificationType: {
      //       userId: event.payload.userId,
      //       verificationType: "IDENTITY",
      //     },
      //   },
      //   update: { verified: true },
      //   create: {
      //     userId: event.payload.userId,
      //     verificationType: "IDENTITY",
      //     verified: true,
      //   },
      // });

      // await prisma.processedEvent.create({
      //   data: { eventId: event.eventId },
      // });
    },
  );
}
