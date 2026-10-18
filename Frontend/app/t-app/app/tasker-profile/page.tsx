
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from '@packages/auth-store/src/useAuth';
// // import { apiClient } from '@packages/api-client';
// // import { motion } from 'framer-motion';
// // import { FaUser, FaEnvelope, FaMapMarkerAlt, FaSave, FaArrowLeft } from 'react-icons/fa';
// // import toast from 'react-hot-toast';

// // export default function EditProfilePage() {
// //   const { user } = useAuth(); // user شامل mobile و roles و ...
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(false);
// //   const [initialLoading, setInitialLoading] = useState(true);
// //   const [form, setForm] = useState({
// //     name: '',
// //     email: '',
// //     address: '',
// //   });

// //   // دریافت اطلاعات پروفایل از سرویس User
// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const res = await apiClient.get('/api/user/profile/me');
// //         const profile = res.data;
// //         setForm({
// //           name: profile.name || '',
// //           email: user?.mobile || '---',   // ایمیل = شماره موبایل
// //           address: profile.bio || '',     // آدرس در فیلد bio ذخیره می‌شود
// //         });
// //       } catch (err) {
// //         console.error('Failed to load profile', err);
// //         toast.error('خطا در بارگذاری اطلاعات');
// //       } finally {
// //         setInitialLoading(false);
// //       }
// //     };
// //     fetchProfile();
// //   }, [user]);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setForm(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!form.name.trim()) {
// //       toast.error('نام و نام خانوادگی الزامی است');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       // ارسال درخواست به Gateway (که به سرویس User می‌رود)
// //       await apiClient.put('/api/user/profile/me', {
// //         name: form.name,
// //         bio: form.address,   // آدرس در bio ذخیره شود
// //       });
// //       toast.success('پروفایل با موفقیت به‌روزرسانی شد');
// //       router.push('/profile');  // برگشت به صفحه پروفایل
// //     } catch (err) {
// //       console.error(err);
// //       toast.error('خطا در به‌روزرسانی پروفایل');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (initialLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
// //       <div className="max-w-2xl mx-auto">
// //         <motion.div
// //           initial={{ opacity: 0, y: 50 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //           className="bg-white rounded-2xl shadow-2xl p-8"
// //         >
// //           {/* آیکون و عنوان */}
// //           <div className="flex items-center justify-center mb-6">
// //             <div className="bg-green-400 p-3 rounded-full">
// //               <FaUser className="text-2xl text-white" />
// //             </div>
// //           </div>
// //           <h2 className="text-2xl font-bold text-center mb-2">ویرایش پروفایل</h2>
// //           <p className="text-gray-600 text-center mb-8">اطلاعات خود را به‌روز کنید</p>

// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             {/* نام کامل */}
// //             <div>
// //               <label className="block text-right text-gray-700 mb-2">نام و نام خانوادگی</label>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 value={form.name}
// //                 onChange={handleChange}
// //                 className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
// //                 required
// //               />
// //             </div>

// //             {/* ایمیل (فقط نمایش) */}
// //             <div>
// //               <label className="block text-right text-gray-700 mb-2">شماره موبایل / ایمیل</label>
// //               <input
// //                 type="text"
// //                 name="email"
// //                 value={form.email}
// //                 disabled
// //                 className="w-full bg-gray-200 border border-gray-300 rounded-lg p-3 text-gray-500 cursor-not-allowed"
// //               />
// //               <p className="text-sm text-gray-500 mt-1 text-right">
// //                 برای تغییر شماره موبایل با پشتیبانی تماس بگیرید
// //               </p>
// //             </div>

// //             {/* آدرس */}
// //             <div>
// //               <label className="block text-right text-gray-700 mb-2">آدرس</label>
// //               <textarea
// //                 name="address"
// //                 rows={3}
// //                 value={form.address}
// //                 onChange={handleChange}
// //                 className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
// //                 placeholder="آدرس کامل خود را وارد کنید"
// //                 dir="rtl"
// //               />
// //             </div>

// //             {/* دکمه‌ها */}
// //             <div className="flex justify-end gap-4 pt-4">
// //               <button
// //                 type="button"
// //                 onClick={() => router.back()}
// //                 className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
// //               >
// //                 <FaArrowLeft /> بازگشت
// //               </button>
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
// //               >
// //                 <FaSave /> {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
// //               </button>
// //             </div>
// //           </form>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }


// // frontend/user-app/src/app/setup-profile/page.tsx (یا هر مسیری که دارید)
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@packages/auth-store/src/useAuth';
// import { apiClient } from '@packages/api-client';
// import { motion } from 'framer-motion';
// import { FaUser, FaEnvelope, FaMapMarkerAlt, FaSave, FaArrowLeft } from 'react-icons/fa';
// import toast from 'react-hot-toast';

