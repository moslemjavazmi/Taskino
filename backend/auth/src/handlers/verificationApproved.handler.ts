// backend/auth/src/handlers/verificationApproved.handler.ts
import { prisma } from "../../lib/prisma";

export async function handleVerificationApproved(event: any) {
  const { userId, verificationType } = event.payload;

  // idempotency
  const processed = await prisma.processedEvent.findUnique({
    where: { eventId: event.eventId },
  });
  if (processed) return;

  await prisma.userVerificationClaim.upsert({
    where: {
      userId_verificationType: {
        userId,
        verificationType,
      },
    },
    update: { verified: true },
    create: { userId, verificationType, verified: true },
  });

  // revoke refresh tokens
  await prisma.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });

  await prisma.processedEvent.create({
    data: { eventId: event.eventId },
  });
}
