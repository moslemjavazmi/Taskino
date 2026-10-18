// APIGateway/User/src/middlewares/requireOwner.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth-request";

export function requireOwner(getOwnerId: (req: AuthRequest) => string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const ownerId = getOwnerId(req);
    if (ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden (owner)" });
    }

    next();
  };
}
