// frontend/user-app/src/app/tasks/history/page.tsx
'use client';

import { motion } from 'framer-motion';
import { FaHistory } from 'react-icons/fa';

const historyTasks = [
  { id: '1', title: 'Home Cleaning', status: 'Completed', completedAt: '2026-05-15', budget: 600000 },
  { id: '2', title: 'AC Repair', status: 'Cancelled', completedAt: '2026-05-10', budget: 350000 },
];

export default function TaskHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-6 text-white"><FaHistory className="text-emerald-400" /> Task History</h1>
          {historyTasks.map(task => (
            <div key={task.id} className="border border-gray-800 rounded-xl p-4 mb-4">
              <div className="flex justify-between"><h3 className="font-bold text-white">{task.title}</h3><span className={task.status === 'Completed' ? 'text-emerald-400' : 'text-rose-400'}>{task.status}</span></div>
              <p className="text-gray-400">{task.budget.toLocaleString()} Toman</p>
              <p className="text-sm text-gray-500">Completed: {task.completedAt}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}