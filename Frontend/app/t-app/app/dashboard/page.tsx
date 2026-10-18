
"use client";

import { motion } from "framer-motion";
import { FaGavel, FaTrophy, FaMapMarkerAlt, FaClock, FaMoneyBill } from "react-icons/fa";

const suggestedTasks = [
  { id: 1, title: "تعمیر یخچال ال جی", location: "تهران، سهروردی", price: "۳۰۰,۰۰۰ تومان", distance: "۲.۵ کیلومتر", time: "تا ۲ ساعت بعد" },
  { id: 2, title: "سرویس کولر گازی", location: "تهران، جردن", price: "۲۵۰,۰۰۰ تومان", distance: "۴ کیلومتر", time: "فردا صبح" },
];

const wonTasks = [
  { id: 3, title: "نصب ماشین لباسشویی", client: "سارا محمدی", price: "۱۸۰,۰۰۰ تومان", status: "در انتظار شروع" },
  { id: 4, title: "رفع نشتی آب", client: "علی احمدی", price: "۱۲۰,۰۰۰ تومان", status: "تأیید شده" },
];

export default function TaskerDashboard() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-l from-green-400 to-blue-400 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">خوش برگشتی، رضا! 👋</h2>
        <p>امروز ۳ پیشنهاد جدید داری. یکی از تسک‌های برنده شده را شروع کن.</p>
      </motion.div>

      {/* تسک‌های پیشنهاد داده شده (به تسکر) */}
      <section>
        <h3 className="text-xl font-bold flex items-center gap-2"><FaGavel className="text-green-500" /> تسک‌های پیشنهادی به شما</h3>
        <div className="grid md:grid-cols-2 gap-5 mt-3">
          {suggestedTasks.map(task => (
            <div key={task.id} className="bg-white rounded-xl shadow p-4 border-r-4 border-green-400">
              <h4 className="font-bold">{task.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2"><FaMapMarkerAlt /> {task.location}</div>
              <div className="flex justify-between mt-3">
                <span className="text-green-600 font-bold">{task.price}</span>
                <span className="text-gray-500 text-sm flex items-center gap-1"><FaClock /> {task.time}</span>
              </div>
              <button className="mt-3 w-full bg-green-100 text-green-700 py-2 rounded-lg">ارسال پیشنهاد قیمت</button>
            </div>
          ))}
        </div>
      </section>

      {/* تسک‌های برنده شده */}
      <section>
        <h3 className="text-xl font-bold flex items-center gap-2"><FaTrophy className="text-yellow-500" /> تسک‌های برنده شده</h3>
        <div className="bg-white rounded-xl shadow divide-y">
          {wonTasks.map(task => (
            <div key={task.id} className="p-4 flex justify-between items-center">
              <div><p className="font-bold">{task.title}</p><p className="text-sm text-gray-500">{task.client}</p></div>
              <div className="text-left"><span className="font-bold text-green-600">{task.price}</span><p className="text-xs text-gray-400">{task.status}</p></div>
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">مشاهده</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}