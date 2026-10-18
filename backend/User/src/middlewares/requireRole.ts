// // APIGateway/User/src/middlewares/requireRole.ts
// import { Response, NextFunction } from "express";
// import { AuthRequest } from "../types/auth-request";

// export function requireRole(...roles: string[]) {
//   return (req: AuthRequest, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const hasRole = roles.some((r) => req.user!.roles.includes(r));
//     if (!hasRole) {
//       return res.status(403).json({ message: "Forbidden (role)" });
//     }

//     next();
//   };
// }
// backend/User/src/middlewares/requireRole.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth-request";

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // اطمینان از وجود roles (مقادیر خالی به معنای عدم دسترسی است)
    const userRoles = req.user.roles || [];
    const hasRole = roles.some((r) => userRoles.includes(r));

    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden (role)" });
    }
    next();
  };
}