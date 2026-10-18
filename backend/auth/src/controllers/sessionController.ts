
// backend/auth/src/controllers/sessionController.ts
import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import {
  getUserSessions,
  revokeSessionById,
} from "../services/session.service";

/* ===== LIST SESSIONS ===== */

export async function listSessions(req: AuthRequest, res: Response) {
  const sessions = await getUserSessions(req.user!.id);
  res.json(sessions);
}

/* ===== REVOKE SINGLE ===== */

export async function revokeSession(req: AuthRequest, res: Response) {
  const { sessionId } = req.params;

  await revokeSessionById(req.user!.id, sessionId);

  res.json({ ok: true });
}