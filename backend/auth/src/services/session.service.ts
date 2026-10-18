// backend/auth/src/services/session.service.ts
import { prisma } from "../../lib/prisma";

export async function getUserSessions(userId: string) {
  return prisma.refreshToken.findMany({
    where: { userId, revoked: false },
    select: {
      id: true,
      ip: true,
      userAgent: true,
      createdAt: true,
      expiresAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function revokeSessionById(userId: string, sessionId: string) {
  await prisma.refreshToken.updateMany({
    where: { id: sessionId, userId },
    data: { revoked: true, revokedAt: new Date() },
  });
}