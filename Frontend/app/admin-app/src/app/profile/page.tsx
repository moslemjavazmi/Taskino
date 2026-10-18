// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@packages/auth-store/src/useAuth";
// import { apiClient } from "@packages/api-client";
// import { motion } from "framer-motion";
// import {
//   FiUser,
//   FiPhone,
//   FiShield,
//   FiCalendar,
//   FiEdit3,
//   FiHome,
//   FiDollarSign,
//   FiMapPin,
//   FiCheckCircle,
//   FiXCircle,
// } from "react-icons/fi";
// import Image from "next/image";
// import Link from "next/link";

// interface UserProfile {
//   id: string;
//   name: string;
//   mobile: string;
//   verified: boolean;
//   roles: string[];
//   avatarUrl?: string;
//   bio?: string;
//   locationLat?: number;
//   locationLng?: number;
//   createdAt: string;
//   taskerProfile?: {
//     isActive: boolean;
//     hourlyRate: number | null;
//     serviceAreas: string[];
//   };
// }

// export default function ProfilePage() {
//   const { user, token } = useAuth();
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // دریافت پروفایل از سرویس User از طریق Gateway
//         const res = await apiClient.get("/api/user/profile/me");
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
//         <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-indigo-500 rounded-full"></div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="text-center text-gray-600 mt-20">
//         <p>پروفایل یافت نشد. لطفاً وارد شوید.</p>
//         <Link
//           href="/"
//           className="text-indigo-600 hover:underline mt-3 inline-block"
//         >
//           بازگشت به خانه
//         </Link>
//       </div>
//     );
//   }

//   const isTasker = profile.roles.includes("TASKER");
//   const taskerProfile = profile.taskerProfile;

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-6">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/60 dark:border-gray-700/60">
//         {/* هدر گرادینت */}
//         <div className="relative h-44 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="absolute left-1/2 -bottom-16 transform -translate-x-1/2"
//           >
//             <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-xl overflow-hidden">
//               {profile.avatarUrl ? (
//                 <Image
//                   src={profile.avatarUrl}
//                   alt="User Avatar"
//                   fill
//                   className="object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-5xl text-gray-400">
//                   <FiUser />
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </div>

//         {/* محتوای اصلی */}
//         <div className="pt-24 pb-10 text-center px-6">
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//             {profile.name || "بدون نام"}
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
//             {isTasker ? "تسکر" : "کاربر عادی"}
//           </p>

//           {/* جزئیات عمومی */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left max-w-md mx-auto"
//           >
//             <ProfileItem icon={<FiPhone />} label="شماره موبایل" value={profile.mobile} />
//             <ProfileItem
//               icon={<FiShield />}
//               label="وضعیت حساب"
//               value={profile.verified ? "تأیید شده ✅" : "تأیید نشده ⚠️"}
//             />
//             <ProfileItem
//               icon={<FiCalendar />}
//               label="تاریخ عضویت"
//               value={new Date(profile.createdAt).toLocaleDateString("fa-IR")}
//             />
//             {profile.bio && <ProfileItem icon={<FiUser />} label="بیوگرافی" value={profile.bio} />}
//           </motion.div>

//           {/* اطلاعات تسکر (فقط برای نقش TASKER) */}
//           {isTasker && taskerProfile && (
//             <>
//               <div className="border-t border-gray-200 dark:border-gray-700 my-6" />
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-right">
//                 اطلاعات حرفه‌ای
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-left max-w-md mx-auto">
//                 <ProfileItem
//                   icon={<FiDollarSign />}
//                   label="نرخ ساعتی (تومان)"
//                   value={taskerProfile.hourlyRate ? `${taskerProfile.hourlyRate.toLocaleString()} تومان` : "تعیین نشده"}
//                 />
//                 <ProfileItem
//                   icon={<FiHome />}
//                   label="مناطق تحت پوشش"
//                   value={taskerProfile.serviceAreas?.join(", ") || "—"}
//                 />
//                 <ProfileItem
//                   icon={taskerProfile.isActive ? <FiCheckCircle className="text-green-500" /> : <FiXCircle className="text-red-500" />}
//                   label="وضعیت فعالیت"
//                   value={taskerProfile.isActive ? "فعال" : "غیرفعال"}
//                 />
//               </div>
//             </>
//           )}

//           {/* دکمه ویرایش */}
//           <div className="flex flex-wrap justify-center gap-3 mt-10">
//             <Link
//               href="/profile/edit"
//               className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full transition"
//             >
//               <FiEdit3 /> ویرایش پروفایل
//             </Link>
//             <Link
//               href="/dashboard"
//               className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full transition"
//             >
//               بازگشت به داشبورد
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// // کامپوننت کمکی برای نمایش آیتم‌های پروفایل
// const ProfileItem = ({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) => (
//   <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/40 p-3 rounded-xl border border-gray-100 dark:border-gray-600">
//     <div className="text-indigo-500 text-lg">{icon}</div>
//     <div>
//       <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
//       <p className="font-medium text-gray-800 dark:text-gray-100">{value}</p>
//     </div>
//   </div>
// );

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@packages/auth-store/src/useAuth';
import { apiClient } from '@packages/api-client';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaEdit, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get('/api/user/profile/me');
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center mt-20">خطا در بارگذاری پروفایل</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-400 p-3 rounded-full">
              <FaUser className="text-2xl text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">پروفایل من</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <FaUser className="text-green-600 text-xl" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">نام و نام خانوادگی</p>
                <p className="font-medium">{profile.name || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-green-600 text-xl" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">شماره موبایل</p>
                <p className="font-medium">{user?.mobile || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">آدرس</p>
                <p className="font-medium">{profile.bio || 'ثبت نشده'}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Link
              href="/profile/edit"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
            >
              <FaEdit /> ویرایش پروفایل
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FaArrowLeft /> بازگشت به داشبورد
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}