// user-app: frontend/app/user-app/src/app/dashboard/page.tsx
"use client";

import { withAuth } from "@packages/auth-store/src/withAuth";
import { UserRole } from "@packages/auth-store";

function UserDashboard() {
  return <div>داشبورد کاربر</div>;
}

export default withAuth(UserDashboard, {
  roles: [UserRole.USER, UserRole.TASKER], // هر دو نقش مجاز
  redirectTo: "/", // صفحه لاگین در ریشه
});