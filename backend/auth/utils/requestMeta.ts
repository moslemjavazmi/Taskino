//backend/auth/utils/requestMeta.ts
import type { Request } from "express";

export function getRequestMeta(req: Request) {
  const deviceId =
    (req.headers["x-device-id"] as string) ?? "unknown-device";

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ??
    req.socket.remoteAddress ??
    "unknown-ip";

  const userAgent = req.headers["user-agent"] ?? "unknown-ua";

  return { deviceId, ip, userAgent };
}
