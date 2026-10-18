//auth/src/middlewares/requireRole.ts
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/auth-request";

export const requireRole =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasRole = roles.some((r) =>
      user.roles.includes(r)
    );

    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
