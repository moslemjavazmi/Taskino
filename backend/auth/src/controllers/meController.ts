// APIGateway/auth/src/controllers/meController.ts

import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { prisma } from "../../lib/prisma";

export async function me(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: { role: true },
      },
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    id: user.id,
    mobile: user.mobile,
    verified: user.verified,
    roles: user.roles.map((r) => r.role.name),
    permissions: req.user!.permissions, // از JWT
  });
}