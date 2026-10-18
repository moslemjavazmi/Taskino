// // // shared/packages/ui-kit/src/admin/layouts/AdminLayout.tsx
// // "use client";

// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import Sidebar from "../layouts/sidebar/Sidebar";
// // import { FaBars, FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

// // interface AdminLayoutProps {
// //   children: React.ReactNode;
// // }

// // export default function AdminLayout({ children }: AdminLayoutProps) {
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [notifications, setNotifications] = useState([
// //     { id: 1, title: "تسکر جدید", message: "کاربر محمد یک تسکر جدید ثبت کرد", time: "2 دقیقه پیش", read: false },
// //     { id: 2, title: "تأیید ایجنت", message: "درخواست جدید برای ایجنت شدن", time: "15 دقیقه پیش", read: false },
// //     { id: 3, title: "پرداخت", message: "پرداخت جدید به مبلغ ۲,۵۰۰,۰۰۰ تومان", time: "1 ساعت پیش", read: true },
// //   ]);
// //   const [showNotifications, setShowNotifications] = useState(false);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
// //       {/* سایدبار */}
// //       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

// //       {/* محتوای اصلی */}
// //       <div className={`transition-all duration-300 ${sidebarOpen ? "lg:mr-72" : "lg:mr-20"}`}>
// //         {/* هدر */}
// //         <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
// //           <div className="flex items-center justify-between px-6 py-4">
// //             <div className="flex items-center gap-4">
// //               <button
// //                 onClick={() => setSidebarOpen(!sidebarOpen)}
// //                 className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
// //               >
// //                 <FaBars className="text-gray-600 text-xl" />
// //               </button>

// //               {/* نوار جستجو */}
// //               <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
// //                 <FaSearch className="text-gray-400 ml-2" />
// //                 <input
// //                   type="text"
// //                   placeholder="جستجو در داشبورد..."
// //                   className="bg-transparent outline-none text-gray-700 w-64"
// //                   dir="rtl"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-4">
// //               {/* اعلان‌ها */}
// //               <div className="relative">
// //                 <button
// //                   onClick={() => setShowNotifications(!showNotifications)}
// //                   className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
// //                 >
// //                   <FaBell className="text-gray-600 text-xl" />
// //                   {notifications.filter(n => !n.read).length > 0 && (
// //                     <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></span>
// //                   )}
// //                 </button>

// //                 <AnimatePresence>
// //                   {showNotifications && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: -10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       exit={{ opacity: 0, y: -10 }}
// //                       className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
// //                     >
// //                       <div className="p-4 border-b border-gray-200">
// //                         <h3 className="font-bold text-gray-800">اعلان‌ها</h3>
// //                       </div>
// //                       <div className="max-h-96 overflow-y-auto">
// //                         {notifications.map(notif => (
// //                           <div key={notif.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50' : ''}`}>
// //                             <p className="font-semibold text-gray-800 text-sm">{notif.title}</p>
// //                             <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
// //                             <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
// //                           </div>
// //                         ))}
// //                       </div>
// //                       <div className="p-3 text-center">
// //                         <button className="text-green-600 text-sm hover:text-green-700">
// //                           مشاهده همه اعلان‌ها
// //                         </button>
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </div>

// //               {/* پروفایل */}
// //               <div className="flex items-center gap-3">
// //                 <div className="text-right">
// //                   <p className="text-sm font-semibold text-gray-800">علی رضایی</p>
// //                   <p className="text-xs text-gray-500">مدیر ارشد</p>
// //                 </div>
// //                 <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
// //                   <FaUserCircle className="text-white text-2xl" />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         {/* محتوای صفحه */}
// //         <main className="p-6">
// //           <AnimatePresence mode="wait">
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               {children}
// //             </motion.div>
// //           </AnimatePresence>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Sidebar from "../layouts/sidebar/Sidebar";

// import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

// interface AdminLayoutProps {
//   children: React.ReactNode;
// }

// export default function AdminLayout({ children }: AdminLayoutProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [notifications, setNotifications] = useState([
//     { id: 1, title: "تسک جدید", message: "کاربر علی یک تسک جدید ثبت کرد", time: "۲ دقیقه پیش", read: false },
//     { id: 2, title: "تأیید تسکر", message: "درخواست جدید برای تسکر شدن", time: "۱۵ دقیقه پیش", read: false },
//     { id: 3, title: "پرداخت", message: "پرداخت جدید به مبلغ ۲,۵۰۰,۰۰۰ تومان", time: "۱ ساعت پیش", read: true },
//   ]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
//       {/* سایدبار */}
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

//       {/* محتوای اصلی - با فاصله از سایدبار */}
//       <div
//         className={`flex-1 transition-all duration-300 ${
//           sidebarOpen ? "mr-56" : "mr-14"
//         }`}
//       >
//         {/* هدر ثابت با پشتیبانی از RTL */}
//         <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
//           <div className="flex items-center justify-between px-6 py-4">
//             <div className="flex items-center gap-4">
//               {/* نوار جستجو */}
//               <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
//                 <FaSearch className="text-gray-400 ml-2" />
//                 <input
//                   type="text"
//                   placeholder="جستجو در داشبورد..."
//                   className="bg-transparent outline-none text-gray-700 w-64 text-sm"
//                   dir="rtl"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center gap-5">
//               {/* اعلان‌ها با انیمیشن */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowNotifications(!showNotifications)}
//                   className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <FaBell className="text-gray-600 text-xl" />
//                   {notifications.filter((n) => !n.read).length > 0 && (
//                     <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
//                   )}
//                 </button>

//                 <AnimatePresence>
//                   {showNotifications && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
//                     >
//                       <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-b">
//                         <h3 className="font-bold text-gray-800">اعلان‌ها</h3>
//                       </div>
//                       <div className="max-h-96 overflow-y-auto">
//                         {notifications.map((notif) => (
//                           <div
//                             key={notif.id}
//                             className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
//                               !notif.read ? "bg-blue-50/30" : ""
//                             }`}
//                           >
//                             <p className="font-semibold text-gray-800 text-sm">
//                               {notif.title}
//                             </p>
//                             <p className="text-gray-600 text-xs mt-1">
//                               {notif.message}
//                             </p>
//                             <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="p-3 text-center bg-gray-50">
//                         <button className="text-green-600 text-sm font-medium hover:text-green-700">
//                           مشاهده همه اعلان‌ها
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* پروفایل کاربر */}
//               <div className="flex items-center gap-3 bg-white/50 rounded-full pl-2 pr-3 py-1 shadow-sm">
//                 <div className="text-right">
//                   <p className="text-sm font-semibold text-gray-800">علی رضایی</p>
//                   <p className="text-xs text-gray-500">مدیر ارشد</p>
//                 </div>
//                 <div className="w-9 h-9 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
//                   <FaUserCircle className="text-white text-2xl" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* محتوای صفحات با انیمیشن ورود */}
//         <main className="p-6 md:p-8">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={Math.random()} // برای صفحات مختلف
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.25 }}
//             >
//               {children}
//             </motion.div>
//           </AnimatePresence>
//         </main>
//       </div>
//     </div>
//   );
// }

