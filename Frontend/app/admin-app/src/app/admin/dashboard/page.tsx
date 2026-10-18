// // 'use client';
// // import { withAuth } from '@packages/auth-store/src/withAuth';
// // import { UserRole } from '@packages/auth-store';

// // function AdminDashboard() {
// //   return <div>پنل ادمین</div>;
// // }

// // export default withAuth(AdminDashboard, { roles: [UserRole.ADMIN], redirectTo: '/' });


// // app/admin/dashboard/page.tsx
// "use client";

// import { motion } from "framer-motion";
// import {
//   FaUsers,
//   FaUserCheck,
//   FaTasks,
//   FaDollarSign,
//   FaBalanceScale,
//   FaArrowUp,
//   FaArrowDown,
// } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const chartData = [
//   { name: "دی", users: 120, tasks: 85 },
//   { name: "بهمن", users: 135, tasks: 102 },
//   { name: "اسفند", users: 148, tasks: 130 },
//   { name: "فروردین", users: 160, tasks: 155 },
//   { name: "اردیبهشت", users: 190, tasks: 178 },
//   { name: "خرداد", users: 210, tasks: 205 },
// ];

// const stats = [
//   { title: "کاربران کل", value: "۱۲,۴۵۰", change: "+۱۸%", icon: FaUsers, color: "from-blue-500 to-blue-700" },
//   { title: "تسکرهای فعال", value: "۱,۲۳۰", change: "+۵%", icon: FaUserCheck, color: "from-green-500 to-green-700" },
//   { title: "تسک‌های تکمیل شده", value: "۸,۷۲۰", change: "+۲۳%", icon: FaTasks, color: "from-purple-500 to-purple-700" },
//   { title: "درآمد کل (هزار تومان)", value: "۲۵,۴۰۰", change: "+۱۲%", icon: FaDollarSign, color: "from-yellow-500 to-yellow-700" },
//   { title: "اختلافات جاری", value: "۱۸", change: "-۲%", icon: FaBalanceScale, color: "from-red-500 to-red-700" },
// ];

// const recentUsers = [
//   { id: 1, name: "علی رضایی", role: "کاربر", status: "فعال", date: "۱۴۰۲/۱۲/۲۲" },
//   { id: 2, name: "سارا محمدی", role: "تسکر", status: "در انتظار تأیید", date: "۱۴۰۲/۱۲/۲۱" },
//   { id: 3, name: "رضا کریمی", role: "تسکر", status: "فعال", date: "۱۴۰۲/۱۲/۲۰" },
// ];

// const recentTasks = [
//   { id: 101, title: "تعمیر یخچال", status: "در حال انجام", price: "۲۸۰,۰۰۰", client: "علی رضایی" },
//   { id: 102, title: "نظافت منزل", status: "تکمیل شده", price: "۳۵۰,۰۰۰", client: "سارا محمدی" },
// ];

