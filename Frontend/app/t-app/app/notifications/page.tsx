"use client";

import { motion } from "framer-motion";
import { FaBell, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const notifications = [
  { id: 1, title: "پیشنهاد شما پذیرفته شد", desc: "تسک تعمیر یخچال به شما واگذار شد.", time: "۵ دقیقه پیش", type: "success" },
  { id: 2, title: "تسک جدید در منطقه شما", desc: "یک درخواست نظافت در محدوده شما ثبت شده.", time: "۱ ساعت پیش", type: "info" },
];

export default function NotificationsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">اعلانات</h2>
      {notifications.map(n => (
        <div key={n.id} className="bg-white rounded-xl shadow p-4 flex items-start gap-3">
          {n.type === "success" ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaInfoCircle className="text-blue-500 text-xl" />}
          <div className="flex-1"><h3 className="font-bold">{n.title}</h3><p className="text-gray-500 text-sm">{n.desc}</p><span className="text-xs text-gray-400">{n.time}</span></div>
          <button className="text-gray-400 text-sm">✔</button>
        </div>
      ))}
    </motion.div>
  );
}