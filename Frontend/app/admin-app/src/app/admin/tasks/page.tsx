// frontend/app/admin-app/src/app/admin/tasks/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';
import { FiEdit, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';

interface Task {
  id: string;
  title: string;
  description: string;
  client: {
    id: string;
    name: string;
  };
  tasker?: {
    id: string;
    name: string;
  };
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  price: number;
  createdAt: string;
  scheduledDate?: string;
}

function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Mock data – replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockTasks: Task[] = [
          {
            id: 'T1001',
            title: 'Fix Refrigerator',
            description: 'Samsung fridge not cooling',
            client: { id: 'c1', name: 'John Doe' },
            tasker: { id: 't1', name: 'Reza Karimi' },
            status: 'IN_PROGRESS',
            price: 120,
            createdAt: '2026-05-01',
            scheduledDate: '2026-05-03',
          },
          {
            id: 'T1002',
            title: 'Home Cleaning',
            description: '3 bedrooms, 2 bathrooms',
            client: { id: 'c2', name: 'Jane Smith' },
            tasker: { id: 't2', name: 'Maryam Alavi' },
            status: 'COMPLETED',
            price: 85,
            createdAt: '2026-04-28',
            scheduledDate: '2026-04-30',
          },
          {
            id: 'T1003',
            title: 'AC Installation',
            description: 'Install split AC in living room',
            client: { id: 'c3', name: 'Mike Brown' },
            status: 'PENDING',
            price: 250,
            createdAt: '2026-05-02',
            scheduledDate: '2026-05-05',
          },
          {
            id: 'T1004',
            title: 'Plumbing Leak',
            description: 'Leak under kitchen sink',
            client: { id: 'c1', name: 'John Doe' },
            tasker: { id: 't3', name: 'Alex Johnson' },
            status: 'ASSIGNED',
            price: 65,
            createdAt: '2026-05-03',
            scheduledDate: '2026-05-04',
          },
          {
            id: 'T1005',
            title: 'Electrical Wiring',
            description: 'Install new ceiling fan',
            client: { id: 'c4', name: 'Sara Lee' },
            status: 'CANCELLED',
            price: 95,
            createdAt: '2026-04-25',
            scheduledDate: '2026-04-27',
          },
        ];
        setTasks(mockTasks);
        setFilteredTasks(mockTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = tasks;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.client.name.toLowerCase().includes(term) ||
          (task.tasker?.name.toLowerCase().includes(term)) ||
          task.id.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    setFilteredTasks(filtered);
  }, [searchTerm, statusFilter, tasks]);

  const handleDelete = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const handleEdit = (taskId: string) => {
    console.log('Edit task:', taskId);
    // Navigate to edit page or open modal
  };

  const getStatusBadge = (status: Task['status']) => {
    const styles: Record<Task['status'], string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      ASSIGNED: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-purple-100 text-purple-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    const labels: Record<Task['status'], string> = {
      PENDING: 'Pending',
      ASSIGNED: 'Assigned',
      IN_PROGRESS: 'In Progress',
      COMPLETED: 'Completed',
      CANCELLED: 'Cancelled',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 md:px-8 lg:px-10" >
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            📋 Tasks Management
          </h1>
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, client, tasker, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none w-64 text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 appearance-none bg-white text-sm"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-gray-600">
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Tasker</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Created</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{task.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                    <td className="px-6 py-4">{task.client.name}</td>
                    <td className="px-6 py-4">{task.tasker?.name || '—'}</td>
                    <td className="px-6 py-4">{getStatusBadge(task.status)}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">${task.price}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(task.id)}
                          className="text-indigo-500 hover:text-indigo-700 transition"
                          title="Edit task"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Delete task"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTasks.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              No tasks found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminTasksPage, {
  roles: [UserRole.ADMIN],
  redirectTo: '/',
});