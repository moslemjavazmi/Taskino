//backend/User/src/controllers/verificationController.ts
import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { prisma } from "../lib/prisma";

export async function getMyVerifications(req: AuthRequest, res: Response) {
  const userId = req.user!.id;

  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    include: { verifications: true },
  });

  if (!profile) {
    return res.json([]);
  }

  res.json(profile.verifications);
}

export async function requestVerification(req: AuthRequest, res: Response) {
  const userId = req.user!.id;

  const { type, documentUrl } = req.body;

  const profile = await prisma.userProfile.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  const v = await prisma.verification.create({
    data: {
      userProfileId: profile.id,
      type,
      documentUrl,
    },
  });

  res.json(v);
}
