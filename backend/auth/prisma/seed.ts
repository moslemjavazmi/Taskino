// //auth/prisma/seed.ts
// import { PrismaClient, RoleName } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   const permissions = [
//     "task.create",
//     "task.view",
//     "task.accept",
//     "task.complete",
//     "user.verify",
//     "ticket.view",
//     "ticket.reply",
//   ];

//   for (const name of permissions) {
//     await prisma.permission.upsert({
//       where: { name },
//       update: {},
//       create: { name },
//     });
//   }

//   const roles: { name: RoleName; perms: string[] }[] = [
//     { name: "USER", perms: ["task.create", "task.view"] },
//     { name: "TASKER", perms: ["task.accept", "task.complete"] },
//     { name: "SUPPORT", perms: ["ticket.view", "ticket.reply"] },
//     { name: "ADMIN", perms: permissions },
//   ];

//   for (const role of roles) {
//     const r = await prisma.role.upsert({
//       where: { name: role.name },
//       update: {},
//       create: { name: role.name },
//     });

//     for (const perm of role.perms) {
//       const permissionMap = new Map(
//         (await prisma.permission.findMany()).map(p => [p.name, p])
//       );
      
//       const p = permissionMap.get(perm);
//       if (!p) continue;
      

//       await prisma.rolePermission.upsert({
//         where: {
//           roleId_permissionId: {
//             roleId: r.id,
//             permissionId: p.id,
//           },
//         },
//         update: {},
//         create: {
//           roleId: r.id,
//           permissionId: p.id,
//         },
//       });
//     }
//   }
// }

// main()
//   .then(() => console.log("✅ Seed completed"))
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());


