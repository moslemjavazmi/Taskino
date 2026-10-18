// // // frontend/app/admin-app/src/app/dashboard/page.tsx

// "use client";

// import Sidebar from '@packages/ui-kit/src/admin/layouts/sidebar/Sidebar';
// import dynamic from 'next/dynamic';
// import { useState } from 'react';
// // import Sidebar from '../../../components/ui/Sidebar';

// const Dashboard = dynamic(
//   () => import("@packages/ui-kit/src/admin/pages/Dashboard"),
//   { ssr: false }
// );

// export default function DashboardPage() {
//   const [isOpen,setIsOpen]=useState<boolean>(true)
//   const handleOpenSidebar = () => {
//    setIsOpen(!isOpen )
//   }
//   return (
//     <>
//       <div className="flex w-full">
//         {/* <Sidebar/> */}
//         <Sidebar isOpen={ isOpen} setIsOpen={()=>handleOpenSidebar()} />
//       <Dashboard />
//       </div>
//       </>
//       );
// }

// frontend/app/admin-app/src/app/dashboard/page.tsx
"use client";
import { useEffect } from "react";
// import { withAuth } from "@packages/auth-store/src/withAuth";
// import { UserRole } from "@packages/auth-store";
import useAuthStore  from "../../store/useAuthStore";
import Dashboard from "@packages/ui-kit/src/admin/pages/Dashboard"
// const Dashboard = dynamic(
//   () => import("@packages/ui-kit/src/admin/pages/Dashboard"),
//   { ssr: false }
// );

export default function DashboardPage() {
  const {fetchUser}=useAuthStore()
    useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return <Dashboard />;
}

// export default withAuth(DashboardPage, {
//   roles: [UserRole.ADMIN],
//   redirectTo: "/",
// });