// APIGateway/user/src/services/jwt.service.ts
import { jwtVerify } from "jose";

const encoder = new TextEncoder();
const ACCESS_SECRET = encoder.encode(process.env.JWT_ACCESS_SECRET!);
const ISSUER = process.env.JWT_ISSUER!;
const AUDIENCE = process.env.JWT_AUDIENCE!;

export type JwtPayload = {
  sub: string;
  mobile?: string;
  roles: string[];
  permissions: string[];
};

export async function verifyAccessToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, ACCESS_SECRET, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });

  return payload as JwtPayload;
}