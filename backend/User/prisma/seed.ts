//auth/prisma/seed.ts
import { PrismaClient, RoleName } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    "task.create",
    "task.view",
    "task.accept",
    "task.complete",
    "user.verify",
    "ticket.view",
    "ticket.reply",
  ];

  for (const name of permissions) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const roles: { name: RoleName; perms: string[] }[] = [
    { name: "USER", perms: ["task.create", "task.view"] },
    { name: "TASKER", perms: ["task.accept", "task.complete"] },
    { name: "SUPPORT", perms: ["ticket.view", "ticket.reply"] },
    { name: "ADMIN", perms: permissions },
  ];

  for (const role of roles) {
    const r = await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: { name: role.name },
    });

    for (const perm of role.perms) {
      const permissionMap = new Map(
        (await prisma.permission.findMany()).map(p => [p.name, p])
      );
      
      const p = permissionMap.get(perm);
      if (!p) continue;
      

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: r.id,
            permissionId: p.id,
          },
        },
        update: {},
        create: {
          roleId: r.id,
          permissionId: p.id,
        },
      });
    }
  }
}

main()
  .then(() => console.log("✅ Seed completed"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
