// // // shared/packages/auth-store/src/middleware.ts
// // 'use client';

// // import { useEffect } from 'react';
// // import { useRouter, usePathname } from 'next/navigation';
// // import { useAuthStore, UserRole, Permission } from './index';

// // // تعریف مسیرهای عمومی (نیاز به احراز هویت ندارند)
// // const publicRoutes = ['/login', '/verify', '/register', '/forgot-password','/'];

// // // تعریف نقش‌های مجاز برای هر مسیر
// // interface RouteGuard {
// //   path: string | RegExp;
// //   roles?: UserRole[];
// //   permissions?: Permission[];
// //   redirectTo?: string;
// // }

// // const routeGuards: RouteGuard[] = [
// //   // مسیرهای ادمین
// //   { path: '/admin', roles: [UserRole.ADMIN], redirectTo: '/dashboard' },
// //   { path: '/admin/dashboard', roles: [UserRole.ADMIN] },
// //   { path: '/admin/taskers', roles: [UserRole.ADMIN] },
// //   { path: '/admin/users', roles: [UserRole.ADMIN] },
// //   { path: '/admin/reports', roles: [UserRole.ADMIN, UserRole.SUPPORTER] },
// //   { path: '/admin/logs', roles: [UserRole.ADMIN] },
  
// //   // مسیرهای پشتیبان
// //   { path: '/support', roles: [UserRole.SUPPORTER, UserRole.ADMIN], redirectTo: '/dashboard' },
// //   { path: '/support/tickets', roles: [UserRole.SUPPORTER, UserRole.ADMIN] },
  
// //   // مسیرهای کاربر عادی
// //   { path: '/dashboard', roles: [UserRole.USER, UserRole.TASKER, UserRole.ADMIN, UserRole.SUPPORTER] },
// //   { path: '/tasks', roles: [UserRole.USER, UserRole.TASKER] },
// //   { path: '/profile', roles: [UserRole.USER, UserRole.TASKER, UserRole.ADMIN, UserRole.SUPPORTER] },
// // ];

// // // هوک برای محافظت از مسیرها
// // export const useRouteGuard = () => {
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const { isAuthenticated, isLoading, hasRole, hasPermission, user } = useAuthStore();
  
// //   useEffect(() => {
// //     if (isLoading) return;
    
// //     const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));
    
// //     // اگر مسیر عمومی است و کاربر احراز هویت شده، به داشبورد هدایت شود
// //     if (isPublicRoute && isAuthenticated()) {
// //       if (user?.roles?.includes(UserRole.ADMIN)) {
// //         router.replace('/admin/dashboard');
// //       } else {
// //         router.replace('/dashboard');
// //       }
// //       return;
// //     }
    
// //     // اگر مسیر خصوصی است و کاربر احراز هویت نشده
// //     if (!isPublicRoute && !isAuthenticated()) {
// //       router.replace(`/login?redirect=${encodeURIComponent(pathname || '')}`);
// //       return;
// //     }
    
// //     // بررسی نقش و دسترسی‌ها
// //     if (isAuthenticated() && !isPublicRoute) {
// //       let hasAccess = false;
      
// //       for (const guard of routeGuards) {
// //         let matches = false;
// //         if (typeof guard.path === 'string') {
// //           matches = pathname?.startsWith(guard.path);
// //         } else if (guard.path instanceof RegExp) {
// //           matches = guard.path.test(pathname || '');
// //         }
        
// //         if (matches) {
// //           // بررسی نقش
// //           if (guard.roles && guard.roles.length > 0) {
// //             hasAccess = hasRole(guard.roles);
// //           }
// //           // بررسی مجوزها
// //           if (!hasAccess && guard.permissions && guard.permissions.length > 0) {
// //             hasAccess = hasPermission(guard.permissions);
// //           }
// //           // اگر دسترسی نداشت، به مسیر جایگزین هدایت شود
// //           if (!hasAccess && guard.redirectTo) {
// //             router.replace(guard.redirectTo);
// //             return;
// //           } else if (!hasAccess) {
// //             router.replace('/unauthorized');
// //             return;
// //           }
// //           break;
// //         }
// //       }
// //     }
// //   }, [pathname, isAuthenticated, isLoading, router, hasRole, hasPermission, user]);
  
// //   return { isLoading, isAuthenticated: isAuthenticated() };
// // };


// // shared/packages/auth-store/src/middleware.ts
// 'use client';

// import { useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { useAuthStore, UserRole } from './index';

// const publicRoutes = ['/', '/login', '/verify', '/register', '/forgot-password'];

// export const useRouteGuard = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { isAuthenticated, isLoading, user, hasRole } = useAuthStore();

//   useEffect(() => {
//     if (isLoading) return;

//     const isPublic = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

//     if (!isAuthenticated() && !isPublic) {
//       router.replace(`/?redirect=${encodeURIComponent(pathname)}`);
//       return;
//     }

//     if (isAuthenticated() && isPublic) {
//       // کاربر وارد شده و در صفحه لاگین/ثبت‌نام است → هدایت به پنل مناسب
//       if (hasRole(UserRole.ADMIN)) router.replace('/admin/dashboard');
//       else if (hasRole(UserRole.SUPPORTER)) router.replace('/support/dashboard');
//       else if (hasRole(UserRole.TASKER)) router.replace('/tasker/dashboard');
//       else router.replace('/dashboard');
//       return;
//     }

//     // (اختیاری) محدودیت دسترسی بر اساس مسیر
//     if (pathname.startsWith('/admin') && !hasRole(UserRole.ADMIN)) {
//       router.replace('/unauthorized');
//     }
//     if (pathname.startsWith('/support') && !hasRole([UserRole.ADMIN, UserRole.SUPPORTER])) {
//       router.replace('/unauthorized');
//     }
//   }, [pathname, isAuthenticated, isLoading, router, hasRole, user]);
// };