// // components/admin/AdminLayout.tsx
// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Sidebar from "../layouts/sidebar/Sidebar";
// import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

// interface AdminLayoutProps {
//   children: React.ReactNode;
// }

// export default function AdminLayout({ children }: AdminLayoutProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [notifications] = useState([
//     { id: 1, title: "New Task", message: "User John created a new task", time: "2 min ago", read: false },
//     { id: 2, title: "Tasker Approval", message: "New request to become a tasker", time: "15 min ago", read: false },
//     { id: 3, title: "Payment", message: "Payment of $2,500 received", time: "1 hour ago", read: true },
//   ]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#c7d2d8] via-white to-[#c7d2d8] flex">
//       {/* Sidebar is fixed, main content gets margin-left that changes with sidebarOpen */}
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

//       {/* Main content area - margin adjusts to sidebar width */}
//       <div 
//         className={`transition-all duration-300  ${
//           sidebarOpen ? "md:mr-64" : " md:mr-16 "
//         }`}
//       >
//         {/* Sticky Header */}
//         <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between px-6 py-4">
//             {/* Search Bar */}
//             <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
//               <FaSearch className="text-gray-400 ml-2" />
//               <input
//                 type="text"
//                 placeholder="Search dashboard..."
//                 className="bg-transparent outline-none text-gray-700 w-64 text-sm"
//               />
//             </div>

