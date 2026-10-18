// frontend/user-app/src/app/tasks/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList, FaEye, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { apiClient } from '@packages/api-client';
import toast from 'react-hot-toast';

type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  budget?: number;
  createdAt: string;
};
const tasks = [
  { id: '1', title: 'Fix plumbing', description: 'Leaking pipe under sink', status: 'CREATED', budget: 250000, createdAt: '2026-05-20' },
  { id: '2', title: 'Clean apartment', description: '3 bedrooms, 2 bathrooms', status: 'ASSIGNED', budget: 600000, createdAt: '2026-05-19' },
];

const statusGlow: Record<TaskStatus, string> = {
  CREATED: 'border-emerald-400 text-emerald-400',
  ASSIGNED: 'border-blue-400 text-blue-400',
  ACCEPTED: 'border-purple-400 text-purple-400',
  STARTED: 'border-amber-400 text-amber-400',
  COMPLETED: 'border-gray-400 text-gray-400',
  CANCELLED: 'border-rose-400 text-rose-400',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await apiClient.get('/api/tasks/user/me');
      console.log('res ',res)

      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to load tasks');
    }
  };
  fetchTasks();
}, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FaClipboardList className="text-emerald-400" /> My Tasks
          </h1>
          <Link href="/tasks/create" className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-5 py-2.5 rounded-xl transition shadow-md shadow-emerald-500/30">
            <FaPlus /> New Task
          </Link>
          <Link
            href="/tasks/search"
            className="border border-gray-700 px-5 py-2 rounded-xl"
          >
            Search Tasks
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task, idx) => (
            <motion.div key={task.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-5 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border ${statusGlow[task.status as TaskStatus]}`}>{task.status}</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">{task.description}</p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-emerald-400 font-medium"> Toman</span>
                <span className="text-gray-500">{task.createdAt}</span>
              </div>
              <div className="mt-4 flex justify-end">
                <Link href={`/tasks/${task.id}`} className="text-gray-400 hover:text-emerald-400 transition flex items-center gap-1">Details <FaEye className="text-xs" /></Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}