// shared/packages/ui-kit/src/admin/components/StatsCard.tsx
"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: IconType;
  color: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`bg-gradient-to-r ${color} p-3 rounded-xl`}>
          <Icon className="text-white text-xl" />
        </div>
        <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </motion.div>
  );
}