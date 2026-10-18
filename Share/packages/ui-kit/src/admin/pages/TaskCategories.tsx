// shared/packages/ui-kit/src/admin/pages/TaskCategories.tsx
"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const categories = [
  { id: 1, name: "تعمیرات", icon: "🔧", tasksCount: 1245, status: "active" },
  { id: 2, name: "نظافت", icon: "🧹", tasksCount: 892, status: "active" },
  { id: 3, name: "لوله‌کشی", icon: "💧", tasksCount: 567, status: "active" },
  { id: 4, name: "برق‌کاری", icon: "⚡", tasksCount: 432, status: "inactive" },
];

export default function TaskCategories() {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">دسته‌بندی تسک‌ها</h1>
          <p className="text-gray-500 mt-1">مدیریت دسته‌بندی‌های تسک‌ها</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <FaPlus /> دسته‌بندی جدید
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{category.icon}</span>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaEdit className="text-blue-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{category.tasksCount} تسک</p>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${category.status === "active" ? "text-green-600" : "text-red-600"}`}>
                {category.status === "active" ? "فعال" : "غیرفعال"}
              </span>
              {category.status === "active" && <FaCheck className="text-green-500" />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* مودال افزودن دسته‌بندی */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-96"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">دسته‌بندی جدید</h2>
            <input
              type="text"
              placeholder="نام دسته‌بندی"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              dir="rtl"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                انصراف
              </button>
              <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors">
                ایجاد
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}