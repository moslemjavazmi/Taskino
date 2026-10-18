// APIGateway/User/src/controllers/skillController.ts
import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { prisma } from "../lib/prisma";

// فقط ادمین: ایجاد Skill جدید
export async function createSkill(req: AuthRequest, res: Response) {
  const { name, icon } = req.body;
  const skill = await prisma.skill.create({ data: { name, icon } });
  res.json(skill);
}

// لیست تمام Skillها
export async function listSkills(req: AuthRequest, res: Response) {
  const skills = await prisma.skill.findMany();
  res.json(skills);
}

// افزودن skills به کاربر (tasker)
export async function setMySkills(req: AuthRequest, res: Response) {
  const userId = req.user!.id;

  const { skills }: { skills: { skillId: string; level: number }[] } = req.body;

  const profile = await prisma.userProfile.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  // حذف skill های قبلی
  await prisma.taskerSkill.deleteMany({
    where: { userProfileId: profile.id },
  });

  // اضافه کردن جدیدها
  await prisma.taskerSkill.createMany({
    data: skills.map((s) => ({
      userProfileId: profile.id,
      skillId: s.skillId,
      level: s.level,
    })),
  });

  const withSkills = await prisma.userProfile.findUnique({
    where: { id: profile.id },
    include: { skills: { include: { skill: true } } },
  });

  res.json(withSkills);
}
