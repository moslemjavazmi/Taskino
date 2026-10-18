"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {  FaClock, FaCalendarTimes } from "react-icons/fa";

export default function SettingsPage() {
  const [bankAccount, setBankAccount] = useState("۶۰۳۷۹۹********۱۲۳۴");
  const [workHours, setWorkHours] = useState({ start: "۰۹:۰۰", end: "۱۸:۰۰" });
  const [offDays, setOffDays] = useState(["جمعه"]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6"><h3 className="font-bold flex gap-2">حساب بانکی</h3><input className="border rounded-xl p-2 w-full mt-2" value={bankAccount} onChange={e => setBankAccount(e.target.value)} /><button className="mt-3 text-green-600">ذخیره شماره کارت</button></div>
      <div className="bg-white rounded-2xl shadow-xl p-6"><h3 className="font-bold flex gap-2"><FaClock /> ساعات کاری</h3><div className="flex gap-4 mt-2"><input type="time" value={workHours.start} onChange={e => setWorkHours({...workHours, start: e.target.value})} /><span>تا</span><input type="time" value={workHours.end} onChange={e => setWorkHours({...workHours, end: e.target.value})} /></div></div>
      <div className="bg-white rounded-2xl shadow-xl p-6"><h3 className="font-bold flex gap-2"><FaCalendarTimes /> روزهای تعطیل</h3><div className="flex gap-2 mt-2">{offDays.map(day => <span key={day} className="bg-gray-100 px-3 py-1 rounded-full">{day}</span>)}<button className="text-green-600 text-sm">+ اضافه</button></div></div>
    </motion.div>
  );
}