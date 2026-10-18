"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaUser, FaPaperPlane } from "react-icons/fa";

export default function ReportsPage() {
  const [reason, setReason] = useState("");
  const [desc, setDesc] = useState("");

  const submitReport = () => alert("گزارش تخلف شما ثبت شد.");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
        <h2 className="text-2xl font-bold flex gap-2"><FaExclamationTriangle className="text-red-500" /> گزارش تخلف</h2>
        <div><label>نوع تخلف</label><select className="w-full border rounded-xl p-2 mt-1" value={reason} onChange={e => setReason(e.target.value)}><option>بدقولی در زمان</option><option>رفتار نامناسب</option><option>درخواست وجه اضافه</option></select></div>
        <div><label>توضیحات کامل</label><textarea rows={4} className="w-full border rounded-xl p-2 mt-1" value={desc} onChange={e => setDesc(e.target.value)} /></div>
        <button onClick={submitReport} className="bg-red-500 text-white w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"><FaPaperPlane /> ارسال گزارش</button>
      </div>
    </motion.div>
  );
}