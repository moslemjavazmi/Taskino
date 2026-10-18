// backend/auth/src/services/risk.service.ts
import { prisma } from "../../lib/prisma";

export async function calculateRisk(userId: string, ip?: string, device?: string) {
  let score = 0;

  // const last = await prisma.loginRiskEvent.findFirst({
  //   where: { userId },
  //   orderBy: { createdAt: "desc" },
  // });

  // if (!last) score += 20;
  // if (last?.ip && ip && last.ip !== ip) score += 40;
  // if (last?.device && device && last.device !== device) score += 40;

  // await prisma.loginRiskEvent.create({
  //   data: { userId, ip, device, riskScore: score },
  // });

  return score;
}