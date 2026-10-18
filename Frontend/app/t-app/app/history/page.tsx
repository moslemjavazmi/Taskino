"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const completedTasks = [
  { id: 1, title: "تعمیر ماشین لباسشویی", client: "نرگس احمدی", date: "۱۴۰۲/۱۱/۲۰", amount: "۲۲۰,۰۰۰", rating: 5 },
  { id: 2, title: "نصب کولر", client: "حسین رضایی", date: "۱۴۰۲/۱۱/۱۵", amount: "۳۰۰,۰۰۰", rating: 4.8 },
];

export default function HistoryPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-bold mb-4">تاریخچه انجام تسک‌ها</h2>
      <div className="space-y-4">
        {completedTasks.map(task => (
          <div key={task.id} className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center flex-wrap">
            <div><h3 className="font-bold">{task.title}</h3><p className="text-sm text-gray-500">{task.client} - {task.date}</p></div>
            <div><span className="text-green-600 font-bold">{task.amount} تومان</span><div className="flex text-yellow-400 text-sm">{Array(5).fill(0).map((_,i) => <FaStar key={i} className={i < Math.floor(task.rating) ? "text-yellow-400" : "text-gray-300"} />)}</div></div>
            <button className="text-green-600 border border-green-300 px-3 py-1 rounded-full text-sm">مشاهده جزئیات</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}