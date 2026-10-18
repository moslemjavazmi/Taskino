// // // // frontend/app/admin-app/src/app/setup-profile/page.tsx
// // // 'use client';

// // // import { useState } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { useAuth } from '@packages/auth-store/src/useAuth';
// // // import { userApiClient } from '@packages/api-client';

// // // export default function SetupProfilePage() {
// // //   const { user, token } = useAuth();
// // //   const router = useRouter();
// // //   const [name, setName] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!name.trim()) {
// // //       setError('نام الزامی است');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       await userApiClient.put('/api/user/profile/me', { name });
// // //       // پس از ذخیره، به داشبورد هدایت شود
// // //       if (user?.roles.includes('ADMIN')) router.push('/admin/dashboard');
// // //       else router.push('/dashboard');
// // //     } catch (err) {
// // //       setError('خطا در ذخیره اطلاعات');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// // //       <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
// // //         <h1 className="text-2xl font-bold text-center mb-6">تکمیل اطلاعات</h1>
// // //         <form onSubmit={handleSubmit}>
// // //           <label className="block text-gray-700 mb-2">نام و نام خانوادگی</label>
// // //           <input
// // //             type="text"
// // //             value={name}
// // //             onChange={(e) => setName(e.target.value)}
// // //             className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
// // //             placeholder="مثال: احمد محمدی"
// // //           />
// // //           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
// // //           >
// // //             {loading ? 'در حال ذخیره...' : 'ثبت و ادامه'}
// // //           </button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // frontend/app/admin-app/src/app/setup-profile/page.tsx
// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from '@packages/auth-store/src/useAuth';
// // import { apiClient } from '@packages/api-client'; // ← تغییر: استفاده از apiClient

// // export default function SetupProfilePage() {
// //   const { user } = useAuth();
// //   const router = useRouter();
// //   const [name, setName] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!name.trim()) {
// //       setError('نام الزامی است');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       // درخواست از طریق Gateway به سرویس User
// //       await apiClient.put('/api/user/profile/me', { name });
// //       // پس از ذخیره، به داشبورد مناسب هدایت شود
// //       if (user?.roles.includes('ADMIN')) {
// //         router.push('/admin/dashboard');
// //       } else {
// //         router.push('/dashboard');
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setError('خطا در ذخیره اطلاعات');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
// //         <h1 className="text-2xl font-bold text-center mb-6">تکمیل اطلاعات</h1>
// //         <form onSubmit={handleSubmit}>
// //           <label className="block text-gray-700 mb-2">نام و نام خانوادگی</label>
// //           <input
// //             type="text"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
// //             placeholder="مثال: احمد محمدی"
// //           />
// //           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
// //           >
// //             {loading ? 'در حال ذخیره...' : 'ثبت و ادامه'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@packages/auth-store/src/useAuth";
// import { apiClient } from "@packages/api-client";
// import { motion } from "framer-motion";
// import { FiSave, FiArrowLeft } from "react-icons/fi";
// import toast from "react-hot-toast";

// interface EditProfileForm {
//   name: string;
//   bio?: string;
//   avatarUrl?: string;
//   locationLat?: number;
//   locationLng?: number;
//   // فیلدهای تسکر (در صورت وجود)
//   hourlyRate?: number;
//   serviceAreas?: string; // در فرم به صورت رشته با کاما جدا می‌شود
// }

// export default function EditProfilePage() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState<EditProfileForm>({
//     name: "",
//     bio: "",
//     avatarUrl: "",
//     hourlyRate: undefined,
//     serviceAreas: "",
//   });
//   const [isTasker, setIsTasker] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await apiClient.get("/api/user/profile/me");
//         const data = res.data;
//         setForm({
//           name: data.name || "",
//           bio: data.bio || "",
//           avatarUrl: data.avatarUrl || "",
//           locationLat: data.locationLat,
//           locationLng: data.locationLng,
//           hourlyRate: data.taskerProfile?.hourlyRate,
//           serviceAreas: data.taskerProfile?.serviceAreas?.join(", ") || "",
//         });
//         setIsTasker(data.roles?.includes("TASKER") || false);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name.trim()) {
//       toast.error("نام الزامی است");
//       return;
//     }

//     setLoading(true);
//     try {
//       // تبدیل serviceAreas از رشته به آرایه
//       const updateData: any = {
//         name: form.name,
//         bio: form.bio,
//         avatarUrl: form.avatarUrl,
//         locationLat: form.locationLat,
//         locationLng: form.locationLng,
//       };
//       if (isTasker) {
//         updateData.hourlyRate = form.hourlyRate;
//         updateData.serviceAreas = form.serviceAreas ? form.serviceAreas.split(",").map((s) => s.trim()) : [];
//       }

