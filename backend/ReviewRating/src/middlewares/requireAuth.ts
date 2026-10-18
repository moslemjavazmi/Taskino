// //RatingService/src/middlewares/requireAuth.ts

import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

export type AuthRequest = Request & {
  user?: {
    id: string;
  };
};

const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.slice(7);

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"], // یا RS256 اگر کلید public داری
    });

    if (!payload.sub || typeof payload.sub !== "string") {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = { id: payload.sub };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
