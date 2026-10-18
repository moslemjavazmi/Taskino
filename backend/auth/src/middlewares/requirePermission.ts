//auth/src/middlewares/requirePermission.ts
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/auth-request";

export const requirePermission =
  (...permissions: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // super admin
    if (user.permissions.includes("*")) {
      return next();
    }

    const allowed = permissions.some((p) =>
      user.permissions.includes(p)
    );

    if (!allowed) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
