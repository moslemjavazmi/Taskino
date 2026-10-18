//components/AuthInitializer.tsx
"use client";

import { useEffect } from "react";
import  useAuthStore  from "../src/store/useAuthStore";

export default function AuthInitializer() {
  const { fetchUser,isLoading } = useAuthStore();

  useEffect(() => {
    // فقط یک‌بار در بارگذاری اولیه
    fetchUser();
  }, [fetchUser]);

  // اگر هنوز وضعیت کاربر مشخص نشده است، چیزی رندر نکن
  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return null; // فقط برای initialize استفاده می‌شود
}