// prisma/seed.ts
import { PrismaClient, RoleName } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. ایجاد نقش‌ها (Roles)
  const rolesData = [
    { name: RoleName.ADMIN },
    { name: RoleName.USER },
    { name: RoleName.TASKER },
    { name: RoleName.SUPPORT },
  ];

  for (const role of rolesData) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
  console.log('✅ Roles seeded');

  // 2. ایجاد مجوزها (Permissions)
  const permissionsData = [
    { name: 'task.create' },   // ایجاد تسک جدید
    { name: 'task.view' },     // مشاهده تسک‌ها
    { name: 'task.accept' },   // پذیرش تسک (برای ایجنت)
    { name: 'task.complete' }, // تکمیل تسک
    { name: 'user.verify' },   // تأیید کاربران (برای پشتیبان/ادمین)
    { name: 'user.delete' },   // حذف کاربر
    { name: 'role.assign' },   // اختصاص نقش به کاربران
    { name: 'permission.manage' }, // مدیریت مجوزها
    { name: 'logs.view' },     // مشاهده لاگ‌ها
    { name: 'reports.view' },  // مشاهده گزارشات
  ];

  for (const perm of permissionsData) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm,
    });
  }
  console.log('✅ Permissions seeded');

  // 3. دریافت شناسه‌های نقش‌ها و مجوزها برای ارتباط
  const adminRole = await prisma.role.findUnique({ where: { name: RoleName.ADMIN } });
  const userRole = await prisma.role.findUnique({ where: { name: RoleName.USER } });
  const taskerRole = await prisma.role.findUnique({ where: { name: RoleName.TASKER } });
  const supportRole = await prisma.role.findUnique({ where: { name: RoleName.SUPPORT } });

  const allPermissions = await prisma.permission.findMany();
  const permissionMap = new Map(allPermissions.map(p => [p.name, p]));

  // 4. تعریف دسترسی‌های هر نقش (RolePermission)
  const rolePermissions = [
    // ADMIN: همه دسترسی‌ها
    { roleId: adminRole!.id, permissionId: permissionMap.get('task.create')!.id },
    { roleId: adminRole!.id, permissionId: permissionMap.get('task.view')!.id },
    { roleId: adminRole!.id, permissionId: permissionMap.get('task.accept')!.id },
    { roleId: adminRole!.id, permissionId: permissionMap.get('task.complete')!.id },
    { roleId: adminRole!.id, permissionId: permissionMap.get('user.verify')!.id },
    { roleId: adminRole!.id, permissionId: permissionMap.get('user.delete')!.id },
    { roleId: adminRole!.id, permissionId: permissionMap.get('role.assign')!.id },
    { roleId: adminRole!.id, permissionId: permissionMap.get('permission.manage')!.id },
    { roleId: adminRole!.id, permissionId: permissionMap.get('logs.view')!.id },
    { roleId: adminRole!.id, permissionId: permissionMap.get('reports.view')!.id },

    // SUPPORT: مشاهده تسک، تأیید کاربر، مشاهده لاگ و گزارش
    { roleId: supportRole!.id, permissionId: permissionMap.get('task.view')!.id },
    { roleId: supportRole!.id, permissionId: permissionMap.get('user.verify')!.id },
    { roleId: supportRole!.id, permissionId: permissionMap.get('logs.view')!.id },
    { roleId: supportRole!.id, permissionId: permissionMap.get('reports.view')!.id },

    // TASKER: مشاهده، پذیرش و تکمیل تسک
    { roleId: taskerRole!.id, permissionId: permissionMap.get('task.view')!.id },
    { roleId: taskerRole!.id, permissionId: permissionMap.get('task.accept')!.id },
    { roleId: taskerRole!.id, permissionId: permissionMap.get('task.complete')!.id },

    // USER: فقط مشاهده و ایجاد تسک
    { roleId: userRole!.id, permissionId: permissionMap.get('task.view')!.id },
    { roleId: userRole!.id, permissionId: permissionMap.get('task.create')!.id },
  ];

  // حذف ارتباطات قبلی (اختیاری - اگر می‌خواهید دوباره از نو بسازید)
  await prisma.rolePermission.deleteMany({});
  for (const rp of rolePermissions) {
    await prisma.rolePermission.create({
      data: rp,
    });
  }
  console.log('✅ RolePermissions seeded');

  // 5. ایجاد کاربر ادمین پیش‌فرض (اگر وجود نداشته باشد)
  const adminMobile = '09142355249';
  let adminUser = await prisma.user.findUnique({ where: { mobile: adminMobile } });
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        mobile: adminMobile,
        verified: true, // ادمین نیازی به تأیید ندارد
        // سایر فیلدها پیش‌فرض می‌گیرند
      },
    });
    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin user already exists');
  }

  // اتصال نقش ADMIN به کاربر ادمین (اگر هنوز متصل نشده)
  const existingAdminRole = await prisma.userRole.findFirst({
    where: { userId: adminUser.id, roleId: adminRole!.id },
  });
  if (!existingAdminRole) {
    await prisma.userRole.create({
      data: { userId: adminUser.id, roleId: adminRole!.id },
    });
    console.log('✅ Admin role assigned to user');
  }

  // (اختیاری) ایجاد یک کاربر معمولی و یک ایجنت نمونه برای تست سریع
  const testUserMobile = '09991234567';
  let testUser = await prisma.user.findUnique({ where: { mobile: testUserMobile } });
  if (!testUser) {
    testUser = await prisma.user.create({
      data: {
        mobile: testUserMobile,
        verified: true,
      },
    });
    await prisma.userRole.create({
      data: { userId: testUser.id, roleId: userRole!.id },
    });
    console.log('✅ Test USER created with role USER');
  }

  const testTaskerMobile = '09999876543';
  let testTasker = await prisma.user.findUnique({ where: { mobile: testTaskerMobile } });
  if (!testTasker) {
    testTasker = await prisma.user.create({
      data: {
        mobile: testTaskerMobile,
        verified: true,
      },
    });
    await prisma.userRole.create({
      data: { userId: testTasker.id, roleId: taskerRole!.id },
    });
    console.log('✅ Test TASKER created');
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });