// // frontend/app/tasker-app/src/app/tasks/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaSearch, FaEye, FaCheck, FaPlay, FaCheckCircle, FaBan, FaTimes } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import { apiClient } from '@packages/api-client';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../lib/useAuth';
// type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
// type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   budget: number;
//   status: TaskStatus;
//   createdAt: string;
//   scheduledAt?: string;
//   userId: string;
//   userName?: string;
//   userPhone?: string;
//   category?: string;
// }

// interface TaskWithOffer extends Task {
//   offerStatus: OfferStatus | null;
//   offerId?: string;
// }

// function mapBackendStatus(backendStatus: string): TaskStatus {
//   const mapping: Record<string, TaskStatus> = {
//     PENDING_APPROVAL: 'CREATED',
//     APPROVED: 'ASSIGNED',
//     REJECTED: 'CANCELLED',
//     TASKER_ACCEPTED: 'ACCEPTED',
//     READY_TO_START: 'STARTED',
//     IN_PROGRESS: 'STARTED',
//     COMPLETED: 'COMPLETED',
//     CANCELLED: 'CANCELLED',
//   };
//   return mapping[backendStatus] || 'CREATED';
// }

// const statusLabels: Record<TaskStatus, string> = {
//   CREATED: 'Created',
//   ASSIGNED: 'Assigned',
//   ACCEPTED: 'Accepted',
//   STARTED: 'In Progress',
//   COMPLETED: 'Completed',
//   CANCELLED: 'Cancelled',
// };

// const statusColors: Record<TaskStatus, string> = {
//   CREATED: 'bg-gray-200 text-gray-800',
//   ASSIGNED: 'bg-blue-100 text-blue-800',
//   ACCEPTED: 'bg-green-100 text-green-800',
//   STARTED: 'bg-yellow-100 text-yellow-800',
//   COMPLETED: 'bg-green-500 text-white',
//   CANCELLED: 'bg-red-100 text-red-800',
// };

// const offerStatusLabels: Record<OfferStatus, string> = {
//   PENDING: 'Pending',
//   ACCEPTED: 'Accepted',
//   REJECTED: 'Rejected',
//   CANCELLED: 'Cancelled',
// };

// const offerStatusColors: Record<OfferStatus, string> = {
//   PENDING: 'bg-yellow-100 text-yellow-800',
//   ACCEPTED: 'bg-green-100 text-green-800',
//   REJECTED: 'bg-red-100 text-red-800',
//   CANCELLED: 'bg-gray-300 text-gray-600',
// };

// export default function TaskerTasksPage() {
//   const [tasks, setTasks] = useState<TaskWithOffer[]>([]);
//   const { user, isAuthenticated } = useAuth();
//   const [filterStatus, setFilterStatus] = useState<TaskStatus | 'ALL'>('ALL');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedTask, setSelectedTask] = useState<TaskWithOffer | null>(null);
//   const [loading, setLoading] = useState(true);
  
//   const router = useRouter();
// useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         // بررسی احراز هویت
//         if (!isAuthenticated || !user) {
//           toast.error('لطفاً وارد شوید');
//           // router.push('/login');
//           return;
//         }

//         // دریافت لیست تسک‌های تسکر (با استفاده از apiClient که خودکار هدرها را ارسال می‌کند)
//         const tasksRes = await apiClient.get('/api/tasks');
//         const rawTasks = tasksRes.data;
//         console.log('rawTasks from /api/tasks/my:', rawTasks);

//         // دریافت وضعیت آفر برای هر تسک
//         const tasksWithOffer = await Promise.all(
//           rawTasks.map(async (task: any) => {
//             try {
//               const offerRes = await apiClient.get(`/api/tasks/${task.id}/offers/my`);
//               return {
//                 ...task,
//                 status: mapBackendStatus(task.status),
//                 offerStatus: offerRes.data.status as OfferStatus,
//                 offerId: offerRes.data.id,
//               };
//             } catch (error: any) {
//               if (error.response?.status === 404) {
//                 return {
//                   ...task,
//                   status: mapBackendStatus(task.status),
//                   offerStatus: null,
//                   offerId: undefined,
//                 };
//               }
//               return {
//                 ...task,
//                 status: mapBackendStatus(task.status),
//                 offerStatus: null,
//                 offerId: undefined,
//               };
//             }
//           })
//         );

//         setTasks(tasksWithOffer);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//         toast.error('مشکل در دریافت لیست تسک‌ها');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [user, isAuthenticated, router]); 

