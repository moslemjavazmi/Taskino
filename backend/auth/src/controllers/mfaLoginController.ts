// backend/auth/src/controllers/mfaLoginController.ts
import { Request, Response } from "express";
import { verifyMfa } from "../services/mfa.service";
import { signAccessToken } from "../services/jwt.service";

export async function verifyMfaLogin(req: Request, res: Response) {
  const { userId, token } = req.body;

  const valid = await verifyMfa(userId, token);
  if (!valid) return res.status(401).json({ message: "Invalid MFA" });

  const accessToken = await signAccessToken({ sub: userId });

  res.json({ accessToken });
}