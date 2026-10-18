//auth/src/middlewares/requireAuth.ts
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/auth-request";
import { verifyAccessToken } from "../services/jwt.service";

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = await verifyAccessToken(token);

   req.user = {
  id: payload.sub,
  roles: payload.roles,
  permissions: payload.permissions ?? [],
};

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