//   const filteredTasks = tasks.filter(task => {
//     const matchesStatus = filterStatus === 'ALL' || task.status === filterStatus;
//     const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           task.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           task.location.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesStatus && matchesSearch;
//   });

//   const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
//     try {
//       await apiClient.patch(`/api/tasks/${taskId}/status`, { status: newStatus });
//       setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
//       toast.success(`وضعیت به "${statusLabels[newStatus]}" تغییر یافت`);
//     } catch (error) {
//       console.error('Error updating status:', error);
//       toast.error('خطا در تغییر وضعیت');
//     }
//   };

//   const handleCancel = async (taskId: string) => {
//     if (!confirm('آیا از لغو این تسک مطمئن هستید؟')) return;
//     try {
//       await apiClient.patch(`/api/tasks/${taskId}/status`, { status: 'CANCELLED' });
//       setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'CANCELLED' } : t));
//       toast.error('تسک لغو شد');
//     } catch (error) {
//       console.error('Error cancelling task:', error);
//       toast.error('خطا در لغو تسک');
//     }
//   };

//   const getAvailableActions = (task: TaskWithOffer) => {
//     const { status, offerStatus } = task;

//     if (offerStatus === null) {
//       return [{ label: 'Make Offer', action: () => router.push(`/tasks/${task.id}/offer`), icon: FaCheck }];
//     }

//     if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
//       return [];
//     }

//     switch (status) {
//       case 'ASSIGNED':
//         return [];
//       case 'ACCEPTED':
//         if (offerStatus === 'ACCEPTED') {
//           return [{ label: 'Start', action: () => handleStatusChange(task.id, 'STARTED'), icon: FaPlay }];
//         }
//         return [];
//       case 'STARTED':
//         return [{ label: 'Complete', action: () => handleStatusChange(task.id, 'COMPLETED'), icon: FaCheckCircle }];
//       default:
//         return [];
//     }
//   };

// const getShadowClass = (task: TaskWithOffer): string => {
//     const { status, offerStatus } = task;
//     if (offerStatus === 'ACCEPTED') {
//       return 'shadow-green-500/40 border-2 border-green-400';
//     } else if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
//       return 'shadow-red-500/40 border-2 border-red-400';
//     } else if (offerStatus === 'PENDING') {
//       return 'shadow-yellow-500/30 border-2 border-yellow-400';
//     }
//     if (status === 'ACCEPTED') {
//       return 'shadow-green-500/40 border-2 border-green-400';
//     } else if (status === 'CANCELLED') {
//       return 'shadow-red-500/40 border-2 border-red-400';
//     }
//     return 'shadow-lg';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-10"
//         >
//           <h1 className="text-4xl font-bold mb-2">My Tasks</h1>
//           <p className="text-gray-600">Manage your tasks and offers</p>
//         </motion.div>

