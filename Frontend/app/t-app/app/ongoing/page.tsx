"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaMap, FaUpload, FaCheckDouble } from "react-icons/fa";

const ongoingTask = {
  title: "تعمیر یخچال - سهروردی",
  address: "تهران، خیابان سهروردی شمالی، کوچه سوم",
  status: "در مسیر",
};

export default function OngoingTasksPage() {
  const [file, setFile] = useState<File | null>(null);
  const [deliveryProof, setDeliveryProof] = useState(false);

  const handleUpload = () => {
    if (file) setDeliveryProof(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-5">
        <h2 className="text-xl font-bold">تسک جاری: {ongoingTask.title}</h2>
        <p className="text-gray-600 mt-1">{ongoingTask.address}</p>
        <div className="mt-4 h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500"><FaMap className="text-4xl" /> (نقشه مسیر)</div>
        <div className="mt-2 text-sm text-green-600">وضعیت: {ongoingTask.status}</div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-5">
        <h3 className="font-bold flex items-center gap-2"><FaUpload /> مدرک تحویل تسک</h3>
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="mt-2" />
        <button onClick={handleUpload} className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg">آپلود و تأیید تحویل</button>
        {deliveryProof && <div className="mt-3 text-green-600 flex items-center gap-1"><FaCheckDouble /> مدارک تحویل ثبت شد. در انتظار تأیید کارفرما.</div>}
      </div>
    </motion.div>
  );
}