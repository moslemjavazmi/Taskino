// backend/User/src/controllers/adminUserController.ts
import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { prisma } from "../lib/prisma";

// دریافت تمام پروفایل‌های کاربر (معادل همه کاربرانی که حداقل یک بار وارد شده‌اند)
export async function getAllUsers(req: AuthRequest, res: Response) {
  const profiles = await prisma.userProfile.findMany({
    include: {
      taskerProfile: true,
      verifications: true,
      skills: { include: { skill: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
console.log('profiles',profiles)
  // تبدیل به فرمت مورد نظر فرانت‌اند
  const formattedUsers = profiles.map(profile => ({
    id: profile.userId,
    name: profile.name || '---',
    mobile: '---', // اطلاعات موبایل در این سرویس نیست (از Auth باید گرفته شود)
    verified: false, // وضعیت تأیید در این سرویس نیست
    createdAt: profile.createdAt,
    role: profile.taskerProfile ? 'TASKER' : 'USER', // تخمین نقش بر اساس وجود پروفایل تسکر
    taskerProfile: profile.taskerProfile ? {
      isActive: profile.taskerProfile.isActive,
      hourlyRate: profile.taskerProfile.hourlyRate,
      serviceAreas: profile.taskerProfile.serviceAreas,
    } : null,
    verifications: profile.verifications,
    rating: profile.rating,
  }));
console.log('formattedUsers',formattedUsers)
  res.json(formattedUsers);
}

// دریافت فقط تسکرها (کسانی که TaskerProfile دارند)
export async function getAllTaskers(req: AuthRequest, res: Response) {
  const taskerProfiles = await prisma.taskerProfile.findMany({
    include: {
      userProfile: {
        include: {
          verifications: true,
          skills: { include: { skill: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const formattedTaskers = taskerProfiles.map(tp => ({
    id: tp.userProfile.userId,
    name: tp.userProfile.name || '---',
    mobile: '---', // از Auth باید گرفته شود
    verified: false,
    createdAt: tp.userProfile.createdAt,
    isActive: tp.isActive,
    hourlyRate: tp.hourlyRate,
    serviceAreas: tp.serviceAreas,
    rating: tp.userProfile.rating,
    verificationStatus: tp.userProfile.verifications[0]?.status || 'NONE'
  }));

  res.json(formattedTaskers);
}

// backend/User/src/controllers/adminUserController.ts

// دریافت جزئیات یک تسکر با استفاده از userId (شناسه خارجی)
export async function getTaskerById(req: AuthRequest, res: Response) {
  const userId = req.params.id;  // ← این همان userId سرویس Auth است

  // مرحله 1: پیدا کردن UserProfile بر اساس userId
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId },
    include: { taskerProfile: true },
  });

  if (!userProfile || !userProfile.taskerProfile) {
    return res.status(404).json({ message: 'Tasker not found' });
  }

  const tasker = userProfile.taskerProfile;
  res.json({
    id: userProfile.userId,
    name: userProfile.name,
    hourlyRate: tasker.hourlyRate,
    serviceAreas: tasker.serviceAreas,
    isActive: tasker.isActive,
  });
}

// بروزرسانی اطلاعات تسکر با استفاده از userId (شناسه خارجی)
export async function updateTasker(req: AuthRequest, res: Response) {
  const userId = req.params.id;
  const { name, hourlyRate, serviceAreas, isActive } = req.body;

  // پیدا کردن UserProfile
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId },
    include: { taskerProfile: true },
  });

  if (!userProfile || !userProfile.taskerProfile) {
    return res.status(404).json({ message: 'Tasker not found' });
  }

  const taskerProfileId = userProfile.taskerProfile.id;

  // به‌روزرسانی در تراکنش
  await prisma.$transaction([
    prisma.userProfile.update({
      where: { userId },
      data: { name },
    }),
    prisma.taskerProfile.update({
      where: { id: taskerProfileId }, // استفاده از شناسه واقعی TaskerProfile
      data: { hourlyRate, serviceAreas, isActive },
    }),
  ]);

  res.json({ message: 'Updated' });
}