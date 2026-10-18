
// app/taskers/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaStar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaBriefcase,
  FaPlus,
  FaTimes,
  FaUserCheck,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { apiClient } from '@packages/api-client';

// Mock data – replace with real API call later
const taskers = [
  {
    id: '1',
    name: 'احمد محمدی',
    avatar: '',
    category: 'تعمیرات',
    rating: 4.8,
    reviewCount: 124,
    hourlyRate: 250000,
    location: 'تهران، تهرانپارس',
    completedTasks: 342,
  },
  {
    id: '2',
    name: 'سارا حسینی',
    avatar: '',
    category: 'نظافت',
    rating: 4.9,
    reviewCount: 98,
    hourlyRate: 180000,
    location: 'تهران، سعادت‌آباد',
    completedTasks: 287,
  },
  {
    id: '3',
    name: 'رضا کریمی',
    avatar: '',
    category: 'لوله‌کشی',
    rating: 4.7,
    reviewCount: 203,
    hourlyRate: 320000,
    location: 'کرج، فردیس',
    completedTasks: 412,
  },
  {
    id: '4',
    name: 'مریم علوی',
    avatar: '',
    category: 'آموزش',
    rating: 5.0,
    reviewCount: 56,
    hourlyRate: 450000,
    location: 'تهران، آنلاین',
    completedTasks: 98,
  },
];

export default function TaskersPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    location: '',
  });

  const filteredTaskers = taskers.filter(
    (t) =>
      t.name.includes(searchTerm) ||
      t.category.includes(searchTerm) ||
      t.location.includes(searchTerm)
  );

// داخل کامپوننت TaskersPage
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // اعتبارسنجی ساده (اختیاری)
  if (!formData.title.trim()) {
    toast.error('عنوان تسک الزامی است');
    return;
  }
  if (!formData.budget || parseInt(formData.budget) <= 0) {
    toast.error('بودجه معتبر وارد کنید');
    return;
  }

  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      scheduledAt: null, // در صورت نیاز می‌توانید از فیلد تاریخ استفاده کنید
      // بودجه در مدل Task وجود ندارد (فقط در مدل‌های دیگر هست)، پس فعلاً ارسال نمی‌شود
    };
    const response = await apiClient.post('/api/tasks', payload);
    if (response.status === 201) {
      toast.success('تسک شما با موفقیت ثبت شد! منتظر پیشنهاد تسکرها باشید.');
      setShowForm(false);
      setFormData({ title: '', category: '', description: '', budget: '', location: '' });
      // می‌توانید کاربر را به صفحه تسک‌های خود هدایت کنید
      // router.push('/my-tasks');
    }
  } catch (err: any) {
    console.error(err);
    toast.error(err.response?.data?.message || 'خطا در ثبت تسک');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">تسکرهای حرفه‌ای</span>
            <span className="block text-teal-600 mt-2">در یک کلیک</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            بهترین متخصصان را پیدا کنید و تسک خود را بسپارید
          </p>
        </div>

        {/* Action bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-sm hover:bg-teal-700 transition-all duration-200 hover:shadow-md"
          >
            <FaPlus className="text-sm" />
            درخواست تسک جدید
          </button>
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="جستجو بر اساس نام، تخصص یا منطقه..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Tasker grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTaskers.map((tasker, idx) => (
            <motion.div
              key={tasker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{tasker.name}</h3>
                    <p className="text-sm text-teal-600 font-medium mt-0.5">{tasker.category}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 text-xs" />
                    <span className="text-sm font-semibold text-gray-700">{tasker.rating}</span>
                    <span className="text-xs text-gray-400">({tasker.reviewCount})</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaDollarSign className="text-teal-500 w-4" />
                    <span>{tasker.hourlyRate.toLocaleString()} تومان / ساعت</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-400 w-4" />
                    <span className="truncate">{tasker.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-blue-500 w-4" />
                    <span>{tasker.completedTasks} تسک انجام شده</span>
                  </div>
                </div>

                <button className="mt-5 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200">
                  <FaUserCheck className="text-sm" />
                  انتخاب تسکر
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredTaskers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">هیچ تسکری با این مشخصات یافت نشد.</p>
          </div>
        )}
      </div>

      {/* Modal – New Task Request */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500/75 transition-opacity"
                onClick={() => setShowForm(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative transform overflow-hidden rounded-2xl bg-white text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">درخواست تسک جدید</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-full p-1 hover:bg-gray-100 transition"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">عنوان تسک *</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border-gray-200 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی *</label>
                    <select
                      required
                      className="w-full rounded-xl border-gray-200 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">انتخاب کنید</option>
                      <option>تعمیرات</option>
                      <option>نظافت</option>
                      <option>لوله‌کشی</option>
                      <option>آموزش</option>
                      <option>سایر</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
                    <textarea
                      rows={3}
                      className="w-full rounded-xl border-gray-200 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">بودجه (تومان)</label>
                    <input
                      type="number"
                      className="w-full rounded-xl border-gray-200 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border-gray-200 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition"
                    >
                      ثبت درخواست
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}