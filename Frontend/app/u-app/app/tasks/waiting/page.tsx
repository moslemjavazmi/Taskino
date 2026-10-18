// frontend/user-app/src/app/tasks/waiting/page.tsx
'use client';

import { motion } from 'framer-motion';
import { FaHourglassHalf } from 'react-icons/fa';

const waitingTasks = [
  { id: '1', title: 'Fix plumbing', budget: 250000, createdAt: '2026-05-20', status: 'Waiting for assignment' },
];

export default function WaitingTasksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-6 text-white"><FaHourglassHalf className="text-amber-400" /> Waiting for Acceptance</h1>
          {waitingTasks.length === 0 ? <div className="text-center py-12 text-gray-400">No tasks waiting.</div> : waitingTasks.map(task => (
            <div key={task.id} className="border border-gray-800 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-white">{task.title}</h3>
              <p className="text-emerald-400">{task.budget.toLocaleString()} Toman</p>
              <p className="text-sm text-gray-500">Created: {task.createdAt}</p>
              <span className="inline-block mt-2 text-amber-400 text-sm">⏳ {task.status}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}