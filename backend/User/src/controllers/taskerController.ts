// //APIGateway/User/src/controllers/taskerController.ts
import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { prisma } from "../lib/prisma";
import {
  publishTaskerUpdated,
}
from '../eventBus/tasker.producer';
// // گرفتن پروفایل تسکر
// export async function getMyTaskerProfile(req: AuthRequest, res: Response) {
//   const userId = req.user!.id;

//   const profile = await prisma.userProfile.findUnique({
//     where: { userId },
//     include: { taskerProfile: true },
//   });

//   if (!profile) {
//     return res.status(404).json({ message: "User profile not found" });
//   }

//   res.json(profile.taskerProfile);
// }

// // آپدیت/ایجاد پروفایل تسکر
// export async function upsertMyTaskerProfile(req: AuthRequest, res: Response) {
//   const userId = req.user!.id;

//   const { isActive, hourlyRate, serviceAreas } = req.body;

//   const userProfile = await prisma.userProfile.upsert({
//     where: { userId },
//     update: {},
//     create: { userId },
//   });

//   const taskerProfile = await prisma.taskerProfile.upsert({
//     where: { userProfileId: userProfile.id },
//     update: { isActive, hourlyRate, serviceAreas },
//     create: {
//       userProfileId: userProfile.id,
//       isActive,
//       hourlyRate,
//       serviceAreas,
//     },
//   });
  

//   res.json(taskerProfile);
// }



// export async function checkTaskerProfileExists(req: AuthRequest, res: Response) {
//   const userId = req.user!.id;
//   const profile = await prisma.userProfile.findUnique({
//     where: { userId },
//     include: { taskerProfile: true }
//   });
//   const exists = !!(profile && profile.taskerProfile);
//   res.json({ exists });
// }

// APIGateway/User/src/controllers/taskerController.ts

// ... سایر importها

// آپدیت/ایجاد پروفایل تسکر
export async function upsertMyTaskerProfile(req: AuthRequest, res: Response) {
  const userId = req.user!.id;

  let { isActive, hourlyRate, serviceAreas } = req.body;

  // اعتبارسنجی اولیه
  if (hourlyRate !== undefined && (isNaN(hourlyRate) || hourlyRate < 0)) {
    return res.status(400).json({ message: "Hourly rate must be a positive number" });
  }
  if (serviceAreas !== undefined && !Array.isArray(serviceAreas)) {
    return res.status(400).json({ message: "Service areas must be an array of strings" });
  }

  // پیش‌فرض‌ها
  if (isActive === undefined) isActive = false;
  if (serviceAreas === undefined) serviceAreas = [];

  // یافتن یا ایجاد UserProfile (اطمینان از وجود پروفایل پایه)
  const userProfile = await prisma.userProfile.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  // بروزرسانی یا ایجاد TaskerProfile
  const taskerProfile = await prisma.taskerProfile.upsert({
    where: { userProfileId: userProfile.id },
    update: { isActive, hourlyRate, serviceAreas },
    create: {
      userProfileId: userProfile.id,
      isActive,
      hourlyRate,
      serviceAreas,
    },
  });
  const profile =
  await prisma.userProfile.findUnique({
    where: {
      userId,
    },

    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

await publishTaskerUpdated({
  taskerId: taskerProfile.id,

  userId,

  fullName: profile?.name,

  skills:
    profile?.skills
      .map((s) => s.skill.name)
      .join(',') || '',

  rating: profile?.rating || 0,

  city:
    taskerProfile.serviceAreas?.[0] ||
    '',

  isOnline:
    taskerProfile.isActive,
});

  res.json(taskerProfile);
}

// بررسی وجود پروفایل تسکر (برای هدایت به صفحه تکمیل اطلاعات)
export async function checkTaskerProfileExists(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    include: { taskerProfile: true }
  });
  const exists = !!(profile && profile.taskerProfile);
  res.json({ exists });
}
export async function getMyTaskerProfile(req: AuthRequest, res: Response) {
  const userId = req.user!.id;

  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    include: { taskerProfile: true },
  });

  if (!profile || !profile.taskerProfile) {
    return res.status(404).json({ message: "Tasker profile not found" });
  }

  res.json(profile.taskerProfile);
}