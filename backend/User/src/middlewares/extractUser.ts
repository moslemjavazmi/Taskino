// // APIGateway/User/src/middlewares/extractUser.ts

// import { Request, Response, NextFunction } from 'express';

// export function extractUser(req: Request, res: Response, next: NextFunction) {
//   const userId = req.headers['x-user-id'] as string | undefined;
//   if (!userId) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   // اضافه کردن user به req برای دسترسی راحت در کنترلرها
//   (req as any).user = { id: userId };
//   next();
// }

// backend/User/src/middlewares/extractUser.ts
import { Request, Response, NextFunction } from 'express';

export function extractUser(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers['x-user-id'] as string | undefined;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // خواندن نقش‌ها از هدر ارسالی Gateway (به صورت JSON string)
  let roles: string[] = [];
  try {
    const rolesHeader = req.headers['x-user-roles'] as string | undefined;
    if (rolesHeader) {
      roles = JSON.parse(rolesHeader);
    }
  } catch (err) {
    console.error('Failed to parse x-user-roles header', err);
  }

  // اضافه کردن کاربر به req برای استفاده در کنترلرها و میدلورها
  (req as any).user = {
    id: userId,
    roles: roles,
    permissions: [], // در صورت نیاز می‌توانید از هدر مشابه `x-user-permissions` استفاده کنید
  };
  next();
}