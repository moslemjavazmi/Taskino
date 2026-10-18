// APIGateway/auth/src/services/token.service.ts
import crypto from "crypto";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

const REFRESH_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 30);

export class RefreshReuseError extends Error {
  constructor(public userId: string) {
    super("Refresh token reuse detected");
  }
}

/* ================= GENERATE ================= */

export async function generateRefreshToken(
  fingerprintHash: string,
  ip: string,
  userAgent: string
) {
  const token = crypto.randomBytes(48).toString("hex");
  const hash = await bcrypt.hash(token, 10);

  const expiresAt = new Date(Date.now() + REFRESH_DAYS * 86400000);

  return { token, hash, fingerprintHash, ip, userAgent, expiresAt };
}

/* ================= ROTATE + REUSE DETECTION ================= */

export async function rotateRefreshToken(
  oldToken: string,
  fingerprintHash: string
) {
  const tokens = await prisma.refreshToken.findMany();

  let matched = null;

  for (const t of tokens) {
    const ok =
      (await bcrypt.compare(oldToken, t.tokenHash)) &&
      t.fingerprintHash === fingerprintHash;

    if (ok) {
      matched = t;
      break;
    }
  }

  if (!matched) throw new Error("Invalid refresh token");

  if (matched.revoked) {
    await prisma.refreshToken.updateMany({
      where: { userId: matched.userId },
      data: { revoked: true, reuseDetected: true },
    });

    throw new RefreshReuseError(matched.userId);
  }

  await prisma.refreshToken.update({
    where: { id: matched.id },
    data: { revoked: true, revokedAt: new Date() },
  });

  return matched;
}

/* ================= REVOKE ================= */

export async function revokeAllSessions(userId: string) {
  await prisma.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
}

export async function revokeSingleSession(
  userId: string,
  refreshToken: string
) {
  const tokens = await prisma.refreshToken.findMany({
    where: { userId, revoked: false },
  });

  for (const t of tokens) {
    if (await bcrypt.compare(refreshToken, t.tokenHash)) {
      await prisma.refreshToken.update({
        where: { id: t.id },
        data: { revoked: true },
      });
      return;
    }
  }
}