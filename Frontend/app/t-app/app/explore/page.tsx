"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaClock, FaFilter } from "react-icons/fa";

const allTasks = [
  { id: 1, title: "تعمیر یخچال", location: "تهران، الهیه", budget: "۳۵۰,۰۰۰ تومان", category: "تعمیرات", date: "امروز", distance: 3 },
  { id: 2, title: "نظافت منزل", location: "تهران، ونک", budget: "۴۰۰,۰۰۰ تومان", category: "نظافت", date: "فردا", distance: 5 },
  { id: 3, title: "لوله‌بازی حمام", location: "تهران، جیحون", budget: "۲۲۰,۰۰۰ تومان", category: "لوله‌کشی", date: "امروز", distance: 2 },
];

export default function ExploreTasksPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = allTasks.filter(t => t.title.includes(search) && (category ? t.category === category : true));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-3 mb-6">
        <div className="flex-1 relative"><FaSearch className="absolute right-3 top-3 text-gray-400" /><input className="w-full border rounded-xl p-2 pr-10" placeholder="جستجوی تسک" value={search} onChange={e => setSearch(e.target.value)} /></div>
        <select className="border rounded-xl p-2" value={category} onChange={e => setCategory(e.target.value)}><option value="">همه دسته‌ها</option><option>تعمیرات</option><option>نظافت</option><option>لوله‌کشی</option></select>
        <button className="bg-green-500 text-white px-4 rounded-xl"><FaFilter /> فیلتر</button>
      </div>

      <div className="space-y-4">
        {filtered.map(task => (
          <div key={task.id} className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center flex-wrap gap-3">
            <div><h3 className="font-bold text-lg">{task.title}</h3><div className="flex gap-3 text-sm text-gray-500 mt-1"><span><FaMapMarkerAlt className="inline ml-1" />{task.location}</span><span><FaClock className="inline ml-1" />{task.date}</span></div></div>
            <div><span className="text-green-600 font-bold text-xl">{task.budget}</span><p className="text-gray-400 text-xs">فاصله {task.distance} کیلومتر</p></div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">مشاهده و پیشنهاد</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}