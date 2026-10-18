// frontend/user-app/src/app/profile/page.tsx (یا هر مسیری که دارید)

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