// export default function AdminDashboard() {
//   return (
//     <div className="space-y-8">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 text-white shadow-xl"
//       >
//         <h2 className="text-2xl font-bold">خوش آمدید، مدیر سامانه 👋</h2>
//         <p className="mt-1 opacity-90">خلاصه عملکرد پلتفرم در ۳۰ روز گذشته</p>
//       </motion.div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
//         {stats.map((stat, idx) => (
//           <motion.div
//             key={stat.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.05 }}
//             className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition`}
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm opacity-80">{stat.title}</p>
//                 <p className="text-2xl font-bold mt-1">{stat.value}</p>
//                 <p className={`text-xs mt-2 flex items-center gap-1 ${stat.change.startsWith("+") ? "text-green-200" : "text-red-200"}`}>
//                   {stat.change.startsWith("+") ? <FaArrowUp /> : <FaArrowDown />} {stat.change}
//                 </p>
//               </div>
//               <stat.icon className="text-3xl opacity-80" />
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-2xl shadow-xl p-5">
//           <h3 className="font-bold text-lg text-gray-800 mb-4">رشد کاربران و تسک‌ها</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} name="کاربران" />
//               <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} name="تسک‌ها" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-5">
//           <h3 className="font-bold text-lg text-gray-800 mb-3">کاربران جدید</h3>
//           <div className="space-y-3">
//             {recentUsers.map((user) => (
//               <div key={user.id} className="flex justify-between items-center border-b pb-2">
//                 <div>
//                   <span className="font-medium">{user.name}</span>
//                   <span className="text-xs text-gray-500 mr-2">({user.role})</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-500">{user.date}</span>
//                   <span className={`text-xs px-2 py-0.5 rounded-full ${user.status === "فعال" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
//                     {user.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-xl p-5">
//         <h3 className="font-bold text-lg text-gray-800 mb-3">تسک‌های اخیر</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-right">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3">عنوان تسک</th>
//                 <th>کارفرما</th>
//                 <th>مبلغ</th>
//                 <th>وضعیت</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {recentTasks.map((task) => (
//                 <tr key={task.id} className="hover:bg-gray-50">
//                   <td className="p-3 font-medium">{task.title}</td>
//                   <td>{task.client}</td>
//                   <td className="text-green-600 font-bold">{task.price} تومان</td>
//                   <td>
//                     <span className={`text-xs px-2 py-1 rounded-full ${task.status === "تکمیل شده" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
//                       {task.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/admin/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaTasks,
  FaDollarSign,
  FaBalanceScale,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Jan", users: 120, tasks: 85 },
  { name: "Feb", users: 135, tasks: 102 },
  { name: "Mar", users: 148, tasks: 130 },
  { name: "Apr", users: 160, tasks: 155 },
  { name: "May", users: 190, tasks: 178 },
  { name: "Jun", users: 210, tasks: 205 },
];

const stats = [
  { title: "Total Users", value: "12,450", change: "+18%", icon: FaUsers, color: "from-blue-500 to-blue-700" },
  { title: "Active Taskers", value: "1,230", change: "+5%", icon: FaUserCheck, color: "from-green-500 to-green-700" },
  { title: "Completed Tasks", value: "8,720", change: "+23%", icon: FaTasks, color: "from-purple-500 to-purple-700" },
  { title: "Revenue (k USD)", value: "25.4", change: "+12%", icon: FaDollarSign, color: "from-yellow-500 to-yellow-700" },
  { title: "Open Disputes", value: "18", change: "-2%", icon: FaBalanceScale, color: "from-red-500 to-red-700" },
];

const recentUsers = [
  { id: 1, name: "John Doe", role: "User", status: "Active", date: "2025-05-01" },
  { id: 2, name: "Jane Smith", role: "Tasker", status: "Pending", date: "2025-05-02" },
  { id: 3, name: "Mike Brown", role: "Tasker", status: "Active", date: "2025-05-03" },
];

const recentTasks = [
  { id: 101, title: "Fix Refrigerator", status: "In Progress", price: "$280", client: "John Doe" },
  { id: 102, title: "Home Cleaning", status: "Completed", price: "$350", client: "Jane Smith" },
  { id: 103, title: "AC Installation", status: "Pending", price: "$420", client: "Mike Brown" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 text-white shadow-xl"
      >
        <h2 className="text-2xl font-bold">Welcome back, Admin 👋</h2>
        <p className="mt-1 opacity-90">Here's what's happening with your platform today.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-80">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-xs mt-2 flex items-center gap-1 ${stat.change.startsWith("+") ? "text-green-200" : "text-red-200"}`}>
                  {stat.change.startsWith("+") ? <FaArrowUp /> : <FaArrowDown />} {stat.change}
                </p>
              </div>
              <stat.icon className="text-3xl opacity-80" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h3 className="font-bold text-lg text-gray-800 mb-4">User & Task Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} name="Users" />
              <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} name="Tasks" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5">
          <h3 className="font-bold text-lg text-gray-800 mb-3">Recent Users</h3>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({user.role})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{user.date}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-3">Recent Tasks</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr><th className="p-3">Task Title</th><th>Client</th><th>Price</th><th>Status</th></tr></thead>
            <tbody className="divide-y">
              {recentTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium">{task.title}</td><td>{task.client}</td><td className="text-green-600 font-bold">{task.price}</td>
                  <td><span className={`text-xs px-2 py-1 rounded-full ${task.status === "Completed" ? "bg-green-100 text-green-700" : task.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{task.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}