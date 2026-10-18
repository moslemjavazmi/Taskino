// Share/packages/ui-kit/src/admin/pages/Dashboard.tsx
"use client";

import { motion } from "framer-motion";
import { FaUsers, FaUserTie, FaTasks, FaMoneyBillWave } from "react-icons/fa";
import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";


const statsData = [
  { title: "کاربران کل", value: "۱۲,۴۵۰", change: "+۱۲٪", icon: FaUsers, color: "from-blue-500 to-blue-600" },
  { title: "ایجنت‌ها", value: "۸۴۲", change: "+۸٪", icon: FaUserTie, color: "from-green-500 to-green-600" },
  { title: "تسک‌های فعال", value: "۱,۲۳۴", change: "+۲۳٪", icon: FaTasks, color: "from-purple-500 to-purple-600" },
  { title: "درآمد ماهانه", value: "۲۵۴M", change: "+۱۸٪", icon: FaMoneyBillWave, color: "from-yellow-500 to-yellow-600" },
];

const revenueData = [
  { name: "فروردین", revenue: 125000000 },
  { name: "اردیبهشت", revenue: 150000000 },
  { name: "خرداد", revenue: 185000000 },
  { name: "تیر", revenue: 220000000 },
  { name: "مرداد", revenue: 210000000 },
  { name: "شهریور", revenue: 245000000 },
];

const taskData = [
  { name: "تسک‌های تکمیل شده", value: 1245, color: "#10b981" },
  { name: "تسک‌های در حال انجام", value: 856, color: "#3b82f6" },
  { name: "تسک‌های لغو شده", value: 234, color: "#ef4444" },
];

const recentTasks = [
  { id: 1, tasker: "احمد محمدی", task: "تعمیر یخچال", status: "completed", amount: "۲۵۰,۰۰۰", date: "۱۴۰۳/۱۲/۰۱" },
  { id: 2, tasker: "سارا حسینی", task: "نصب کولر", status: "pending", amount: "۴۵۰,۰۰۰", date: "۱۴۰۳/۱۲/۰۱" },
  { id: 3, tasker: "رضا کریمی", task: "لوله‌کشی", status: "in_progress", amount: "۳۸۰,۰۰۰", date: "۱۴۰۳/۱۱/۳۰" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* عنوان صفحه */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">داشبورد مدیریت</h1>
        <p className="text-gray-500 mt-1">به پنل مدیریت تسک‌ربیت خوش آمدید</p>
      </div>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* نمودارها */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <ChartCard title="درآمد ماهانه"> */}
          {/* <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer> */}
        {/* </ChartCard> */}

        <ChartCard title="وضعیت تسک‌ها">
          {/* <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer> */}
          <div className="flex justify-center gap-4 mt-4">
            {taskData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* تسک‌های اخیر */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">تسک‌های اخیر</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 text-gray-600 font-medium">ایجنت</th>
                <th className="text-right py-3 text-gray-600 font-medium">نوع تسک</th>
                <th className="text-right py-3 text-gray-600 font-medium">وضعیت</th>
                <th className="text-right py-3 text-gray-600 font-medium">مبلغ</th>
                <th className="text-right py-3 text-gray-600 font-medium">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-gray-800">{task.tasker}</td>
                  <td className="py-3 text-gray-600">{task.task}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.status === "completed" ? "bg-green-100 text-green-700" :
                      task.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {task.status === "completed" ? "تکمیل شده" :
                       task.status === "pending" ? "در انتظار" : "در حال انجام"}
                    </span>
                  </td>
                  <td className="py-3 text-gray-800">{task.amount} تومان</td>
                  <td className="py-3 text-gray-500">{task.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}