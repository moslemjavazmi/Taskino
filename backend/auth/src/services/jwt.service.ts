  //auth/servicess/jwt.service.ts
  import { SignJWT, jwtVerify } from "jose";

  const encoder = new TextEncoder();
const ACCESS_EXPIRES = process.env.JWT_EXPIRES_IN || "15m"; 
  const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
  const ISSUER = process.env.JWT_ISSUER!;
  const AUDIENCE = process.env.JWT_AUDIENCE!;
const accessKey = new TextEncoder().encode(ACCESS_SECRET);
  export type JwtPayload = {
    sub: string;
    mobile?: string;
    roles: string[];
    permissions: string[];
  };

export async function signAccessToken(payload: JwtPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_EXPIRES)
    .setIssuer(ISSUER)        // ← اضافه شود
    .setAudience(AUDIENCE)    // ← اضافه شود (مهم)
    .sign(accessKey);
}

  export async function verifyAccessToken(token: string): Promise<JwtPayload> {
    const { payload } = await jwtVerify(token, accessKey, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    return payload as JwtPayload;
  }
