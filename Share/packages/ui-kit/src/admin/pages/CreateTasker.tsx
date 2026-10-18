// shared/packages/ui-kit/src/admin/pages/CreateTasker.tsx
"use client";

import { useState } from "react";
import { FaUpload, FaUser, FaPhone, FaEnvelope, FaMapMarker } from "react-icons/fa";

export default function CreateTasker() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    category: "",
    description: "",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">ایجاد ایجنت جدید</h1>
        <p className="text-gray-500 mt-1">اطلاعات ایجنت جدید را وارد کنید</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">نام کامل</label>
              <div className="relative">
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="نام و نام خانوادگی"
                  dir="rtl"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">شماره موبایل</label>
              <div className="relative">
                <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">ایمیل</label>
              <div className="relative">
                <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">دسته‌بندی</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>تعمیرات</option>
                <option>نظافت</option>
                <option>لوله‌کشی</option>
                <option>برق‌کاری</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">آدرس</label>
              <div className="relative">
                <FaMapMarker className="absolute right-3 top-3 text-gray-400" />
                <textarea
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="آدرس کامل"
                  dir="rtl"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">توضیحات</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
                placeholder="توضیحات درباره ایجنت"
                dir="rtl"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex gap-4">
            <button className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition-colors">
              ثبت ایجنت
            </button>
            <button className="border border-gray-300 px-6 py-2 rounded-xl hover:bg-gray-50 transition-colors">
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}