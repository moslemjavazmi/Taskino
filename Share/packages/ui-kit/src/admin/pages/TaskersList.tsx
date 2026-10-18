// shared/packages/ui-kit/src/admin/pages/TaskersList.tsx
"use client";

import { useState } from "react";
import { FaSearch, FaFilter, FaStar, FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

const taskers = [
  {
    id: 1,
    name: "احمد محمدی",
    mobile: "09123456789",
    rating: 4.8,
    tasksCompleted: 342,
    status: "active",
    category: "تعمیرات",
    joinDate: "۱۴۰۲/۰۵/۱۲",
  },
  {
    id: 2,
    name: "سارا حسینی",
    mobile: "09198765432",
    rating: 4.9,
    tasksCompleted: 287,
    status: "active",
    category: "نظافت",
    joinDate: "۱۴۰۲/۰۶/۲۳",
  },
  {
    id: 3,
    name: "رضا کریمی",
    mobile: "09331234567",
    rating: 4.5,
    tasksCompleted: 156,
    status: "inactive",
    category: "لوله‌کشی",
    joinDate: "۱۴۰۲/۰۷/۰۵",
  },
];

export default function TaskersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTaskers = taskers.filter(tasker => {
    const matchesSearch = tasker.name.includes(searchTerm) || tasker.mobile.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || tasker.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">مدیریت ایجنت‌ها</h1>
          <p className="text-gray-500 mt-1">لیست تمام ایجنت‌های پلتفرم</p>
        </div>
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all">
          افزودن ایجنت جدید
        </button>
      </div>

      {/* فیلترها */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی ایجنت..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              dir="rtl"
            />
          </div>
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pr-4 pl-8 py-2 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
          </select>
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* جدول ایجنت‌ها */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">نام</th>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">شماره موبایل</th>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">دسته‌بندی</th>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">امتیاز</th>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">تسک‌ها</th>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">وضعیت</th>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredTaskers.map((tasker, index) => (
                <motion.tr
                  key={tasker.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{tasker.name}</td>
                  <td className="px-6 py-4 text-gray-600">{tasker.mobile}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {tasker.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-gray-700">{tasker.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{tasker.tasksCompleted}</td>
                  <td className="px-6 py-4">
                    {tasker.status === "active" ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <FaCheckCircle /> فعال
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600">
                        <FaTimesCircle /> غیرفعال
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-green-600 hover:text-green-700">
                      <FaEye />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}