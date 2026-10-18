
// frontend/app/user-app/app/tasks/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft, FaCheck, FaEdit, FaEye,
  FaMapMarkerAlt, FaDollarSign, FaUser, FaPhone, FaCalendarAlt, FaClock, FaTag, FaFileAlt,
  FaPaperPlane, FaTimes
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { apiClient } from '@packages/api-client';

// Types
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
  category?: string | null;
}

interface Offer {
  id: string;
  taskId: string;
  taskerId: string;
  price: number;
  estimatedMinutes: number;
  message: string | null;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  tasker?: {
    name?: string;
    phone?: string;
  };
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

const offerStatusLabels: Record<Offer['status'], string> = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
};

const offerStatusColors: Record<Offer['status'], string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  const [task, setTask] = useState<Task | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingOfferId, setAcceptingOfferId] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // دریافت کاربر جاری
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get('/api/user/me');
        setCurrentUserId(res.data.id);
      } catch {
        // کاربر لاگین نیست
        setCurrentUserId(null);
      }
    };
    fetchUser();
  }, []);

  // دریافت اطلاعات تسک و پیشنهادها
  const fetchTaskAndOffers = async () => {
    try {
      const [taskRes, offersRes] = await Promise.all([
        apiClient.get(`/api/tasks/${taskId}`),
        apiClient.get(`/api/tasks/${taskId}/offers`),
      ]);

      const rawTask = taskRes.data;
      const mappedTask: Task = {
        ...rawTask,
        status: mapBackendStatus(rawTask.status),
        budget: rawTask.budget ?? 0,
        description: rawTask.description ?? '',
        location: rawTask.location ?? '',
        userName: rawTask.userName ?? undefined,
        userPhone: rawTask.userPhone ?? undefined,
        scheduledAt: rawTask.scheduledAt ?? undefined,
        category: rawTask.category ?? undefined,
      };

      setTask(mappedTask);
      setOffers(offersRes.data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast.error('مشکل در دریافت اطلاعات');
      // در صورت خطا، به صفحه قبل برگرد
      router.push('/tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskAndOffers();
  }, [taskId]);

  // پذیرش پیشنهاد
  const handleAcceptOffer = async (offerId: string) => {
    setAcceptingOfferId(offerId);
    try {
      // ۱) ارسال درخواست پذیرش به بک‌اند
      await apiClient.post(`/api/offers/${offerId}/accept`);

      // ۲) به‌روزرسانی محلی پیشنهادها
      setOffers(prev =>
        prev.map(offer =>
          offer.id === offerId
            ? { ...offer, status: 'ACCEPTED' }
            : offer.status === 'PENDING'
            ? { ...offer, status: 'REJECTED' }
            : offer
        )
      );

      toast.success('پیشنهاد پذیرفته شد');

      // ۳) دریافت مجدد تسک برای به‌روزرسانی وضعیت
      const taskRes = await apiClient.get(`/api/tasks/${taskId}`);
      setTask(prev => prev ? { ...prev, status: mapBackendStatus(taskRes.data.status) } : null);
    } catch (error: any) {
      console.error('Error accepting offer:', error);
      toast.error(error.response?.data?.message || 'خطا در پذیرش پیشنهاد');
    } finally {
      setAcceptingOfferId(null);
    }
  };

  const handleEditOffer = (offerId: string) => {
    router.push(`/offers/edit/${offerId}`);
  };

  const openOfferDetails = (offer: Offer) => setSelectedOffer(offer);
  const closeOfferDetails = () => setSelectedOffer(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  if (!task) return null;

  const isOwner = currentUserId === task.userId;
  const isTasker = (offer: Offer) => currentUserId === offer.taskerId;

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
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

          {/* Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
            {task.category && (
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <FaTag className="text-green-500" />
                <span>{task.category}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
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
                      {task.budget !== null && task.budget !== undefined
                        ? `${task.budget.toLocaleString()} Toman`
                        : 'N/A'}
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

              {/* Right column */}
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
              </div>
            </div>

            {/* Offers Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <FaPaperPlane className="text-blue-500" /> Offers ({offers.length})
              </h2>

              {offers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No offers yet.</p>
              ) : (
                <div className="space-y-4">
                  {offers.map((offer) => {
                    // const canAccept = offer.status === 'PENDING' && isOwner;
                    const canAccept = true;
                    const canEdit = offer.status === 'PENDING' && isTasker(offer);

                    return (
                      <div
                        key={offer.id}
                        className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow-md transition"
                      >
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-gray-800">
                                {offer.price.toLocaleString()} Toman
                              </span>
                              <span className="text-sm text-gray-500">
                                • {offer.estimatedMinutes} min
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${offerStatusColors[offer.status]}`}
                              >
                                {offerStatusLabels[offer.status]}
                              </span>
                            </div>
                            {offer.message && (
                              <p className="text-sm text-gray-600 line-clamp-2">{offer.message}</p>
                            )}
                            <div className="text-xs text-gray-400">
                              {new Date(offer.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {/* دکمه جزئیات */}
                            <button
                              onClick={() => openOfferDetails(offer)}
                              className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                            >
                              <FaEye /> Details
                            </button>

                            {/* دکمه Accept */}
                            <button
                              onClick={() => canAccept ? handleAcceptOffer(offer.id) : toast.error('شما مجاز به قبول این پیشنهاد نیستید')}
                              disabled={!canAccept || acceptingOfferId === offer.id}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition ${
                                canAccept
                                  ? 'bg-green-500 hover:bg-green-600 text-white'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {acceptingOfferId === offer.id ? 'Accepting...' : <><FaCheck /> Accept</>}
                            </button>

                            {/* دکمه Edit */}
                            <button
                              onClick={() => canEdit ? handleEditOffer(offer.id) : toast.error('شما مجاز به ویرایش این پیشنهاد نیستید')}
                              disabled={!canEdit}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition ${
                                canEdit
                                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              <FaEdit /> Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* مودال جزئیات پیشنهاد */}
      <AnimatePresence>
        {selectedOffer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 relative"
            >
              <button
                onClick={closeOfferDetails}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold mb-4">Offer Details</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Price:</strong> {selectedOffer.price.toLocaleString()} Toman</p>
                <p><strong>Estimated Time:</strong> {selectedOffer.estimatedMinutes} minutes</p>
                <p><strong>Status:</strong> {offerStatusLabels[selectedOffer.status]}</p>
                {selectedOffer.message && (
                  <p><strong>Message:</strong> {selectedOffer.message}</p>
                )}
                <p><strong>Created At:</strong> {new Date(selectedOffer.createdAt).toLocaleString()}</p>
                {selectedOffer.tasker && (
                  <>
                    <p><strong>Tasker Name:</strong> {selectedOffer.tasker.name || '—'}</p>
                    <p><strong>Tasker Phone:</strong> {selectedOffer.tasker.phone || '—'}</p>
                  </>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeOfferDetails}
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