//       await apiClient.put("/api/user/profile/me", updateData);
//       toast.success("پروفایل با موفقیت به‌روزرسانی شد");
//       router.push("/profile");
//     } catch (err) {
//       console.error(err);
//       toast.error("خطا در به‌روزرسانی پروفایل");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-6">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/60 dark:border-gray-700/60"
//       >
//         <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500" />
//         <div className="p-8">
//           <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
//             ویرایش پروفایل
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">نام کامل *</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">بیوگرافی</label>
//               <textarea
//                 name="bio"
//                 rows={3}
//                 value={form.bio}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 dark:text-gray-300 mb-1">آدرس آواتار (لینک)</label>
//               <input
//                 type="url"
//                 name="avatarUrl"
//                 value={form.avatarUrl}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
//               />
//             </div>

//             {/* مختصات مکانی (اختیاری) */}
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 mb-1">طول جغرافیایی</label>
//                 <input
//                   type="number"
//                   step="any"
//                   name="locationLat"
//                   value={form.locationLat || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/40"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 mb-1">عرض جغرافیایی</label>
//                 <input
//                   type="number"
//                   step="any"
//                   name="locationLng"
//                   value={form.locationLng || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/40"
//                 />
//               </div>
//             </div>

//             {/* فیلدهای مخصوص تسکر */}
//             {isTasker && (
//               <>
//                 <div className="border-t border-gray-200 dark:border-gray-700 my-4" />
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
//                   اطلاعات تسکر
//                 </h3>
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-1">نرخ ساعتی (تومان)</label>
//                   <input
//                     type="number"
//                     name="hourlyRate"
//                     value={form.hourlyRate || ""}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/40"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                     مناطق تحت پوشش (با کاما جدا کنید)
//                   </label>
//                   <input
//                     type="text"
//                     name="serviceAreas"
//                     value={form.serviceAreas}
//                     onChange={handleChange}
//                     placeholder="مثال: تهران, کرج, شیراز"
//                     className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/40"
//                   />
//                 </div>
//               </>
//             )}

//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full transition"
//               >
//                 <FiArrowLeft /> بازگشت
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full transition"
//               >
//                 <FiSave /> {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </main>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@packages/auth-store/src/useAuth';
import { apiClient } from '@packages/api-client';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaSave, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const { user } = useAuth(); // user شامل mobile و roles و ...
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });

  // دریافت اطلاعات پروفایل از سرویس User
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get('/api/user/profile/me');
        const profile = res.data;
        setForm({
          name: profile.name || '',
          email: user?.mobile || '---',   // ایمیل = شماره موبایل
          address: profile.bio || '',     // آدرس در فیلد bio ذخیره می‌شود
        });
      } catch (err) {
        console.error('Failed to load profile', err);
        toast.error('خطا در بارگذاری اطلاعات');
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('نام و نام خانوادگی الزامی است');
      return;
    }
    setLoading(true);
    try {
      // ارسال درخواست به Gateway (که به سرویس User می‌رود)
      await apiClient.put('/api/user/profile/me', {
        name: form.name,
        bio: form.address,   // آدرس در bio ذخیره شود
      });
      toast.success('پروفایل با موفقیت به‌روزرسانی شد');
      router.push('/profile');  // برگشت به صفحه پروفایل
    } catch (err) {
      console.error(err);
      toast.error('خطا در به‌روزرسانی پروفایل');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
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
          {/* آیکون و عنوان */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-400 p-3 rounded-full">
              <FaUser className="text-2xl text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">ویرایش پروفایل</h2>
          <p className="text-gray-600 text-center mb-8">اطلاعات خود را به‌روز کنید</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* نام کامل */}
            <div>
              <label className="block text-right text-gray-700 mb-2">نام و نام خانوادگی</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* ایمیل (فقط نمایش) */}
            <div>
              <label className="block text-right text-gray-700 mb-2">شماره موبایل / ایمیل</label>
              <input
                type="text"
                name="email"
                value={form.email}
                disabled
                className="w-full bg-gray-200 border border-gray-300 rounded-lg p-3 text-gray-500 cursor-not-allowed"
              />
              <p className="text-sm text-gray-500 mt-1 text-right">
                برای تغییر شماره موبایل با پشتیبانی تماس بگیرید
              </p>
            </div>

            {/* آدرس */}
            <div>
              <label className="block text-right text-gray-700 mb-2">آدرس</label>
              <textarea
                name="address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="آدرس کامل خود را وارد کنید"
                dir="rtl"
              />
            </div>

            {/* دکمه‌ها */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                <FaArrowLeft /> بازگشت
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                <FaSave /> {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}