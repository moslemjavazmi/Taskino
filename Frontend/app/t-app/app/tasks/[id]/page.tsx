
// frontend/app/tasker-app/src/app/tasks/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaArrowLeft, FaCheck, FaPlay, FaCheckCircle, FaBan,
  FaMapMarkerAlt, FaDollarSign, FaUser, FaPhone, FaCalendarAlt, FaClock, FaTag, FaFileAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { apiClient } from '@packages/api-client';
import { useAuth } from '../../../lib/useAuth';

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
  return 'shadow-2xl';
};

export default function TaskDetailPage() {
  const { user, isAuthenticated } = useAuth();
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  const [task, setTask] = useState<TaskWithOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!isAuthenticated || !user) {
          toast.error('لطفاً وارد شوید');
          return;
        }

        const taskRes = await apiClient.get(`/api/tasks/${taskId}`);
        const rawTask = taskRes.data;
        const mappedTask: Task = {
          ...rawTask,
          status: mapBackendStatus(rawTask.status),
          budget: rawTask.budget ?? null,
          description: rawTask.description ?? '',
          location: rawTask.location ?? '',
          userName: rawTask.userName ?? undefined,
          userPhone: rawTask.userPhone ?? undefined,
          scheduledAt: rawTask.scheduledAt ?? undefined,
          category: rawTask.category ?? undefined,
        };

        let offerStatus: OfferStatus | null = null;
        let offerId: string | undefined;
        try {
          const offerRes = await apiClient.get(`/api/tasks/${taskId}/offers/my`);
          offerStatus = offerRes.data.status;
          offerId = offerRes.data.id;
        } catch (error: any) {
          if (error.response?.status === 404) {
            offerStatus = null;
          } else {
            console.error('Error fetching offer:', error);
          }
        }

        setTask({
          ...mappedTask,
          offerStatus,
          offerId,
        });
      } catch (error) {
        console.error('Error fetching task:', error);
        toast.error('مشکل در دریافت اطلاعات تسک');
        router.push('/tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId, router, user, isAuthenticated]);

  // تابع شروع تسک
  const handleStart = async () => {
    if (!task) return;
    if (!confirm('آیا مطمئن هستید که می‌خواهید این تسک را شروع کنید؟')) return;
    setIsSubmitting(true);
    try {
      await apiClient.post(`/api/tasks/${taskId}/start`);
      // به‌روزرسانی وضعیت محلی
      setTask({ ...task, status: 'STARTED' });
      toast.success('تسک با موفقیت شروع شد');
    } catch (error: any) {
      console.error('Error starting task:', error);
      toast.error(error.response?.data?.message || 'خطا در شروع تسک');
    } finally {
      setIsSubmitting(false);
    }
  };

  // تابع تکمیل تسک
  const handleComplete = async () => {
    if (!task) return;
    if (!confirm('آیا مطمئن هستید که این تسک کامل شده است؟')) return;
    setIsSubmitting(true);
    try {
      await apiClient.post(`/api/tasks/${taskId}/complete`);
      setTask({ ...task, status: 'COMPLETED' });
      toast.success('تسک با موفقیت تکمیل شد');
    } catch (error: any) {
      console.error('Error completing task:', error);
      toast.error(error.response?.data?.message || 'خطا در تکمیل تسک');
    } finally {
      setIsSubmitting(false);
    }
  };

  // تابع لغو تسک
  const handleCancel = async () => {
    if (!task) return;
    if (!confirm('آیا از لغو این تسک مطمئن هستید؟')) return;
    setIsSubmitting(true);
    try {
      await apiClient.patch(`/api/tasks/${taskId}/status`, { status: 'CANCELLED' });
      setTask({ ...task, status: 'CANCELLED' });
      toast.error('تسک لغو شد');
    } catch (error: any) {
      console.error('Error cancelling task:', error);
      toast.error(error.response?.data?.message || 'خطا در لغو تسک');
    } finally {
      setIsSubmitting(false);
    }
  };

  // تعیین دکمه‌های قابل نمایش
  const availableActions = () => {
    if (!task) return [];
    const { status, offerStatus } = task;

    // اگر پیشنهادی نداده، دکمه ایجاد آفر
    if (offerStatus === null) {
      return [{ label: 'Make Offer', action: () => router.push(`/tasks/${taskId}/offer`), icon: FaCheck }];
    }

    // اگر آفر رد یا کنسل شده، هیچ اقدامی ممکن نیست
    if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
      return [];
    }

    // دکمه Start: فقط در صورتی که وضعیت تسک ACCEPTED و آفر ACCEPTED باشد
    if (status === 'ACCEPTED' && offerStatus === 'ACCEPTED') {
      return [{ label: 'Start', action: handleStart, icon: FaPlay, loading: isSubmitting }];
    }

    // دکمه Complete: فقط در صورتی که وضعیت تسک STARTED باشد
    if (status === 'STARTED') {
      return [{ label: 'Complete', action: handleComplete, icon: FaCheckCircle, loading: isSubmitting }];
    }

    // در سایر وضعیت‌ها هیچ دکمه‌ای نمایش داده نشود
    return [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  if (!task) return null;
console.log('task',task)
  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-white rounded-2xl overflow-hidden ${getShadowClass(task)}`}
        >
          <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500 px-6 flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition"
            >
              <FaArrowLeft /> Back
            </button>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
              {statusLabels[task.status]}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
            {task.category && (
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <FaTag className="text-green-500" />
                <span>{task.category}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaFileAlt className="text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-700">Description</h3>
                    <p className="text-gray-600">{task.description || 'No description'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-green-500" />
                  <div>
                    <h3 className="font-semibold text-gray-700">Location</h3>
                    <p className="text-gray-600">{task.location || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaDollarSign className="text-green-500" />
                  <div>
                    <h3 className="font-semibold text-gray-700">Budget</h3>
                    <p className="text-gray-800 font-medium">
                      {task.budget?.toLocaleString() ?? 'N/A'} Toman
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-green-500" />
                  <div>
                    <h3 className="font-semibold text-gray-700">Created</h3>
                    <p className="text-gray-600">{new Date(task.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                {task.scheduledAt && (
                  <div className="flex items-center gap-3">
                    <FaClock className="text-green-500" />
                    <div>
                      <h3 className="font-semibold text-gray-700">Scheduled</h3>
                      <p className="text-gray-600">{new Date(task.scheduledAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-gray-800 border-b pb-2">Client Information</h3>
                <div className="flex items-center gap-3">
                  <FaUser className="text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{task.userName || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{task.userPhone || '—'}</p>
                  </div>
                </div>
                {task.offerStatus && (
                  <div className="border-t pt-3 mt-2">
                    <h4 className="font-semibold text-gray-700 text-sm">Your Offer Status</h4>
                    <div className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${offerStatusColors[task.offerStatus]}`}>
                        {offerStatusLabels[task.offerStatus]}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-between items-center mt-8 pt-4 border-t border-gray-200">
              <div className="flex gap-3">
                {availableActions().map((action) => (
                  <button
                    key={action.label}
                    onClick={action.action}
                    disabled={action.loading}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
                  >
                    {action.loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <action.icon /> {action.label}
                      </>
                    )}
                  </button>
                ))}
                {task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
                  <button
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaBan /> Cancel
                      </>
                    )}
                  </button>
                )}
              </div>
              <button
                onClick={() => router.push('/tasks')}
                className="text-gray-500 hover:text-gray-700 underline text-sm"
              >
                ← Back to My Tasks
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}