
// frontend/user-app/src/app/profile/edit/page.tsx (یا هر مسیری که دارید)
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@packages/auth-store/src/useAuth';
import { apiClient } from '@packages/api-client';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaSave, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',    // این در نهایت به bio نگاشت می‌شود
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get('/api/user/profile/me');
        const profile = res.data;
        setForm({
          name: profile.name || '',
          email: user?.mobile || '---',
          address: profile.bio || '',   // آدرس از bio خوانده شود
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
      await apiClient.put('/api/user/profile/me', {
        name: form.name,
        bio: form.address,   // آدرس در bio ذخیره شود
      });
      toast.success('پروفایل با موفقیت به‌روزرسانی شد');
      router.push('/profile'); // یا هر صفحه‌ای که می‌خواهید
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
          className=" rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-400 p-3 rounded-full">
              <FaUser className="text-2xl text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">تکمیل اطلاعات</h2>
          <p className="text-gray-600 text-center mb-8">لطفاً اطلاعات خود را وارد کنید</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div>
              <label className="block text-right text-gray-700 mb-2">شماره موبایل</label>
              <input
                type="text"
                name="email"
                value={form.email}
                disabled
                className="w-full bg-gray-200 border border-gray-300 rounded-lg p-3 text-gray-500 cursor-not-allowed"
              />
            </div>

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

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                <FaSave /> {loading ? 'در حال ذخیره...' : 'ثبت اطلاعات'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}