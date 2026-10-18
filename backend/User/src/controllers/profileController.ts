// // // APIGateway/User/src/controllers/profileController.ts
// // import { Response } from "express";
// // import { AuthRequest } from "../types/auth-request";
// // import { prisma } from "../lib/prisma";

// // // گرفتن پروفایل خود کاربر
// // export async function getMyProfile(req: AuthRequest, res: Response) {
// //   const userId = req.user!.id;
// //   const profile = await prisma.userProfile.findUnique({
// //     where: { userId },
// //     include: {
// //       taskerProfile: true,
// //       skills: {
// //         include: { skill: true },
// //       },
// //       verifications: true,
// //     },
// //   });

// //   if (!profile) {
// //     // lazy create
// //     const created = await prisma.userProfile.create({
// //       data: {
// //         userId,
// //       },
// //       include: {
// //         taskerProfile: true,
// //         skills: { include: { skill: true } },
// //         verifications: true,
// //       },
// //     });
// //     return res.json(created);
// //   }

// //   res.json(profile);
// // }

// // // آپدیت پروفایل کاربر
// // export async function updateMyProfile(req: AuthRequest, res: Response) {
// //   const userId = req.user!.id;

// //   const { name, avatarUrl, bio, location } = req.body;

// //   const profile = await prisma.userProfile.upsert({
// //     where: { userId },
// //     update: { name, avatarUrl, bio, location },
// //     create: { userId, name, avatarUrl, bio, location },
// //   });

// //   res.json(profile);
// // }


// // backend/User/src/controllers/profileController.ts
// import { Response } from "express";
// import { AuthRequest } from "../types/auth-request";
// import { prisma } from "../lib/prisma";

// export async function checkProfileExists(req: AuthRequest, res: Response) {
//   const userId = req.user!.id;
//   const profile = await prisma.userProfile.findUnique({
//     where: { userId },
//     select: { id: true } // فقط چک کنید، ایجاد نکنید
//   });
//   res.json({ exists: !!profile });
// }
// export async function getMyProfile(req: AuthRequest, res: Response) {
//   const userId = req.user!.id;
//   const profile = await prisma.userProfile.findUnique({
//     where: { userId },
//     include: { taskerProfile: true, skills: { include: { skill: true } }, verifications: true },
//   });

//   if (!profile) {
//     return res.status(404).json({ message: "Profile not found" });
//   }
//   res.json(profile);
// }

// export async function updateMyProfile(req: AuthRequest, res: Response) {
//   const userId = req.user!.id;
//   const { name, avatarUrl, bio, locationLat, locationLng } = req.body; // تغییر اینجا

//   const profile = await prisma.userProfile.upsert({
//     where: { userId },
//     update: { name, avatarUrl, bio, locationLat, locationLng }, // تغییر اینجا
//     create: { userId, name, avatarUrl, bio, locationLat, locationLng }, // تغییر اینجا
//   });

//   res.json(profile);
// }

// // // backend/User/src/controllers/profileController.ts

import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { prisma } from "../lib/prisma";

export async function checkProfileExists(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    select: { id: true }
  });
  res.json({ exists: !!profile });
}

export async function getMyProfile(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    include: { 
      taskerProfile: true, 
      skills: { include: { skill: true } }, 
      verifications: true 
    },
  });
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  res.json(profile);
}

export async function updateMyProfile(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const { name, avatarUrl, bio, locationLat, locationLng } = req.body;

  const profile = await prisma.userProfile.upsert({
    where: { userId },
    update: { name, avatarUrl, bio, locationLat, locationLng },
    create: { userId, name, avatarUrl, bio, locationLat, locationLng },
  });
  res.json(profile);
}