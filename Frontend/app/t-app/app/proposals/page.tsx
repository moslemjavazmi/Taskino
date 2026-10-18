"use client";

import { motion } from "framer-motion";
import { FaClock, FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

const proposals = [
  { id: 1, taskTitle: "تعمیر یخچال", price: "۳۲۰,۰۰۰", status: "در انتظار", date: "۱۴۰۲/۱۲/۱۸" },
  { id: 2, taskTitle: "نظافت منزل", price: "۳۹۰,۰۰۰", status: "قبول شده", date: "۱۴۰۲/۱۲/۱۷" },
  { id: 3, taskTitle: "لوله‌کشی", price: "۲۱۰,۰۰۰", status: "رد شده", date: "۱۴۰۲/۱۲/۱۶" },
];

const statusIcon = (s: string) => {
  if (s === "قبول شده") return <FaCheckCircle className="text-green-500" />;
  if (s === "رد شده") return <FaTimesCircle className="text-red-500" />;
  return <FaClock className="text-yellow-500" />;
};

export default function ProposalsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-bold mb-4">پیشنهادهای ارسالی من</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50"><tr><th className="p-3 text-right">عنوان تسک</th><th>قیمت پیشنهادی</th><th>تاریخ</th><th>وضعیت</th><th></th></tr></thead>
          <tbody className="divide-y">
            {proposals.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium">{p.taskTitle}</td><td>{p.price} تومان</td><td>{p.date}</td><td className="flex items-center gap-1">{statusIcon(p.status)} {p.status}</td><td><button className="text-green-600"><FaEye /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}