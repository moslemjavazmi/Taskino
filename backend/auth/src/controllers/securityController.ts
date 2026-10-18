// backend/auth/src/controllers/securityController.ts

import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { prisma } from "../../lib/prisma";

/* ===== Get security overview ===== */
export async function getSecurityOverview(req: AuthRequest, res: Response) {
  const userId = req.user!.id;

  const sessions = await prisma.refreshToken.findMany({
    where: { userId, revoked: false },
    orderBy: { createdAt: "desc" },
  });

  const devices = await prisma.trustedDevice.findMany({
    where: { userId },
  });

  const mfa = await prisma.mfaSecret.findUnique({
    where: { userId },
  });

  res.json({
    sessions,
    devices,
    mfaEnabled: mfa?.enabled ?? false,
  });
}

/* ===== Revoke single session ===== */
export async function revokeSession(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const { sessionId } = req.params;

  await prisma.refreshToken.updateMany({
    where: { id: sessionId, userId },
    data: { revoked: true, revokedAt: new Date() },
  });

  res.json({ ok: true });
}

/* ===== Remove trusted device ===== */
export async function removeDevice(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const { deviceId } = req.params;

  await prisma.trustedDevice.deleteMany({
    where: { id: deviceId, userId },
  });

  res.json({ ok: true });
}