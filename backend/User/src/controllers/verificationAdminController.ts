// backend/User/src/controllers/verificationAdminController.ts
import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { prisma } from "../lib/prisma";
import { AppError } from "../middlewares/errorHandler";

/**
 * لیست Verification های در انتظار بررسی
 */
export async function listPendingVerifications(
  req: AuthRequest,
  res: Response,
) {
  const items = await prisma.verification.findMany({
    where: { status: "PENDING" },
    include: {
      userProfile: {
        select: {
          userId: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  res.json(items);
}

/**
 * Approve Verification
 */
export async function approveVerification(req: AuthRequest, res: Response) {
  const adminId = req.user!.id;
  const { id } = req.params;

  const verification = await prisma.verification.findUnique({
    where: { id },
  });

  if (!verification) {
    throw new AppError("Verification not found", 404);
  }

  if (verification.status !== "PENDING") {
    throw new AppError("Verification already processed", 400);
  }

  const updated = await prisma.verification.update({
    where: { id },
    data: {
      status: "APPROVED",
      reviewedAt: new Date(),
      reviewedBy: adminId,
      rejectionReason: null,
    },
  });

  // ⏭️ Phase 4: Emit Event (USER_VERIFIED)

  res.json(updated);
}

/**
 * Reject Verification
 */
export async function rejectVerification(req: AuthRequest, res: Response) {
  const adminId = req.user!.id;
  const { id } = req.params;
  const { reason } = req.body;

  if (!reason || reason.length < 3) {
    throw new AppError("Rejection reason is required", 400);
  }

  const verification = await prisma.verification.findUnique({
    where: { id },
  });

  if (!verification) {
    throw new AppError("Verification not found", 404);
  }

  if (verification.status !== "PENDING") {
    throw new AppError("Verification already processed", 400);
  }

  const updated = await prisma.verification.update({
    where: { id },
    data: {
      status: "REJECTED",
      reviewedAt: new Date(),
      reviewedBy: adminId,
      rejectionReason: reason,
    },
  });

  res.json(updated);
}
