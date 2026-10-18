// APIGateway/User/src/middlewares/requirePermission.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth-request";

export function requirePermission(...permissions: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasPermission = permissions.every((p) =>
      req.user!.permissions.includes(p)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden (permission)" });
    }

    next();
  };
}
