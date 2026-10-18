// //app/dashboard/layout.tsx
// "use client";
// import { useEffect } from "react";
// import { useAuthStore } from "@/store/useAuthStore";
// import Sidebar from "@/components/dashboard/Sidebar";
// import DashNavbar from "@/components/dashboard/DashNavbar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, loading, fetchUser, hasRole } = useAuthStore();

//   useEffect(() => {
//     fetchUser();
//   }, [fetchUser]);

//   if (loading) return <p>در حال بارگذاری...</p>;
//   if (!user) return <p className="text-red-500 text-center">🚫 Please Login Again</p>;
//   if (!hasRole("admin") && !hasRole("writer")) {
//     return <p>⛔ دسترسی ندارید.</p>;
//   }

//   return (
//     <div className="flex h-screen w-full overflow-hidden">
//       {/* سایدبار با گرادیان زیبا */}
//       <Sidebar />

//       {/* داشبورد اصلی با گرادیان ملایم */}
//       <main
//         className="flex-1 overflow-y-auto p-6
//         bg-gradient-to-tr from-blue-50 via-white to-blue-100
//         dark:from-gray-900 dark:via-gray-800 dark:to-gray-700
//         shadow-inner transition-all duration-500"
//       >
//         <DashNavbar />
//         {children}
//       </main>
//     </div>
//   );
// }

//app/dashboard/layout.tsx
"use client";
import { useEffect } from "react";
import useAuthStore  from "../../store/useAuthStore";
// 

// interface DashboardLayoutProps {
//   children: React.ReactNode;
//   allowedRoles?: string[];
// }

// export default function DashboardLayout({
//   children,
//   allowedRoles = ["admin", "writer"],
// }: DashboardLayoutProps) {
//   const { user, loading, fetchUser, hasRole } = useAuthStore();

//   useEffect(() => {
//     fetchUser();
//   }, [fetchUser]);

//   if (loading) return <p>در حال بارگذاری...</p>;
//   if (!user)
//     return <p className="text-red-500 text-center">🚫 Please Login Again</p>;

//   const isAllowed = allowedRoles.some((role) => hasRole(role));
//   if (!isAllowed) {
//     return (
//       <p className="text-center text-red-600 mt-20 text-xl">
//         ⛔ دسترسی ندارید.
//       </p>
//     );
//   }

//   return (
//     <div className="flex h-screen w-full overflow-hidden">
//       <Sidebar />
//       <main
//         className="flex-1 overflow-y-auto p-6
//         bg-gradient-to-tr from-blue-50 via-white to-blue-100
//          shadow-inner transition-all duration-500"
//       >
//         <DashNavbar />
//         {children}
//       </main>
//     </div>
//   );
// }
interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles?: ("user" | "Admin" | "writer")[];
}

export default function DashboardLayout({
  children,
  allowedRoles = ["Admin", "writer"],
}: DashboardLayoutProps) {
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // if (!user)
  //   return <p className="text-red-500 text-center">🚫 Please Login Again</p>;

  // const isAllowed = allowedRoles.some((role) => hasRole(role));
  // if (!isAllowed) {
  //   return (
  //     <p className="text-center text-red-600 mt-20 text-xl">
  //       ⛔ دسترسی ندارید.
  //     </p>
  //   );
  // }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <main
        className="flex-1 overflow-y-auto p-6
        bg-gradient-to-tr from-blue-50 via-white to-blue-100
         shadow-inner transition-all duration-500"
      >
        {children}
      </main>
    </div>
  );
}
