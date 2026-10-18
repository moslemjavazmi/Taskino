// backend/auth/src/controllers/authController.ts

import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { prisma } from "../../lib/prisma";
import { generateCode } from "../../utils/generateCode";
import { signAccessToken } from "../services/jwt.service";
import {
  generateRefreshToken,
  rotateRefreshToken,
  revokeSingleSession,
  revokeAllSessions,
  RefreshReuseError,
} from "../services/token.service";
import { createFingerprint } from "../../utils/fingerprint";
import { getRequestMeta } from "../../utils/requestMeta";
import { accessCookieOptions, refreshCookieOptions } from "../config/cookies";
import { trustDevice } from "../services/device.service";
import { isTrustedDevice } from "../services/device.service";
import { calculateRisk } from "../services/risk.service";

/* ================= SEND OTP ================= */
const ACCESS_EXPIRES = process.env.JWT_EXPIRES_IN || "15m"; 
export async function sendCode(req: AuthRequest, res: Response) {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile required" });

const { deviceId, ip, userAgent } = getRequestMeta(req);
const fingerprintHash = createFingerprint(deviceId, ip, userAgent);
const user = await prisma.user.findUnique({ where: { mobile } });
// if (user && await isTrustedDevice(user.id, fingerprintHash)) {
//   return res.json({ trusted: true, skipOtp: true });
// }
  const code = generateCode();
  await prisma.user.upsert({
    where: { mobile },
    update: {
      otpCode: code,
      otpExpiresAt: new Date(Date.now() + 2 * 60 * 1000),
      otpAttempts: { increment: 1 },
    },
    create: {
      mobile,
      otpCode: code,
      otpExpiresAt: new Date(Date.now() + 2 * 60 * 1000),
      otpAttempts: 1,
      verified: false,
    },
  });

  console.log("DEV OTP:", code);
  res.json({ message: "OTP sent" });
}

/* ================= VERIFY OTP ================= */

// export async function verifyCode(req: AuthRequest, res: Response) {
//   const { mobile, code } = req.body;
//   const user = await prisma.user.findUnique({
//     where: { mobile },
//     include: { roles: { include: { role: true } } },
//   });
//   console.log('user', user)
//   // if (!user || user.otpCode !== code || !user.otpExpiresAt)
//   //   return res.status(401).json({ message: "Invalid code" });

//   // if (user.otpExpiresAt < new Date())
//   //   return res.status(401).json({ message: "Code expired" });
//   // const mfa = await prisma.mfaSecret.findUnique({
//   //   where: { userId: user.id },
//   // });

//   // if (mfa?.enabled) {
//   //   return res.json({
//   //     mfaRequired: true,
//   //     userId: user.id,
//   //   });
//   // }
//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       otpCode: null,
//       otpExpiresAt: null,
//       otpAttempts: 0,
//       verified: true,
//     },
//   });
//   console.log('update')

//   const { deviceId, ip, userAgent } = getRequestMeta(req);
//   const fingerprintHash = createFingerprint(deviceId, ip, userAgent);
//   await trustDevice(user.id, fingerprintHash);
//   const refresh = await generateRefreshToken(fingerprintHash, ip, userAgent);
//   console.log('refresh', refresh)
//   console.log('fingerprintHash', fingerprintHash)
//   await prisma.refreshToken.create({
//     data: {
//       userId: user.id,
//       tokenHash: refresh.hash,
//       fingerprintHash,
//       ip,
//       userAgent,
//       expiresAt: refresh.expiresAt,
//     },
//   });
//   const risk = await calculateRisk(user.id, ip, userAgent);
//   console.log('risk', risk)
//   if (risk >= 60) {
//     return res.status(403).json({
//       message: "High risk login — additional verification required",
//       risk,
//     });
//   }
//   // const accessToken = await signAccessToken({
//   //   sub: user.id,
//   //   mobile: user.mobile,
//   //   roles: user.roles.map((r) => r.role.name),
//   //   permissions: [],
//   // });
//   // res
//   //   .cookie("access_token", accessToken, {
//   //     httpOnly: true,
//   //     sameSite: "lax",
//   //     secure: process.env.NODE_ENV === "production",
//   //     maxAge: 60 * 15,
//   //     path: "/",
//   //   })
//   //   .cookie("refresh_token", refresh.token, {
//   //     httpOnly: true,
//   //     sameSite: "lax",
//   //     secure: process.env.NODE_ENV === "production",
//   //     maxAge: 60 * 15,
//   //     path: "/",
//   //   })
//   //   .json({ ok: true });
//   // در verifyCode function، تنظیمات کوکی را اصلاح کنید:

//   const accessToken = await signAccessToken({
//     sub: user.id,
//     mobile: user.mobile,
//     roles: user.roles.map((r) => r.role.name),
//     permissions: [],
//   });

//   // تنظیمات صحیح کوکی
//   const isProduction = process.env.NODE_ENV === "production";

