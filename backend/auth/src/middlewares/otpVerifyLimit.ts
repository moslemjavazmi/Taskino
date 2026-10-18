//backend/auth/src/middlewares/otpVerifyLimit.ts

import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma";

const MAX_VERIFY = 5;

export async function otpVerifyLimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { mobile } = req.body;
  const user = await prisma.user.findUnique({ where: { mobile } });

  if (!user) return next();

  if (user.otpBlockedUntil && user.otpBlockedUntil > new Date()) {
    return res.status(429).json({
      message: "Too many attempts. Try later.",
    });
  }

  if (user.otpAttempts >= MAX_VERIFY) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpBlockedUntil: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    return res.status(429).json({ message: "OTP blocked" });
  }

  next();
}
