// backend/auth/src/services/mfa.service.ts
import { authenticator } from "otplib";
import QRCode from "qrcode";
import { prisma } from "../../lib/prisma";

export async function generateMfaSetup(userId: string, email: string) {
  const secret = authenticator.generateSecret();

  const otpauth = authenticator.keyuri(email, "YourApp", secret);

  const qr = await QRCode.toDataURL(otpauth);

  await prisma.mfaSecret.upsert({
    where: { userId },
    update: { secret, enabled: false },
    create: { userId, secret },
  });

  return { qr, secret };
}

export async function verifyMfa(userId: string, token: string) {
  const record = await prisma.mfaSecret.findUnique({ where: { userId } });
  if (!record) return false;

  return authenticator.verify({ token, secret: record.secret });
}

export async function enableMfa(userId: string) {
  await prisma.mfaSecret.update({
    where: { userId },
    data: { enabled: true },
  });
}