//   // res
//   //   .cookie("access_token", accessToken, {
//   //     httpOnly: true,
//   //     sameSite: "lax",
//   //     secure: false, // برای localhost باید false باشد
//   //     maxAge: 15 * 60 * 1000, // 15 دقیقه به میلی‌ثانیه
//   //     path: "/",
//   //     domain: "localhost", // اضافه کردن دامنه
//   //   })
//   //   .cookie("refresh_token", refresh.token, {
//   //     httpOnly: true,
//   //     sameSite: "lax",
//   //     secure: false, // برای localhost باید false باشد
//   //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 روز
//   //     path: "/",
//   //     domain: "localhost",
//   //   })
//   //   .json({ ok: true, accessToken, refreshToken: refresh.token }); // همچنین توکن‌ها را در response برگردانید
//   // }
//   res
//     .cookie("access_token", accessToken, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false,
//       maxAge: 15 * 60 * 1000,
//       path: "/",
//       domain: "localhost",
//     })
//     .cookie("refresh_token", refresh.token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false,
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//       path: "/",
//       domain: "localhost",
//     })
//     .json({
//       ok: true,
//       accessToken,
//       refreshToken: refresh.token,
//       user: {
//         id: user.id,
//         mobile: user.mobile,
//         verified: user.verified,
//         roles: user.roles.map((r) => r.role.name), // ["ADMIN"]
//         permissions: [], // در صورت نیاز از JWT یا دیتابیس
//       },
//     });
// }



export async function verifyCode(req: AuthRequest, res: Response) {
  const { mobile, code } = req.body;

  // 1. Fetch user with roles
  let user = await prisma.user.findUnique({
    where: { mobile },
    include: { roles: { include: { role: true } } },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 2. Validate OTP (commented out for dev – uncomment in production)
  // if (user.otpCode !== code || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
  //   return res.status(401).json({ message: "Invalid or expired code" });
  // }

  // 3. Mark user as verified and clear OTP fields
  await prisma.user.update({
    where: { id: user.id },
    data: {
      otpCode: null,
      otpExpiresAt: null,
      otpAttempts: 0,
      verified: true,
    },
  });

  // 4. Assign default role "USER" if user has no roles
  if (user.roles.length === 0) {
    const defaultRole = await prisma.role.findUnique({ where: { name: "USER" } });
    if (defaultRole) {
      await prisma.userRole.create({
        data: { userId: user.id, roleId: defaultRole.id },
      });
      // Re-fetch user to include the newly assigned role
      user = await prisma.user.findUnique({
        where: { id: user.id },
        include: { roles: { include: { role: true } } },
      });
    }
  }

  // 5. Device fingerprinting & refresh token
  const { deviceId, ip, userAgent } = getRequestMeta(req);
  const fingerprintHash = createFingerprint(deviceId, ip, userAgent);
  await trustDevice(user.id, fingerprintHash);

  const refresh = await generateRefreshToken(fingerprintHash, ip, userAgent);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: refresh.hash,
      fingerprintHash,
      ip,
      userAgent,
      expiresAt: refresh.expiresAt,
    },
  });

  // 6. Risk assessment (optional)
  const risk = await calculateRisk(user.id, ip, userAgent);
  if (risk >= 60) {
    return res.status(403).json({
      message: "High risk login — additional verification required",
      risk,
    });
  }

  // 7. Generate access token (using updated user roles)
  const accessToken = await signAccessToken({
    sub: user.id,
    mobile: user.mobile,
    roles: user.roles.map((r) => r.role.name),
    permissions: [],
  });

  // 8. Set cookies and send response
  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production with HTTPS
      maxAge: 150 * 60 * 1000,
      path: "/",
      domain: "localhost",
    })
    .cookie("refresh_token", refresh.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
      domain: "localhost",
    })
    .json({
      ok: true,
      accessToken,
      refreshToken: refresh.token,
      user: {
        id: user.id,
        mobile: user.mobile,
        verified: user.verified,
        roles: user.roles.map((r) => r.role.name),
        permissions: [],
      },
    });
}
/* ================= REFRESH ================= */

export async function refreshToken(req: AuthRequest, res: Response) {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).json({ message: "No session" });

  const { deviceId, ip, userAgent } = getRequestMeta(req);
  const fingerprintHash = createFingerprint(deviceId, ip, userAgent);

  try {
    const matched = await rotateRefreshToken(token, fingerprintHash);

    const user = await prisma.user.findUnique({
      where: { id: matched.userId },
      include: { roles: { include: { role: true } } },
    });

    if (!user) return res.status(401).json({ message: "Invalid session" });

    const fresh = await generateRefreshToken(fingerprintHash, ip, userAgent);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: fresh.hash,
        fingerprintHash,
        ip,
        userAgent,
        expiresAt: fresh.expiresAt,
      },
    });

    const accessToken = await signAccessToken({
      sub: user.id,
      mobile: user.mobile,
      roles: user.roles.map((r) => r.role.name),
      permissions: [],
    });

    res
      .cookie("access_token", accessToken, accessCookieOptions)
      .cookie("refresh_token", fresh.token, refreshCookieOptions)
      .json({ ok: true });

  } catch (err) {

    if (err instanceof RefreshReuseError) {
      return res.status(401).json({
        message: "Session compromised",
        code: "SESSION_COMPROMISED",
      });
    }

    return res.status(401).json({ message: "Invalid refresh token" });
  }
}

/* ================= LOGOUT ================= */

export async function logout(req: AuthRequest, res: Response) {
  const token = req.cookies.refresh_token;
  if (token) await revokeSingleSession(req.user!.id, token);

  res.clearCookie("refresh_token", refreshCookieOptions);
  res.clearCookie("access_token", accessCookieOptions);

  res.json({ message: "Logged out" });
}

export async function logoutAll(req: AuthRequest, res: Response) {
  await revokeAllSessions(req.user!.id);

  res.clearCookie("refresh_token", refreshCookieOptions);
  res.clearCookie("access_token", accessCookieOptions);

  res.json({ message: "All sessions revoked" });
}