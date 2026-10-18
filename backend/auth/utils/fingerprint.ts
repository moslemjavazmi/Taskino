//backend/auth/utils/fingerprint.ts
import crypto from "crypto";

export function createFingerprint(
  deviceId: string,
  ip: string,
  userAgent: string
) {
  const raw = `${deviceId}|${ip}|${userAgent}`;
  return crypto.createHash("sha256").update(raw).digest("hex");
}