//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => setFilterStatus('ALL')}
//               className={`px-4 py-2 rounded-full transition ${filterStatus === 'ALL' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
//             >
//               All
//             </button>
//             {(Object.keys(statusLabels) as TaskStatus[]).map(status => (
//               <button
//                 key={status}
//                 onClick={() => setFilterStatus(status)}
//                 className={`px-4 py-2 rounded-full transition ${filterStatus === status ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
//               >
//                 {statusLabels[status]}
//               </button>
//             ))}
//           </div>
//           <div className="relative w-full md:w-64">
//             <input
//               type="text"
//               placeholder="Search by title, client, location..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTasks.map((task, idx) => (
//             <motion.div
//               key={task.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.05 }}
//               className={`bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${getShadowClass(task)}`}
//             >
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{task.title}</h3>
//                   <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
//                     {statusLabels[task.status]}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
//                 <div className="space-y-2 text-sm text-gray-500">
//                   <div className="flex justify-between">
//                     <span>💰 Budget:</span>
//                     <span className="font-semibold text-gray-800">{task.budget.toLocaleString()} Toman</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>📍 Location:</span>
//                     <span className="line-clamp-1">{task.location}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>👤 Client:</span>
//                     <span>{task.userName || '—'}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>📅 Created:</span>
//                     <span>{new Date(task.createdAt).toLocaleDateString()}</span>
//                   </div>
//                   {task.offerStatus && (
//                     <div className="flex justify-between">
//                       <span>📋 Your Offer:</span>
//                       <span className={`text-xs px-2 py-0.5 rounded-full ${offerStatusColors[task.offerStatus]}`}>
//                         {offerStatusLabels[task.offerStatus]}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
//                   <button
//                     onClick={() => setSelectedTask(task)}
//                     className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm"
//                   >
//                     <FaEye /> Details
//                   </button>
//                   <div className="flex gap-2">
//                     {getAvailableActions(task).map(action => (
//                       <button
//                         key={action.label}
//                         onClick={action.action}
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 transition"
//                       >
//                         <action.icon size={12} /> {action.label}
//                       </button>
//                     ))}
//                     {task.status !== 'CANCELLED' && task.status !== 'COMPLETED' && (
//                       <button
//                         onClick={() => handleCancel(task.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 transition"
//                       >
//                         <FaBan size={12} /> Cancel
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filteredTasks.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500">هیچ تسکی یافت نشد.</p>
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {selectedTask && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="bg-white rounded-2xl max-w-md w-full p-6 relative"
//             >
//               <button
//                 onClick={() => setSelectedTask(null)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//               >
//                 <FaTimes />
//               </button>
//               <h2 className="text-xl font-bold mb-4">{selectedTask.title}</h2>
//               <div className="space-y-3 text-gray-700">
//                 <p><strong>Description:</strong> {selectedTask.description}</p>
//                 <p><strong>Budget:</strong> {selectedTask.budget.toLocaleString()} Toman</p>
//                 <p><strong>Location:</strong> {selectedTask.location}</p>
//                 <p><strong>Client name:</strong> {selectedTask.userName || '—'}</p>
//                 <p><strong>Client phone:</strong> {selectedTask.userPhone || '—'}</p>
//                 <p><strong>Created at:</strong> {new Date(selectedTask.createdAt).toLocaleString()}</p>
//                 {selectedTask.scheduledAt && <p><strong>Scheduled at:</strong> {new Date(selectedTask.scheduledAt).toLocaleString()}</p>}
//                 <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs ${statusColors[selectedTask.status]}`}>{statusLabels[selectedTask.status]}</span></p>
//                 {selectedTask.offerStatus && (
//                   <p><strong>Your Offer:</strong> <span className={`px-2 py-1 rounded-full text-xs ${offerStatusColors[selectedTask.offerStatus]}`}>{offerStatusLabels[selectedTask.offerStatus]}</span></p>
//                 )}
//               </div>
//               <div className="flex justify-end mt-6">
//                 <button
//                   onClick={() => setSelectedTask(null)}
//                   className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// frontend/app/tasker-app/src/app/tasks/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaEye, FaCheck, FaPlay, FaCheckCircle, FaBan, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { apiClient } from '@packages/api-client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/useAuth';
import Link from 'next/link';

type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: number | null;
  status: TaskStatus;
  createdAt: string;
  scheduledAt?: string;
  userId: string;
  userName?: string;
  userPhone?: string;
  category?: string;
}

interface TaskWithOffer extends Task {
  offerStatus: OfferStatus | null;
  offerId?: string;
}

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

const offerStatusLabels: Record<OfferStatus, string> = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
};

const offerStatusColors: Record<OfferStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-gray-300 text-gray-600',
};

export default function TaskerTasksPage() {
  const { user, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<TaskWithOffer[]>([]);
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<TaskWithOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!isAuthenticated || !user) {
          toast.error('لطفاً وارد شوید');
          // router.push('/login');
          return;
        }

        const tasksRes = await apiClient.get('/api/tasks');
        const rawTasks = tasksRes.data;

        const tasksWithOffer = await Promise.all(
          rawTasks.map(async (task: any) => {
            try {
              const offerRes = await apiClient.get(`/api/tasks/${task.id}/offers`);
              return {
                ...task,
                status: mapBackendStatus(task.status),
                offerStatus: offerRes.data.status as OfferStatus,
                offerId: offerRes.data.id,
              };
            } catch (error: any) {
              if (error.response?.status === 404) {
                return {
                  ...task,
                  status: mapBackendStatus(task.status),
                  offerStatus: null,
                  offerId: undefined,
                };
              }
              return {
                ...task,
                status: mapBackendStatus(task.status),
                offerStatus: null,
                offerId: undefined,
              };
            }
          })
        );

        setTasks(tasksWithOffer);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('مشکل در دریافت لیست تسک‌ها');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, isAuthenticated, router]);

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'ALL' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await apiClient.patch(`/api/tasks/${taskId}/status`, { status: newStatus });
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
      toast.success(`وضعیت به "${statusLabels[newStatus]}" تغییر یافت`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('خطا در تغییر وضعیت');
    }
  };

  const handleCancel = async (taskId: string) => {
    if (!confirm('آیا از لغو این تسک مطمئن هستید؟')) return;
    try {
      await apiClient.patch(`/api/tasks/${taskId}/status`, { status: 'CANCELLED' });
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'CANCELLED' } : t));
      toast.error('تسک لغو شد');
    } catch (error) {
      console.error('Error cancelling task:', error);
      toast.error('خطا در لغو تسک');
    }
  };

  const getAvailableActions = (task: TaskWithOffer) => {
    const { status, offerStatus } = task;

    if (offerStatus === null) {
      return [{ label: 'Make Offer', action: () => router.push(`/tasks/${task.id}/offer`), icon: FaCheck }];
    }

    if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
      return [];
    }

    switch (status) {
      case 'ASSIGNED':
        return [];
      case 'ACCEPTED':
        if (offerStatus === 'ACCEPTED') {
          return [{ label: 'Start', action: () => handleStatusChange(task.id, 'STARTED'), icon: FaPlay }];
        }
        return [];
      case 'STARTED':
        return [{ label: 'Complete', action: () => handleStatusChange(task.id, 'COMPLETED'), icon: FaCheckCircle }];
      default:
        return [];
    }
  };
