// backend/auth/src/services/device.service.ts
import { prisma } from "../../lib/prisma";

export async function trustDevice(userId: string, deviceHash: string) {
  await prisma.trustedDevice.upsert({
    where: {
      userId_deviceHash: { userId, deviceHash },
    },
    update: {},
    create: { userId, deviceHash },
  });
}

export async function isTrustedDevice(userId: string, deviceHash: string) {
  const device = await prisma.trustedDevice.findUnique({
    where: {
      userId_deviceHash: { userId, deviceHash },
    },
  });

  return !!device;
}