//             <div className="flex items-center gap-5">
//               {/* Notifications */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowNotifications(!showNotifications)}
//                   className="relative p-2 rounded-full hover:bg-gray-100 transition"
//                 >
//                   <FaBell className="text-gray-600 text-xl" />
//                   {notifications.filter((n) => !n.read).length > 0 && (
//                     <span className="absolute top-0 left-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
//                   )}
//                 </button>

//                 <AnimatePresence>
//                   {showNotifications && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
//                     >
//                       <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-b">
//                         <h3 className="font-bold text-gray-800">Notifications</h3>
//                       </div>
//                       <div className="max-h-96 overflow-y-auto">
//                         {notifications.map((notif) => (
//                           <div
//                             key={notif.id}
//                             className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
//                               !notif.read ? "bg-blue-50/30" : ""
//                             }`}
//                           >
//                             <p className="font-semibold text-gray-800 text-sm">
//                               {notif.title}
//                             </p>
//                             <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
//                             <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="p-3 text-center bg-gray-50">
//                         <button className="text-green-600 text-sm font-medium">
//                           View all
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* User Profile */}
//               <div className="flex items-center gap-3 bg-white/50 rounded-full pl-2 pr-3 py-1 shadow-sm">
//                 <div className="text-left">
//                   <p className="text-sm font-semibold text-gray-800">Alex Johnson</p>
//                   <p className="text-xs text-gray-500">Admin</p>
//                 </div>
//                 <div className="w-9 h-9 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
//                   <FaUserCircle className="text-white text-2xl" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Animated page content */}
//         <main className="p-6 md:p-8">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={Math.random()}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.25 }}
//             >
//               {children}
//             </motion.div>
//           </AnimatePresence>
//         </main>
//       </div>
//     </div>
//   );
// }
// components/admin/AdminLayout.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../layouts/sidebar/Sidebar";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState([
    { id: 1, title: "New Task", message: "User John created a new task", time: "2 min ago", read: false },
    { id: 2, title: "Tasker Approval", message: "New request to become a tasker", time: "15 min ago", read: false },
    { id: 3, title: "Payment", message: "Payment of $2,500 received", time: "1 hour ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex p-1 h-screen w-full overflow-hidden bg-gradient-to-b from-[#c7d2d8] via-white to-[#c7d2d8]" >
      {/* Sidebar is fixed on the left */}
       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />


      {/* Main content – margin LEFT adjusts to sidebar width */}
     <div className={` overflow-y-auto ${
          sidebarOpen ? "flex-1 ml-32 w-full" : "flex-1 ml-8 w-full"
        } `}>
      <div
        className={` transition-all duration-300  justify-center m-auto ${
          sidebarOpen ? " md:ml-2 " : "md:ml-2"
        }`}
      >
        {/* Sticky Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search dashboard..."
                className="bg-transparent outline-none text-gray-700 w-64 text-sm"
              />
            </div>

            <div className="flex items-center gap-5">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <FaBell className="text-gray-600 text-xl" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                    >
                      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-b">
                        <h3 className="font-bold text-gray-800">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
                              !notif.read ? "bg-blue-50/30" : ""
                            }`}
                          >
                            <p className="font-semibold text-gray-800 text-sm">
                              {notif.title}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
                            <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center bg-gray-50">
                        <button className="text-green-600 text-sm font-medium">
                          View all
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 bg-white/50 rounded-full pl-2 pr-3 py-1 shadow-sm">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">Alex Johnson</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
                  <FaUserCircle className="text-white text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Animated page content */}
        <main className="p-4 sm:p-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={Math.random()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className=""
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      </div>
    </div>
  );
}