const getShadowClass = (task: TaskWithOffer): string => {
    const { status, offerStatus } = task;
    if (offerStatus === 'ACCEPTED') {
      return 'shadow-green-500/40 border-2 border-green-400';
    } else if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
      return 'shadow-red-500/40 border-2 border-red-400';
    } else if (offerStatus === 'PENDING') {
      return 'shadow-yellow-500/30 border-2 border-yellow-400';
    }
    if (status === 'ACCEPTED') {
      return 'shadow-green-500/40 border-2 border-green-400';
    } else if (status === 'CANCELLED') {
      return 'shadow-red-500/40 border-2 border-red-400';
    }
    return 'shadow-lg';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
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
          <p className="text-gray-600">Manage your tasks and offers</p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-4 py-2 rounded-full transition ${filterStatus === 'ALL' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              All
            </button>
            {(Object.keys(statusLabels) as TaskStatus[]).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full transition ${filterStatus === status ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${getShadowClass(task)}`}
            >
                <Link
                href={`/dashboard/tasks/${task.id}`}  // ✅ تغییر مسیر به درستی
                className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{task.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
                    {statusLabels[task.status]}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>💰 Budget:</span>
                    <span className="font-semibold text-gray-800">
                      {task.budget?.toLocaleString() ?? 'N/A'} Toman
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
                  {task.offerStatus && (
                    <div className="flex justify-between">
                      <span>📋 Your Offer:</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${offerStatusColors[task.offerStatus]}`}>
                        {offerStatusLabels[task.offerStatus]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // <-- جلوگیری از هدایت به صفحه جزئیات
                      setSelectedTask(task);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm"
                  >
                    <FaEye /> Details
                  </button>
                  <div className="flex gap-2">
                    {getAvailableActions(task).map(action => (
                    <button
                        key={action.label}
                        onClick={(e) => {
                          e.stopPropagation(); // <-- جلوگیری از هدایت
                          action.action();
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 transition"
                      >
                        <action.icon size={12} /> {action.label}
                      </button>
                    ))}
                    {task.status !== 'CANCELLED' && task.status !== 'COMPLETED' && (
                    <button
                        onClick={(e) => {
                          e.stopPropagation(); // <-- جلوگیری از هدایت
                          handleCancel(task.id);
                        }}
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
            <p className="text-gray-500">هیچ تسکی یافت نشد.</p>
          </div>
        )}
      </div>

      {/* مودال جزئیات */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 relative"
            >
              <button
                onClick={() => setSelectedTask(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold mb-4">{selectedTask.title}</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Description:</strong> {selectedTask.description}</p>
                <p><strong>Budget:</strong> {selectedTask.budget?.toLocaleString() ?? 'N/A'} Toman</p>
                <p><strong>Location:</strong> {selectedTask.location || 'N/A'}</p>
                <p><strong>Client name:</strong> {selectedTask.userName || '—'}</p>
                <p><strong>Client phone:</strong> {selectedTask.userPhone || '—'}</p>
                <p><strong>Created at:</strong> {new Date(selectedTask.createdAt).toLocaleString()}</p>
                {selectedTask.scheduledAt && <p><strong>Scheduled at:</strong> {new Date(selectedTask.scheduledAt).toLocaleString()}</p>}
                <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs ${statusColors[selectedTask.status]}`}>{statusLabels[selectedTask.status]}</span></p>
                {selectedTask.offerStatus && (
                  <p><strong>Your Offer:</strong> <span className={`px-2 py-1 rounded-full text-xs ${offerStatusColors[selectedTask.offerStatus]}`}>{offerStatusLabels[selectedTask.offerStatus]}</span></p>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedTask(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}