// export default function SetupProfilePage() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     address: '',    // این در نهایت به bio نگاشت می‌شود
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await apiClient.get('/api/user/profile/me');
//         const profile = res.data;
//         setForm({
//           name: profile.name || '',
//           email: user?.mobile || '---',
//           address: profile.bio || '',   // آدرس از bio خوانده شود
//         });
//       } catch (err) {
//         console.error('Failed to load profile', err);
//         toast.error('خطا در بارگذاری اطلاعات');
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [user]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name.trim()) {
//       toast.error('نام و نام خانوادگی الزامی است');
//       return;
//     }
//     setLoading(true);
//     try {
//       await apiClient.put('/api/user/profile/me', {
//         name: form.name,
//         bio: form.address,   // آدرس در bio ذخیره شود
//       });
//       toast.success('پروفایل با موفقیت به‌روزرسانی شد');
//       router.push('/profile'); // یا هر صفحه‌ای که می‌خواهید
//     } catch (err) {
//       console.error(err);
//       toast.error('خطا در به‌روزرسانی پروفایل');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
//       <div className="max-w-2xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-2xl shadow-2xl p-8"
//         >
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-green-400 p-3 rounded-full">
//               <FaUser className="text-2xl text-white" />
//             </div>
//           </div>
//           <h2 className="text-2xl font-bold text-center mb-2">تکمیل اطلاعات</h2>
//           <p className="text-gray-600 text-center mb-8">لطفاً اطلاعات خود را وارد کنید</p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-right text-gray-700 mb-2">نام و نام خانوادگی</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-right text-gray-700 mb-2">شماره موبایل</label>
//               <input
//                 type="text"
//                 name="email"
//                 value={form.email}
//                 disabled
//                 className="w-full bg-gray-200 border border-gray-300 rounded-lg p-3 text-gray-500 cursor-not-allowed"
//               />
//             </div>

//             <div>
//               <label className="block text-right text-gray-700 mb-2">آدرس</label>
//               <textarea
//                 name="address"
//                 rows={3}
//                 value={form.address}
//                 onChange={handleChange}
//                 className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 placeholder="آدرس کامل خود را وارد کنید"
//                 dir="rtl"
//               />
//             </div>

//             <div className="flex justify-end gap-4 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
//               >
//                 <FaSave /> {loading ? 'در حال ذخیره...' : 'ثبت اطلاعات'}
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@packages/auth-store/src/useAuth';
import { apiClient } from '@packages/api-client';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaMapMarkerAlt, FaDollarSign, FaCity, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function TaskerSetupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    address: '',
    hourlyRate: '',
    serviceAreas: '',
  });

  // بارگذاری اطلاعات موجود (اگر قبلاً بخشی از پروفایل را تکمیل کرده باشد)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // دریافت پروفایل پایه
        const profileRes = await apiClient.get('/api/user/profile/me');
        const profile = profileRes.data;
        // دریافت پروفایل تسکر (اگر وجود داشته باشد)
        let taskerProfile = null;
        try {
          const taskerRes = await apiClient.get('/api/user/tasker/me');
          taskerProfile = taskerRes.data;
        } catch (err: any) {
          if (err.response?.status !== 404) throw err;
        }

        setForm({
          name: profile.name || '',
          address: profile.address || '',
          hourlyRate: taskerProfile?.hourlyRate ? String(taskerProfile.hourlyRate) : '',
          serviceAreas: taskerProfile?.serviceAreas?.join(', ') || '',
        });
      } catch (err) {
        console.error('Error loading profile data:', err);
        toast.error('خطا در بارگذاری اطلاعات');
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

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
    if (!form.hourlyRate || parseInt(form.hourlyRate) <= 0) {
      toast.error('نرخ ساعتی معتبر وارد کنید');
      return;
    }
    if (!form.serviceAreas.trim()) {
      toast.error('حداقل یک منطقه تحت پوشش وارد کنید');
      return;
    }

    setLoading(true);
    try {
      // 1. به‌روزرسانی پروفایل پایه (UserProfile)
      await apiClient.put('/api/user/profile/me', {
        name: form.name,
        address: form.address,
      });

      // 2. به‌روزرسانی پروفایل تسکر (TaskerProfile)
      await apiClient.put('/api/user/tasker/me', {
        hourlyRate: parseInt(form.hourlyRate),
        serviceAreas: form.serviceAreas.split(',').map(s => s.trim()),
        isActive: true,   // به محض تکمیل، تسکر فعال می‌شود (اختیاری)
      });

      toast.success('اطلاعات با موفقیت ذخیره شد');
      router.push('/tasks');  // هدایت به صفحه تسک‌ها
    } catch (err) {
      console.error(err);
      toast.error('خطا در ذخیره اطلاعات');
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
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-400 p-3 rounded-full">
              <FaUser className="text-2xl text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">تکمیل پروفایل تسکر</h2>
          <p className="text-gray-600 text-center mb-8">
            لطفاً اطلاعات خود را وارد کنید تا مشتریان بتوانند شما را پیدا کنند.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* نام کامل */}
            <div>
              <label className="block text-right text-gray-700 mb-2">نام و نام خانوادگی</label>
              <div className="relative">
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
            </div>

            {/* آدرس (از UserProfile.address) */}
            <div>
              <label className="block text-right text-gray-700 mb-2">آدرس</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute right-3 top-3 text-gray-400" />
                <textarea
                  name="address"
                  rows={2}
                  value={form.address}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="آدرس کامل محل سکونت یا کسب‌وکار"
                  dir="rtl"
                />
              </div>
            </div>

            {/* نرخ ساعتی (تومان) */}
            <div>
              <label className="block text-right text-gray-700 mb-2">نرخ ساعتی (تومان)</label>
              <div className="relative">
                <FaDollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="hourlyRate"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="مثال: 250000"
                  required
                />
              </div>
            </div>

            {/* مناطق تحت پوشش (با کاما جدا شوند) */}
            <div>
              <label className="block text-right text-gray-700 mb-2">
                مناطق تحت پوشش (با کاما جدا کنید)
              </label>
              <div className="relative">
                <FaCity className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="serviceAreas"
                  value={form.serviceAreas}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="مثال: تهران, کرج, شیراز"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">
                نام شهرها یا محله‌ها را با ویرگول انگلیسی از هم جدا کنید
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
              >
                <FaSave /> {loading ? 'در حال ذخیره...' : 'ثبت و ادامه'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}