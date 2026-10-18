// backend/auth/src/controllers/mfaController.ts
import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { generateMfaSetup, verifyMfa, enableMfa } from "../services/mfa.service";

export async function setupMfa(req: AuthRequest, res: Response) {
  const user = req.user!;
  const data = await generateMfaSetup(user.sub, user.mobile);
  res.json(data);
}

export async function confirmMfa(req: AuthRequest, res: Response) {
  const { token } = req.body;
  const user = req.user!;

  const valid = await verifyMfa(user.sub, token);
  if (!valid) return res.status(400).json({ message: "Invalid code" });

  await enableMfa(user.sub);

  res.json({ message: "MFA enabled" });
}