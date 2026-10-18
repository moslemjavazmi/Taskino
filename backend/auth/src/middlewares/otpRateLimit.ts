//backend/auth/src/middlewares/otpRateLimit.ts
import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma";

const MAX_SEND = 3;
const WINDOW_MIN = 10;

export async function otpSendRateLimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile required" });

  const user = await prisma.user.findUnique({ where: { mobile } });

  if (!user) return next();

  if (user.otpBlockedUntil && user.otpBlockedUntil > new Date()) {
    return res.status(429).json({
      message: "Too many requests. Try later.",
    });
  }

  const since = new Date(Date.now() - WINDOW_MIN * 60 * 1000);

  if (
    user.updatedAt > since &&
    user.otpAttempts >= MAX_SEND
  ) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpBlockedUntil: new Date(Date.now() + 15 * 60 * 1000),
        otpAttempts: 0,
      },
    });

    return res.status(429).json({ message: "OTP blocked" });
  }

  next();
}
