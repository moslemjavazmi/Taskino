

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch, FaEye, FaCheck, FaPlay, FaCheckCircle, FaBan } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { apiClient } from '@packages/api-client';

// Types (مشابه قبل)
type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';

interface Task {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  budget: number | null;
  status: TaskStatus;
  createdAt: string;
  scheduledAt?: string | null;
  userId: string;
  userName?: string | null;
  userPhone?: string | null;
}

// Mapping backend statuses
function mapBackendStatus(backendStatus: string): TaskStatus {
  const mapping: Record<string, TaskStatus> = {
    PENDING_APPROVAL: 'CREATED',
    APPROVED: 'ASSIGNED',
    REJECTED: 'CANCELLED',
    TASKER_ACCEPTED: 'ACCEPTED',
    READY_TO_START: 'STARTED',
    IN_PROGRESS: 'STARTED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
  };
  return mapping[backendStatus] || 'CREATED';
}

const statusLabels: Record<TaskStatus, string> = {
  CREATED: 'Created',
  ASSIGNED: 'Assigned',
  ACCEPTED: 'Accepted',
  STARTED: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const statusColors: Record<TaskStatus, string> = {
  CREATED: 'bg-gray-200 text-gray-800',
  ASSIGNED: 'bg-blue-100 text-blue-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  STARTED: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-green-500 text-white',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function TaskerTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await apiClient.get('/api/tasks');
        const mappedTasks = response.data.map((task: any) => ({
          ...task,
          status: mapBackendStatus(task.status),
          budget: task.budget ?? 0,
          description: task.description ?? '',
          location: task.location ?? '',
          userName: task.userName ?? undefined,
          userPhone: task.userPhone ?? undefined,
          scheduledAt: task.scheduledAt ?? undefined,
        }));
        setTasks(mappedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('مشکل در دریافت تسک‌ها');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'ALL' || task.status === filterStatus;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.userName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
      (task.location?.toLowerCase() ?? '').includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (e: React.MouseEvent, taskId: string, newStatus: TaskStatus) => {
    e.stopPropagation();
    // API call later
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    toast.success(`Task status changed to "${statusLabels[newStatus]}"`);
  };

  const handleCancel = async (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to cancel this task?')) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'CANCELLED' } : t))
      );
      toast.error('Task cancelled');
    }
  };

  const getAvailableActions = (status: TaskStatus) => {
    switch (status) {
      case 'ASSIGNED':
        return [{ label: 'Accept', newStatus: 'ACCEPTED', icon: FaCheck }];
      case 'ACCEPTED':
        return [{ label: 'Start', newStatus: 'STARTED', icon: FaPlay }];
      case 'STARTED':
        return [{ label: 'Complete', newStatus: 'COMPLETED', icon: FaCheckCircle }];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-2">My Tasks</h1>
          <p className="text-gray-600">Manage your assigned tasks and update their status</p>
        </motion.div>

        {/* Filters and search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-4 py-2 rounded-full transition ${
                filterStatus === 'ALL'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {(Object.keys(statusLabels) as TaskStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full transition ${
                  filterStatus === status
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by title, client, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Task cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={`/dashboard/tasks/${task.id}`}  // ✅ تغییر مسیر به درستی
                className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {task.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        statusColors[task.status]
                      }`}
                    >
                      {statusLabels[task.status]}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {task.description || 'No description'}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>💰 Budget:</span>
                      <span className="font-semibold text-gray-800">
                        {task.budget !== null && task.budget !== undefined
                          ? task.budget.toLocaleString()
                          : 'N/A'}{' '}
                        Toman
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>📍 Location:</span>
                      <span className="line-clamp-1">{task.location || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>👤 Client:</span>
                      <span>{task.userName || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>📅 Created:</span>
                      <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <span className="text-indigo-600 flex items-center gap-1 text-sm">
                      <FaEye /> Details
                    </span>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      {getAvailableActions(task.status).map((action) => (
                        <button
                          key={action.newStatus}
                          onClick={(e) => handleStatusChange(e, task.id, action.newStatus)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 transition"
                        >
                          <action.icon size={12} /> {action.label}
                        </button>
                      ))}
                      {task.status !== 'CANCELLED' && task.status !== 'COMPLETED' && (
                        <button
                          onClick={(e) => handleCancel(e, task.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 transition"
                        >
                          <FaBan size={12} /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
}