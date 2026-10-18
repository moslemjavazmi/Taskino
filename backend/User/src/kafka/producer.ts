// APIGateway/User/src/kafka/producer.ts
import { publishEvent } from "@eventBus/producer";
import { UserEvents } from "@eventBus/contracts/user.events";
import crypto from "crypto";

export async function emitVerificationApproved(
  userId: string,
  adminId: string
) {
  await publishEvent<UserEvents.VerificationApprovedPayload>(
    UserEvents.VerificationApproved,
    {
      eventId: crypto.randomUUID(),
      eventType: UserEvents.VerificationApproved,
      version: 1,
      occurredAt: new Date().toISOString(),
      payload: {
        userId,
        verifiedBy: adminId,
      },
    }
  );
}
