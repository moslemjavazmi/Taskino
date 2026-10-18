// shared/packages/ui-kit/src/admin/pages/AppLogs.tsx
"use client";

import { useState } from "react";
import { FaSearch, FaDownload, FaInfoCircle, FaExclamationTriangle, FaBug } from "react-icons/fa";

const logs = [
  { id: 1, level: "info", message: "کاربر احمد محمدی وارد سیستم شد", timestamp: "۱۴۰۳/۱۲/۰۱ ۱۴:۳۰", user: "احمد محمدی" },
  { id: 2, level: "warning", message: "درخواست ناموفق برای ورود", timestamp: "۱۴۰۳/۱۲/۰۱ ۱۴:۲۵", user: "نامشخص" },
  { id: 3, level: "error", message: "خطا در اتصال به دیتابیس", timestamp: "۱۴۰۳/۱۲/۰۱ ۱۴:۲۰", user: "سیستم" },
  { id: 4, level: "info", message: "تسکر جدید ثبت شد", timestamp: "۱۴۰۳/۱۲/۰۱ ۱۴:۱۵", user: "سارا حسینی" },
];

const getLevelIcon = (level: string) => {
  switch(level) {
    case "info": return <FaInfoCircle className="text-blue-500" />;
    case "warning": return <FaExclamationTriangle className="text-yellow-500" />;
    case "error": return <FaBug className="text-red-500" />;
    default: return <FaInfoCircle />;
  }
};

export default function AppLogs() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">لاگ‌های سیستم</h1>
          <p className="text-gray-500 mt-1">مشاهده تمام رویدادهای سیستم</p>
        </div>
        <button className="bg-green-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-green-600 transition-colors">
          <FaDownload /> خروجی گرفتن
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در لاگ‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              dir="rtl"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">سطح</th>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">پیام</th>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">کاربر</th>
                <th className="text-right px-6 py-4 text-gray-600 font-semibold">زمان</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getLevelIcon(log.level)}
                      <span className={`text-sm ${
                        log.level === "error" ? "text-red-600" :
                        log.level === "warning" ? "text-yellow-600" :
                        "text-blue-600"
                      }`}>
                        {log.level === "info" ? "اطلاعات" :
                         log.level === "warning" ? "اخطار" : "خطا"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{log.message}</td>
                  <td className="px-6 py-4 text-gray-600">{log.user}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}