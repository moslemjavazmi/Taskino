// "use client";

// import { motion } from "framer-motion";
// import { FaCalendarAlt } from "react-icons/fa";

// const events = [
//   // { date: "۱۴۰۲/۱۲/۲۲", task: "تعمیر یخچال - ساعت ۱۴" },
//   { date: "۱۴۰۲/۱۲/۲۳", task: "نظافت منزل - ساعت ۱۰" },
// ];

// export default function CalendarPage() {
//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//       <div className="bg-white rounded-2xl shadow-xl p-6 text-center"><FaCalendarAlt className="text-5xl text-green-500 mx-auto mb-4" /><h2 className="text-xl font-bold">تقویم زمان‌بندی تسک‌ها</h2><div className="mt-6 space-y-2">{events.map((e,idx) => <div key={idx} className="border-b py-2"><span className="font-bold">{e.date}</span> - {e.task}</div>)}</div></div>
//     </motion.div>
//   );
// }



"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaChevronRight,
  FaChevronLeft,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

// داده‌های نمونه برای تسک‌ها (در تاریخ‌های مختلف)
const tasks = [
  { id: 1, date: "2025-05-03", title: "تعمیر یخچال", time: "۱۴:۰۰", location: "تهران، سهروردی", client: "مهدی رضایی", status: "confirmed" },
  { id: 2, date: "2025-05-05", title: "نظافت منزل", time: "۱۰:۳۰", location: "تهران، ونک", client: "سارا محمدی", status: "pending" },
  { id: 3, date: "2025-05-10", title: "نصب کولر گازی", time: "۱۵:۰۰", location: "تهران، جردن", client: "علی کریمی", status: "confirmed" },
  { id: 4, date: "2025-05-15", title: "لوله‌کشی دستشویی", time: "۰۹:۰۰", location: "تهران، الهیه", client: "نرگس احمدی", status: "completed" },
];

// تابع کمکی برای گرفتن نام ماه فارسی
const getPersianMonth = (date: Date) => {
  const months = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  return months[date.getMonth()];
};

// تابع برای گرفتن روزهای ماه
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// تابع برای گرفتن روز شروع ماه (0 = یکشنبه، 6 = شنبه - برای تطابق با تقویم فارسی)
// در اینجا یکشنبه را به عنوان 0 در نظر می‌گیریم تا نمایش به RTL نزدیک باشد
const getStartDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDayOfMonth(year, month);
  const persianMonth = getPersianMonth(currentDate);

  // تسک‌های روز انتخاب شده
  const selectedTasks = selectedDate
    ? tasks.filter((task) => task.date === selectedDate)
    : [];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  // ساخت آرایه روزهای ماه (با جاهای خالی ابتدا)
  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const hasTask = tasks.some((task) => task.date === dateStr);
    calendarDays.push({ day: d, dateStr, hasTask });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* بخش تقویم (سمت چپ در دسکتاپ) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* هدر تقویم با ناوبری */}
            <div className="bg-gradient-to-l from-green-400 to-blue-500 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-2xl" />
                <h2 className="text-xl font-bold">
                  {persianMonth} {year}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
                >
                  <FaChevronRight />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
                >
                  <FaChevronLeft />
                </button>
              </div>
            </div>

            {/* روزهای هفته - با ترتیب صحیح برای RTL (شنبه تا جمعه) */}
            <div className="grid grid-cols-7 gap-1 p-4 pb-2 text-center font-bold text-gray-500 border-b">
              {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, idx) => (
                <div key={idx} className="text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* شبکه روزها */}
            <div className="grid grid-cols-7 gap-1 p-4 pt-2">
              {calendarDays.map((item, idx) => {
                if (!item) {
                  return <div key={`empty-${idx}`} className="h-16 rounded-xl bg-gray-50/50" />;
                }
                const isSelected = selectedDate === item.dateStr;
                return (
                  <motion.button
                    key={item.day}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDate(item.dateStr)}
                    className={`
                      relative h-16 rounded-xl flex flex-col items-center justify-center
                      transition-all duration-200
                      ${isSelected ? "bg-green-100 ring-2 ring-green-400" : "hover:bg-gray-100"}
                    `}
                  >
                    <span
                      className={`text-lg font-semibold ${
                        isSelected ? "text-green-700" : "text-gray-800"
                      }`}
                    >
                      {item.day}
                    </span>
                    {item.hasTask && (
                      <div className="absolute bottom-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* بخش تسک‌های روز انتخاب شده */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-5 sticky top-24">
            <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-3 mb-3">
              <FaClock className="text-green-500" />
              {selectedDate
                ? `تسک‌های روز ${selectedDate.split("-")[2]} ${persianMonth}`
                : "روزی را انتخاب کنید"}
            </h3>
            <AnimatePresence mode="wait">
              {selectedDate && selectedTasks.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-400 py-10"
                >
                  هیچ تسکی برای این روز ثبت نشده است.
                </motion.div>
              )}
              {selectedTasks.length > 0 && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {selectedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border rounded-xl p-3 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800">{task.title}</h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            task.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : task.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {task.status === "confirmed"
                            ? "تأیید شده"
                            : task.status === "pending"
                            ? "در انتظار"
                            : "انجام شده"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-2 space-y-1">
                        <div className="flex items-center gap-1">
                          <FaClock className="text-green-500 text-xs" /> {task.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-green-500 text-xs" /> {task.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <FaUser className="text-green-500 text-xs" /> {task.client}
                        </div>
                      </div>
                      <button className="mt-2 w-full text-sm bg-gray-100 hover:bg-gray-200 py-1 rounded-lg transition">
                        جزئیات بیشتر
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}