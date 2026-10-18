
// // // // // // frontend/app/tasker-app/src/app/tasks/[id]/page.tsx

// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import { motion } from 'framer-motion';
// // // // // import {
// // // // //   FaArrowLeft, FaCheck, FaPlay, FaCheckCircle, FaBan,
// // // // //   FaMapMarkerAlt, FaDollarSign, FaUser, FaPhone, FaCalendarAlt, FaClock, FaTag, FaFileAlt
// // // // // } from 'react-icons/fa';
// // // // // import toast from 'react-hot-toast';
// // // // // import { apiClient } from '@packages/api-client';

// // // // // type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
// // // // // type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

// // // // // interface Task {
// // // // //   id: string;
// // // // //   title: string;
// // // // //   description: string;
// // // // //   location: string;
// // // // //   budget: number | null;
// // // // //   status: TaskStatus;
// // // // //   createdAt: string;
// // // // //   scheduledAt?: string;
// // // // //   userId: string;
// // // // //   userName?: string;
// // // // //   userPhone?: string;
// // // // //   category?: string;
// // // // // }

// // // // // interface TaskWithOffer extends Task {
// // // // //   offerStatus: OfferStatus | null;
// // // // //   offerId?: string;
// // // // // }

// // // // // function mapBackendStatus(backendStatus: string): TaskStatus {
// // // // //   const mapping: Record<string, TaskStatus> = {
// // // // //     PENDING_APPROVAL: 'CREATED',
// // // // //     APPROVED: 'ASSIGNED',
// // // // //     REJECTED: 'CANCELLED',
// // // // //     TASKER_ACCEPTED: 'ACCEPTED',
// // // // //     READY_TO_START: 'STARTED',
// // // // //     IN_PROGRESS: 'STARTED',
// // // // //     COMPLETED: 'COMPLETED',
// // // // //     CANCELLED: 'CANCELLED',
// // // // //     // اضافه کردن وضعیت‌های جدید
// // // // //     CUSTOMER_SELECTED: 'ACCEPTED',
// // // // //     OFFERING: 'ASSIGNED',
// // // // //   };
// // // // //   const mapped = mapping[backendStatus] || 'CREATED';
// // // // //   console.log(`🔄 Mapping backend status "${backendStatus}" -> "${mapped}"`);
// // // // //   return mapped;
// // // // // }

// // // // // const statusLabels: Record<TaskStatus, string> = {
// // // // //   CREATED: 'Created',
// // // // //   ASSIGNED: 'Assigned',
// // // // //   ACCEPTED: 'Accepted',
// // // // //   STARTED: 'In Progress',
// // // // //   COMPLETED: 'Completed',
// // // // //   CANCELLED: 'Cancelled',
// // // // // };

// // // // // const statusColors: Record<TaskStatus, string> = {
// // // // //   CREATED: 'bg-gray-200 text-gray-800',
// // // // //   ASSIGNED: 'bg-blue-100 text-blue-800',
// // // // //   ACCEPTED: 'bg-green-100 text-green-800',
// // // // //   STARTED: 'bg-yellow-100 text-yellow-800',
// // // // //   COMPLETED: 'bg-green-500 text-white',
// // // // //   CANCELLED: 'bg-red-100 text-red-800',
// // // // // };

// // // // // const offerStatusLabels: Record<OfferStatus, string> = {
// // // // //   PENDING: 'Pending',
// // // // //   ACCEPTED: 'Accepted',
// // // // //   REJECTED: 'Rejected',
// // // // //   CANCELLED: 'Cancelled',
// // // // // };

// // // // // const offerStatusColors: Record<OfferStatus, string> = {
// // // // //   PENDING: 'bg-yellow-100 text-yellow-800',
// // // // //   ACCEPTED: 'bg-green-100 text-green-800',
// // // // //   REJECTED: 'bg-red-100 text-red-800',
// // // // //   CANCELLED: 'bg-gray-300 text-gray-600',
// // // // // };

// // // // // const getShadowClass = (task: TaskWithOffer): string => {
// // // // //   const { status, offerStatus } = task;
  
// // // // //   if (offerStatus === 'ACCEPTED') {
// // // // //     return 'shadow-green-500/40 border-2 border-green-400';
// // // // //   } else if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
// // // // //     return 'shadow-red-500/40 border-2 border-red-400';
// // // // //   } else if (offerStatus === 'PENDING') {
// // // // //     return 'shadow-yellow-500/30 border-2 border-yellow-400';
// // // // //   }
  
// // // // //   if (status === 'ACCEPTED') {
// // // // //     return 'shadow-green-500/40 border-2 border-green-400';
// // // // //   } else if (status === 'CANCELLED') {
// // // // //     return 'shadow-red-500/40 border-2 border-red-400';
// // // // //   }
// // // // //   return 'shadow-2xl';
// // // // // };

// // // // // export default function TaskDetailPage() {
// // // // //   const params = useParams();
// // // // //   const router = useRouter();
// // // // //   const taskId = params.id as string;
// // // // //   const [task, setTask] = useState<TaskWithOffer | null>(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const fetchTask = async () => {
// // // // //       try {
// // // // //         // ۱) دریافت اطلاعات تسک از تسک سرویس
// // // // //         const taskRes = await apiClient.get(`/api/tasks/${taskId}`);
// // // // //         const rawTask = taskRes.data;
// // // // //         console.log('📦 Raw task from backend:', rawTask);
// // // // //         console.log('📌 Raw task.status:', rawTask.status);
        
// // // // //         const mappedStatus = mapBackendStatus(rawTask.status);
// // // // //         console.log('✅ Mapped status:', mappedStatus);
        
// // // // //         const mappedTask: Task = {
// // // // //           ...rawTask,
// // // // //           status: mappedStatus,
// // // // //           budget: rawTask.budget ?? null,
// // // // //           description: rawTask.description ?? '',
// // // // //           location: rawTask.location ?? '',
// // // // //           userName: rawTask.userName ?? undefined,
// // // // //           userPhone: rawTask.userPhone ?? undefined,
// // // // //           scheduledAt: rawTask.scheduledAt ?? undefined,
// // // // //           category: rawTask.category ?? undefined,
// // // // //         };

// // // // //         // ۲) دریافت وضعیت آفر تسکر برای این تسک
// // // // //         let offerStatus: OfferStatus | null = null;
// // // // //         let offerId: string | undefined;
// // // // //         try {
// // // // //           const offerRes = await apiClient.get(`/api/tasks/${taskId}/offers/my`);
// // // // //           console.log('📦 Offer response:', offerRes.data);
// // // // //           offerStatus = offerRes.data.status;
// // // // //           offerId = offerRes.data.id;
// // // // //         } catch (error: any) {
// // // // //           if (error.response?.status === 404) {
// // // // //             console.log('ℹ️ No offer found for this tasker');
// // // // //             offerStatus = null;
// // // // //           } else {
// // // // //             console.error('❌ Error fetching offer:', error);
// // // // //           }
// // // // //         }

// // // // //         setTask({
// // // // //           ...mappedTask,
// // // // //           offerStatus,
// // // // //           offerId,
// // // // //         });
// // // // //       } catch (error) {
// // // // //         console.error('❌ Error fetching task:', error);
// // // // //         toast.error('مشکل در دریافت اطلاعات تسک');
// // // // //         router.push('/tasks');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchTask();
// // // // //   }, [taskId, router]);

// // // // //   const handleStart = async () => {
// // // // //     if (!task) return;
// // // // //     if (!confirm('آیا مطمئن هستید که می‌خواهید این تسک را شروع کنید؟')) return;
// // // // //     setIsSubmitting(true);
// // // // //     try {
// // // // //       await apiClient.post(`/api/tasks/${taskId}/start`);
// // // // //       setTask({ ...task, status: 'STARTED' });
// // // // //       toast.success('تسک با موفقیت شروع شد');
// // // // //     } catch (error: any) {
// // // // //       console.error('❌ Error starting task:', error);
// // // // //       toast.error(error.response?.data?.message || 'خطا در شروع تسک');
// // // // //     } finally {
// // // // //       setIsSubmitting(false);
// // // // //     }
// // // // //   };

// // // // //   const handleComplete = async () => {
// // // // //     if (!task) return;
// // // // //     if (!confirm('آیا مطمئن هستید که این تسک کامل شده است؟')) return;
// // // // //     setIsSubmitting(true);
// // // // //     try {
// // // // //       await apiClient.post(`/api/tasks/${taskId}/complete`);
// // // // //       setTask({ ...task, status: 'COMPLETED' });
// // // // //       toast.success('تسک با موفقیت تکمیل شد');
// // // // //     } catch (error: any) {
// // // // //       console.error('❌ Error completing task:', error);
// // // // //       toast.error(error.response?.data?.message || 'خطا در تکمیل تسک');
// // // // //     } finally {
// // // // //       setIsSubmitting(false);
// // // // //     }
// // // // //   };

// // // // //   const handleCancel = async () => {
// // // // //     if (!task) return;
// // // // //     if (!confirm('آیا از لغو این تسک مطمئن هستید؟')) return;
// // // // //     setIsSubmitting(true);
// // // // //     try {
// // // // //       await apiClient.patch(`/api/tasks/${taskId}/status`, { status: 'CANCELLED' });
// // // // //       setTask({ ...task, status: 'CANCELLED' });
// // // // //       toast.error('تسک لغو شد');
// // // // //     } catch (error: any) {
// // // // //       console.error('❌ Error cancelling task:', error);
// // // // //       toast.error(error.response?.data?.message || 'خطا در لغو تسک');
// // // // //     } finally {
// // // // //       setIsSubmitting(false);
// // // // //     }
// // // // //   };

// // // // //   const availableActions = () => {
// // // // //     if (!task) return [];
// // // // //     const { status, offerStatus } = task;

// // // // //     if (offerStatus === null) {
// // // // //       return [{ label: 'Make Offer', action: () => router.push(`/tasks/${taskId}/offer`), icon: FaCheck }];
// // // // //     }

// // // // //     if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
// // // // //       return [];
// // // // //     }

// // // // //     // شرط نمایش دکمه Start: وضعیت تسک ACCEPTED و آفر ACCEPTED
// // // // //     if (status === 'ACCEPTED' && offerStatus === 'ACCEPTED') {
// // // // //       return [{ label: 'Start', action: handleStart, icon: FaPlay, loading: isSubmitting }];
// // // // //     }

// // // // //     if (status === 'STARTED') {
// // // // //       return [{ label: 'Complete', action: handleComplete, icon: FaCheckCircle, loading: isSubmitting }];
// // // // //     }

// // // // //     return [];
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
// // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!task) return null;

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
// // // // //       <div className="max-w-4xl mx-auto">
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, y: 30 }}
// // // // //           animate={{ opacity: 1, y: 0 }}
// // // // //           transition={{ duration: 0.5 }}
// // // // //           className={`bg-white rounded-2xl overflow-hidden ${getShadowClass(task)}`}
// // // // //         >
// // // // //           <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500 px-6 flex justify-between items-center">
// // // // //             <button
// // // // //               onClick={() => router.back()}
// // // // //               className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition"
// // // // //             >
// // // // //               <FaArrowLeft /> Back
// // // // //             </button>
// // // // //             <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
// // // // //               {statusLabels[task.status]}
// // // // //             </div>
// // // // //           </div>

// // // // //           <div className="p-6 md:p-8">
// // // // //             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
// // // // //             {task.category && (
// // // // //               <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
// // // // //                 <FaTag className="text-green-500" />
// // // // //                 <span>{task.category}</span>
// // // // //               </div>
// // // // //             )}

// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //               <div className="space-y-4">
// // // // //                 <div className="flex items-start gap-3">
// // // // //                   <FaFileAlt className="text-green-500 mt-1" />
// // // // //                   <div>
// // // // //                     <h3 className="font-semibold text-gray-700">Description</h3>
// // // // //                     <p className="text-gray-600">{task.description || 'No description'}</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <FaMapMarkerAlt className="text-green-500" />
// // // // //                   <div>
// // // // //                     <h3 className="font-semibold text-gray-700">Location</h3>
// // // // //                     <p className="text-gray-600">{task.location || 'N/A'}</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <FaDollarSign className="text-green-500" />
// // // // //                   <div>
// // // // //                     <h3 className="font-semibold text-gray-700">Budget</h3>
// // // // //                     <p className="text-gray-800 font-medium">
// // // // //                       {task.budget?.toLocaleString() ?? 'N/A'} Toman
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <FaCalendarAlt className="text-green-500" />
// // // // //                   <div>
// // // // //                     <h3 className="font-semibold text-gray-700">Created</h3>
// // // // //                     <p className="text-gray-600">{new Date(task.createdAt).toLocaleString()}</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 {task.scheduledAt && (
// // // // //                   <div className="flex items-center gap-3">
// // // // //                     <FaClock className="text-green-500" />
// // // // //                     <div>
// // // // //                       <h3 className="font-semibold text-gray-700">Scheduled</h3>
// // // // //                       <p className="text-gray-600">{new Date(task.scheduledAt).toLocaleString()}</p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div className="bg-gray-50 rounded-xl p-4 space-y-3">
// // // // //                 <h3 className="font-bold text-gray-800 border-b pb-2">Client Information</h3>
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <FaUser className="text-green-500" />
// // // // //                   <div>
// // // // //                     <p className="text-sm text-gray-500">Name</p>
// // // // //                     <p className="font-medium">{task.userName || '—'}</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <FaPhone className="text-green-500" />
// // // // //                   <div>
// // // // //                     <p className="text-sm text-gray-500">Phone</p>
// // // // //                     <p className="font-medium">{task.userPhone || '—'}</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 {task.offerStatus && (
// // // // //                   <div className="border-t pt-3 mt-2">
// // // // //                     <h4 className="font-semibold text-gray-700 text-sm">Your Offer Status</h4>
// // // // //                     <div className="mt-1">
// // // // //                       <span className={`px-2 py-1 rounded-full text-xs ${offerStatusColors[task.offerStatus]}`}>
// // // // //                         {offerStatusLabels[task.offerStatus]}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="flex flex-wrap gap-3 justify-between items-center mt-8 pt-4 border-t border-gray-200">
// // // // //               <div className="flex gap-3">
// // // // //                 {availableActions().map((action) => (
// // // // //                   <button
// // // // //                     key={action.label}
// // // // //                     onClick={action.action}
// // // // //                     disabled={action.loading}
// // // // //                     className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
// // // // //                   >
// // // // //                     {action.loading ? (
// // // // //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // // // //                     ) : (
// // // // //                       <>
// // // // //                         <action.icon /> {action.label}
// // // // //                       </>
// // // // //                     )}
// // // // //                   </button>
// // // // //                 ))}
// // // // //                 {task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
// // // // //                   <button
// // // // //                     onClick={handleCancel}
// // // // //                     disabled={isSubmitting}
// // // // //                     className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
// // // // //                   >
// // // // //                     {isSubmitting ? (
// // // // //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // // // //                     ) : (
// // // // //                       <>
// // // // //                         <FaBan /> Cancel
// // // // //                       </>
// // // // //                     )}
// // // // //                   </button>
// // // // //                 )}
// // // // //               </div>
// // // // //               <button
// // // // //                 onClick={() => router.push('/tasks')}
// // // // //                 className="text-gray-500 hover:text-gray-700 underline text-sm"
// // // // //               >
// // // // //                 ← Back to My Tasks
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </motion.div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // frontend/app/tasker-app/src/app/tasks/[id]/page.tsx

// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import { motion } from 'framer-motion';
// // // // import {
// // // //   FaArrowLeft, FaCheck, FaPlay, FaCheckCircle, FaBan,
// // // //   FaMapMarkerAlt, FaDollarSign, FaUser, FaPhone, FaCalendarAlt, FaClock, FaTag, FaFileAlt
// // // // } from 'react-icons/fa';
// // // // import toast from 'react-hot-toast';
// // // // import { apiClient } from '@packages/api-client';

// // // // type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
// // // // type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

// // // // interface Task {
// // // //   id: string;
// // // //   title: string;
// // // //   description: string;
// // // //   location: string;
// // // //   budget: number | null;
// // // //   status: TaskStatus;
// // // //   createdAt: string;
// // // //   scheduledAt?: string;
// // // //   userId: string;
// // // //   userName?: string;
// // // //   userPhone?: string;
// // // //   category?: string;
// // // // }

// // // // interface TaskWithOffer extends Task {
// // // //   offerStatus: OfferStatus | null;
// // // //   offerId?: string;
// // // // }

// // // // function mapBackendStatus(backendStatus: string): TaskStatus {
// // // //   const mapping: Record<string, TaskStatus> = {
// // // //     PENDING_APPROVAL: 'CREATED',
// // // //     APPROVED: 'ASSIGNED',
// // // //     REJECTED: 'CANCELLED',
// // // //     TASKER_ACCEPTED: 'ACCEPTED',
// // // //     READY_TO_START: 'STARTED',
// // // //     IN_PROGRESS: 'STARTED',
// // // //     COMPLETED: 'COMPLETED',
// // // //     CANCELLED: 'CANCELLED',
// // // //     CUSTOMER_SELECTED: 'ACCEPTED',
// // // //     OFFERING: 'ASSIGNED',
// // // //   };
// // // //   const mapped = mapping[backendStatus] || 'CREATED';
// // // //   console.log(`🔄 Mapping backend status "${backendStatus}" -> "${mapped}"`);
// // // //   return mapped;
// // // // }

// // // // const statusLabels: Record<TaskStatus, string> = {
// // // //   CREATED: 'Created',
// // // //   ASSIGNED: 'Assigned',
// // // //   ACCEPTED: 'Accepted',
// // // //   STARTED: 'In Progress',
// // // //   COMPLETED: 'Completed',
// // // //   CANCELLED: 'Cancelled',
// // // // };

// // // // const statusColors: Record<TaskStatus, string> = {
// // // //   CREATED: 'bg-gray-200 text-gray-800',
// // // //   ASSIGNED: 'bg-blue-100 text-blue-800',
// // // //   ACCEPTED: 'bg-green-100 text-green-800',
// // // //   STARTED: 'bg-yellow-100 text-yellow-800',
// // // //   COMPLETED: 'bg-green-500 text-white',
// // // //   CANCELLED: 'bg-red-100 text-red-800',
// // // // };

// // // // const offerStatusLabels: Record<OfferStatus, string> = {
// // // //   PENDING: 'Pending',
// // // //   ACCEPTED: 'Accepted',
// // // //   REJECTED: 'Rejected',
// // // //   CANCELLED: 'Cancelled',
// // // // };

// // // // const offerStatusColors: Record<OfferStatus, string> = {
// // // //   PENDING: 'bg-yellow-100 text-yellow-800',
// // // //   ACCEPTED: 'bg-green-100 text-green-800',
// // // //   REJECTED: 'bg-red-100 text-red-800',
// // // //   CANCELLED: 'bg-gray-300 text-gray-600',
// // // // };

// // // // const getShadowClass = (task: TaskWithOffer): string => {
// // // //   const { status, offerStatus } = task;
  
// // // //   if (offerStatus === 'ACCEPTED') {
// // // //     return 'shadow-green-500/40 border-2 border-green-400';
// // // //   } else if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
// // // //     return 'shadow-red-500/40 border-2 border-red-400';
// // // //   } else if (offerStatus === 'PENDING') {
// // // //     return 'shadow-yellow-500/30 border-2 border-yellow-400';
// // // //   }
  
// // // //   if (status === 'ACCEPTED') {
// // // //     return 'shadow-green-500/40 border-2 border-green-400';
// // // //   } else if (status === 'CANCELLED') {
// // // //     return 'shadow-red-500/40 border-2 border-red-400';
// // // //   }
// // // //   return 'shadow-2xl';
// // // // };

// // // // // کامپوننت نمایش تایمر زنده
// // // // const LiveTimer = ({ isRunning, onComplete }: { isRunning: boolean; onComplete: () => void }) => {
// // // //   const [seconds, setSeconds] = useState(0);
// // // //   const [isActive, setIsActive] = useState(isRunning);

// // // //   useEffect(() => {
// // // //     let interval: NodeJS.Timeout | null = null;
// // // //     if (isActive) {
// // // //       interval = setInterval(() => {
// // // //         setSeconds((prev) => prev + 1);
// // // //       }, 1000);
// // // //     } else if (!isActive && seconds !== 0) {
// // // //       clearInterval(interval!);
// // // //     }
// // // //     return () => clearInterval(interval!);
// // // //   }, [isActive, seconds]);

// // // //   useEffect(() => {
// // // //     setIsActive(isRunning);
// // // //   }, [isRunning]);

// // // //   // وقتی تایمر به 0 برگردد (تسک کامل شود)
// // // //   useEffect(() => {
// // // //     if (!isActive && seconds > 0) {
// // // //       // وقتی تایمر متوقف می‌شود، زمان نهایی را به parent گزارش می‌دهیم
// // // //       onComplete();
// // // //     }
// // // //   }, [isActive, seconds, onComplete]);

// // // //   const formatTime = (totalSeconds: number) => {
// // // //     const hrs = Math.floor(totalSeconds / 3600);
// // // //     const mins = Math.floor((totalSeconds % 3600) / 60);
// // // //     const secs = totalSeconds % 60;
// // // //     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// // // //   };

// // // //   return (
// // // //     <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
// // // //       <FaClock className="text-green-500 text-lg" />
// // // //       <span className="text-2xl font-mono font-bold text-gray-700">{formatTime(seconds)}</span>
// // // //       {isActive && <span className="text-sm text-green-600 font-medium">⏳ In Progress</span>}
// // // //       {!isActive && seconds > 0 && <span className="text-sm text-gray-500">⏱️ Completed</span>}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default function TaskDetailPage() {
// // // //   const params = useParams();
// // // //   const router = useRouter();
// // // //   const taskId = params.id as string;
// // // //   const [task, setTask] = useState<TaskWithOffer | null>(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // //   const [timerRunning, setTimerRunning] = useState(false);

// // // //   useEffect(() => {
// // // //     const fetchTask = async () => {
// // // //       try {
// // // //         // ۱) دریافت اطلاعات تسک از تسک سرویس
// // // //         const taskRes = await apiClient.get(`/api/tasks/${taskId}`);
// // // //         const rawTask = taskRes.data;
// // // //         console.log('📦 Raw task from backend:', rawTask);
// // // //         console.log('📌 Raw task.status:', rawTask.status);
        
// // // //         const mappedStatus = mapBackendStatus(rawTask.status);
// // // //         console.log('✅ Mapped status:', mappedStatus);
        
// // // //         const mappedTask: Task = {
// // // //           ...rawTask,
// // // //           status: mappedStatus,
// // // //           budget: rawTask.budget ?? null,
// // // //           description: rawTask.description ?? '',
// // // //           location: rawTask.location ?? '',
// // // //           userName: rawTask.userName ?? undefined,
// // // //           userPhone: rawTask.userPhone ?? undefined,
// // // //           scheduledAt: rawTask.scheduledAt ?? undefined,
// // // //           category: rawTask.category ?? undefined,
// // // //         };

// // // //         // ۲) دریافت وضعیت آفر تسکر برای این تسک
// // // //         let offerStatus: OfferStatus | null = null;
// // // //         let offerId: string | undefined;
// // // //         try {
// // // //           const offerRes = await apiClient.get(`/api/tasks/${taskId}/offers/my`);
// // // //           console.log('📦 Offer response:', offerRes.data);
// // // //           offerStatus = offerRes.data.status;
// // // //           offerId = offerRes.data.id;
// // // //         } catch (error: any) {
// // // //           if (error.response?.status === 404) {
// // // //             console.log('ℹ️ No offer found for this tasker');
// // // //             offerStatus = null;
// // // //           } else {
// // // //             console.error('❌ Error fetching offer:', error);
// // // //           }
// // // //         }

// // // //         setTask({
// // // //           ...mappedTask,
// // // //           offerStatus,
// // // //           offerId,
// // // //         });

// // // //         // اگر وضعیت تسک STARTED باشد، تایمر را فعال کن
// // // //         if (mappedStatus === 'STARTED') {
// // // //           setTimerRunning(true);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('❌ Error fetching task:', error);
// // // //         toast.error('مشکل در دریافت اطلاعات تسک');
// // // //         router.push('/tasks');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchTask();
// // // //   }, [taskId, router]);

// // // //   // تابع شروع تسک
// // // //   const handleStart = async () => {
// // // //     if (!task) return;
// // // //     if (!confirm('آیا مطمئن هستید که می‌خواهید این تسک را شروع کنید؟')) return;
// // // //     setIsSubmitting(true);
// // // //     try {
// // // //       await apiClient.post(`/api/tasks/${taskId}/start`);
// // // //       setTask({ ...task, status: 'STARTED' });
// // // //       setTimerRunning(true);
// // // //       toast.success('تسک با موفقیت شروع شد');
// // // //     } catch (error: any) {
// // // //       console.error('❌ Error starting task:', error);
// // // //       toast.error(error.response?.data?.message || 'خطا در شروع تسک');
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };

// // // //   // تابع تکمیل تسک
// // // //   const handleComplete = async () => {
// // // //     if (!task) return;
// // // //     if (!confirm('آیا مطمئن هستید که این تسک کامل شده است؟')) return;
// // // //     setIsSubmitting(true);
// // // //     try {
// // // //       await apiClient.post(`/api/tasks/${taskId}/complete`);
// // // //       setTask({ ...task, status: 'COMPLETED' });
// // // //       setTimerRunning(false);
// // // //       toast.success('تسک با موفقیت تکمیل شد');
// // // //     } catch (error: any) {
// // // //       console.error('❌ Error completing task:', error);
// // // //       toast.error(error.response?.data?.message || 'خطا در تکمیل تسک');
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };

// // // //   const handleCancel = async () => {
// // // //     if (!task) return;
// // // //     if (!confirm('آیا از لغو این تسک مطمئن هستید؟')) return;
// // // //     setIsSubmitting(true);
// // // //     try {
// // // //       await apiClient.patch(`/api/tasks/${taskId}/status`, { status: 'CANCELLED' });
// // // //       setTask({ ...task, status: 'CANCELLED' });
// // // //       setTimerRunning(false);
// // // //       toast.error('تسک لغو شد');
// // // //     } catch (error: any) {
// // // //       console.error('❌ Error cancelling task:', error);
// // // //       toast.error(error.response?.data?.message || 'خطا در لغو تسک');
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };

// // // //   const availableActions = () => {
// // // //     if (!task) return [];
// // // //     const { status, offerStatus } = task;
// // // // console.log('task',task)
// // // // console.log('offerStatus',offerStatus)
// // // //     if (offerStatus === null) {
// // // //       return [{ label: 'Make Offer', action: () => router.push(`/tasks/${taskId}/offer`), icon: FaCheck }];
// // // //     }

// // // //     if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
// // // //       return [];
// // // //     }

// // // //     // شرط نمایش دکمه Start: وضعیت تسک ACCEPTED (که از CUSTOMER_SELECTED نگاشت شده) و آفر ACCEPTED
// // // //     if (status === 'ACCEPTED' && offerStatus === 'ACCEPTED') {
// // // //       return [{ label: 'Start', action: handleStart, icon: FaPlay, loading: isSubmitting }];
// // // //     }

// // // //     if (status === 'STARTED') {
// // // //       return [{ label: 'Complete', action: handleComplete, icon: FaCheckCircle, loading: isSubmitting }];
// // // //     }

// // // //     return [];
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!task) return null;

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
// // // //       <div className="max-w-4xl mx-auto">
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: 30 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.5 }}
// // // //           className={`bg-white rounded-2xl overflow-hidden ${getShadowClass(task)}`}
// // // //         >
// // // //           <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500 px-6 flex justify-between items-center">
// // // //             <button
// // // //               onClick={() => router.back()}
// // // //               className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition"
// // // //             >
// // // //               <FaArrowLeft /> Back
// // // //             </button>
// // // //             <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
// // // //               {statusLabels[task.status]}
// // // //             </div>
// // // //           </div>

// // // //           <div className="p-6 md:p-8">
// // // //             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
// // // //             {task.category && (
// // // //               <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
// // // //                 <FaTag className="text-green-500" />
// // // //                 <span>{task.category}</span>
// // // //               </div>
// // // //             )}

// // // //             {/* نمایش تایمر زنده - در سمت راست هدر اطلاعات */}
// // // //             <div className="flex flex-wrap justify-between items-center mb-6">
// // // //               <div className="flex-1" />
// // // //               <div className="flex items-center gap-4">
// // // //                 {task.status === 'STARTED' || task.status === 'ACCEPTED' ? (
// // // //                   <LiveTimer 
// // // //                     isRunning={timerRunning} 
// // // //                     onComplete={() => console.log('Timer completed')} 
// // // //                   />
// // // //                 ) : null}
// // // //               </div>
// // // //             </div>

// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //               <div className="space-y-4">
// // // //                 <div className="flex items-start gap-3">
// // // //                   <FaFileAlt className="text-green-500 mt-1" />
// // // //                   <div>
// // // //                     <h3 className="font-semibold text-gray-700">Description</h3>
// // // //                     <p className="text-gray-600">{task.description || 'No description'}</p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-3">
// // // //                   <FaMapMarkerAlt className="text-green-500" />
// // // //                   <div>
// // // //                     <h3 className="font-semibold text-gray-700">Location</h3>
// // // //                     <p className="text-gray-600">{task.location || 'N/A'}</p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-3">
// // // //                   <FaDollarSign className="text-green-500" />
// // // //                   <div>
// // // //                     <h3 className="font-semibold text-gray-700">Budget</h3>
// // // //                     <p className="text-gray-800 font-medium">
// // // //                       {task.budget?.toLocaleString() ?? 'N/A'} Toman
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-3">
// // // //                   <FaCalendarAlt className="text-green-500" />
// // // //                   <div>
// // // //                     <h3 className="font-semibold text-gray-700">Created</h3>
// // // //                     <p className="text-gray-600">{new Date(task.createdAt).toLocaleString()}</p>
// // // //                   </div>
// // // //                 </div>
// // // //                 {task.scheduledAt && (
// // // //                   <div className="flex items-center gap-3">
// // // //                     <FaClock className="text-green-500" />
// // // //                     <div>
// // // //                       <h3 className="font-semibold text-gray-700">Scheduled</h3>
// // // //                       <p className="text-gray-600">{new Date(task.scheduledAt).toLocaleString()}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               <div className="bg-gray-50 rounded-xl p-4 space-y-3">
// // // //                 <h3 className="font-bold text-gray-800 border-b pb-2">Client Information</h3>
// // // //                 <div className="flex items-center gap-3">
// // // //                   <FaUser className="text-green-500" />
// // // //                   <div>
// // // //                     <p className="text-sm text-gray-500">Name</p>
// // // //                     <p className="font-medium">{task.userName || '—'}</p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center gap-3">
// // // //                   <FaPhone className="text-green-500" />
// // // //                   <div>
// // // //                     <p className="text-sm text-gray-500">Phone</p>
// // // //                     <p className="font-medium">{task.userPhone || '—'}</p>
// // // //                   </div>
// // // //                 </div>
// // // //                 {task.offerStatus && (
// // // //                   <div className="border-t pt-3 mt-2">
// // // //                     <h4 className="font-semibold text-gray-700 text-sm">Your Offer Status</h4>
// // // //                     <div className="mt-1">
// // // //                       <span className={`px-2 py-1 rounded-full text-xs ${offerStatusColors[task.offerStatus]}`}>
// // // //                         {offerStatusLabels[task.offerStatus]}
// // // //                       </span>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex flex-wrap gap-3 justify-between items-center mt-8 pt-4 border-t border-gray-200">
// // // //               <div className="flex gap-3">
// // // //                 {availableActions().map((action) => (
// // // //                   <button
// // // //                     key={action.label}
// // // //                     onClick={action.action}
// // // //                     disabled={action.loading}
// // // //                     className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
// // // //                   > 
// // // //                     {action.loading ? (
// // // //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // // //                     )<span> : (
// // // //                       <>
// // // //                         <action.icon /> {action.label}
// // // //                       </>
// // // //                     )}
// // // //                   </button>
// // // //                 ))}
// // // //                 {task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
// // // //                   <button
// // // //                     onClick={handleCancel}
// // // //                     disabled={isSubmitting}
// // // //                     className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
// // // //                   >
// // // //                     {isSubmitting ? (
// // // //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // // //                     ) : (
// // // //                       <>
// // // //                         <FaBan /> Cancel
// // // //                       </>
// // // //                     )}
// // // //                   </button>
// // // //                 )}
// // // //               </div>
// // // //               <button
// // // //                 onClick={() => router.push('/tasks')}
// // // //                 className="text-gray-500 hover:text-gray-700 underline text-sm"
// // // //               >
// // // //                 ← Back to My Tasks
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </motion.div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // frontend/app/tasker-app/src/app/tasks/[id]/page.tsx

// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { motion } from 'framer-motion';
// // // import {
// // //   FaArrowLeft, FaCheck, FaPlay, FaCheckCircle, FaBan,
// // //   FaMapMarkerAlt, FaDollarSign, FaUser, FaPhone, FaCalendarAlt, FaClock, FaTag, FaFileAlt
// // // } from 'react-icons/fa';
// // // import toast from 'react-hot-toast';
// // // import { apiClient } from '@packages/api-client';

// // // type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
// // // type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

// // // interface Task {
// // //   id: string;
// // //   title: string;
// // //   description: string;
// // //   location: string;
// // //   budget: number | null;
// // //   status: TaskStatus;
// // //   rawStatus: string; // ذخیره وضعیت خام از بک‌اند
// // //   createdAt: string;
// // //   scheduledAt?: string;
// // //   userId: string;
// // //   userName?: string;
// // //   userPhone?: string;
// // //   category?: string;
// // // }

// // // interface TaskWithOffer extends Task {
// // //   offerStatus: OfferStatus | null;
// // //   offerId?: string;
// // // }

// // // function mapBackendStatus(backendStatus: string): TaskStatus {
// // //   const mapping: Record<string, TaskStatus> = {
// // //     PENDING_APPROVAL: 'CREATED',
// // //     APPROVED: 'ASSIGNED',
// // //     REJECTED: 'CANCELLED',
// // //     TASKER_ACCEPTED: 'ACCEPTED',
// // //     READY_TO_START: 'STARTED',
// // //     IN_PROGRESS: 'STARTED',
// // //     COMPLETED: 'COMPLETED',
// // //     CANCELLED: 'CANCELLED',
// // //     CUSTOMER_SELECTED: 'ACCEPTED',
// // //     OFFERING: 'ASSIGNED',
// // //   };
// // //   const mapped = mapping[backendStatus] || 'CREATED';
// // //   console.log(`🔄 Mapping backend status "${backendStatus}" -> "${mapped}"`);
// // //   return mapped;
// // // }

// // // const statusLabels: Record<TaskStatus, string> = {
// // //   CREATED: 'Created',
// // //   ASSIGNED: 'Assigned',
// // //   ACCEPTED: 'Accepted',
// // //   STARTED: 'In Progress',
// // //   COMPLETED: 'Completed',
// // //   CANCELLED: 'Cancelled',
// // // };

// // // const statusColors: Record<TaskStatus, string> = {
// // //   CREATED: 'bg-gray-200 text-gray-800',
// // //   ASSIGNED: 'bg-blue-100 text-blue-800',
// // //   ACCEPTED: 'bg-green-100 text-green-800',
// // //   STARTED: 'bg-yellow-100 text-yellow-800',
// // //   COMPLETED: 'bg-green-500 text-white',
// // //   CANCELLED: 'bg-red-100 text-red-800',
// // // };

// // // const offerStatusLabels: Record<OfferStatus, string> = {
// // //   PENDING: 'Pending',
// // //   ACCEPTED: 'Accepted',
// // //   REJECTED: 'Rejected',
// // //   CANCELLED: 'Cancelled',
// // // };

// // // const offerStatusColors: Record<OfferStatus, string> = {
// // //   PENDING: 'bg-yellow-100 text-yellow-800',
// // //   ACCEPTED: 'bg-green-100 text-green-800',
// // //   REJECTED: 'bg-red-100 text-red-800',
// // //   CANCELLED: 'bg-gray-300 text-gray-600',
// // // };

// // // const getShadowClass = (task: TaskWithOffer): string => {
// // //   const { status, offerStatus } = task;
  
// // //   if (offerStatus === 'ACCEPTED') {
// // //     return 'shadow-green-500/40 border-2 border-green-400';
// // //   } else if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
// // //     return 'shadow-red-500/40 border-2 border-red-400';
// // //   } else if (offerStatus === 'PENDING') {
// // //     return 'shadow-yellow-500/30 border-2 border-yellow-400';
// // //   }
  
// // //   if (status === 'ACCEPTED') {
// // //     return 'shadow-green-500/40 border-2 border-green-400';
// // //   } else if (status === 'CANCELLED') {
// // //     return 'shadow-red-500/40 border-2 border-red-400';
// // //   }
// // //   return 'shadow-2xl';
// // // };

// // // // کامپوننت نمایش تایمر زنده
// // // const LiveTimer = ({ isRunning, onComplete }: { isRunning: boolean; onComplete: () => void }) => {
// // //   const [seconds, setSeconds] = useState(0);
// // //   const [isActive, setIsActive] = useState(isRunning);

// // //   useEffect(() => {
// // //     let interval: NodeJS.Timeout | null = null;
// // //     if (isActive) {
// // //       interval = setInterval(() => {
// // //         setSeconds((prev) => prev + 1);
// // //       }, 1000);
// // //     } else if (!isActive && seconds !== 0) {
// // //       clearInterval(interval!);
// // //     }
// // //     return () => clearInterval(interval!);
// // //   }, [isActive, seconds]);

// // //   useEffect(() => {
// // //     setIsActive(isRunning);
// // //   }, [isRunning]);

// // //   useEffect(() => {
// // //     if (!isActive && seconds > 0) {
// // //       onComplete();
// // //     }
// // //   }, [isActive, seconds, onComplete]);

// // //   const formatTime = (totalSeconds: number) => {
// // //     const hrs = Math.floor(totalSeconds / 3600);
// // //     const mins = Math.floor((totalSeconds % 3600) / 60);
// // //     const secs = totalSeconds % 60;
// // //     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// // //   };

// // //   return (
// // //     <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
// // //       <FaClock className="text-green-500 text-lg" />
// // //       <span className="text-2xl font-mono font-bold text-gray-700">{formatTime(seconds)}</span>
// // //       {isActive && <span className="text-sm text-green-600 font-medium">⏳ In Progress</span>}
// // //       {!isActive && seconds > 0 && <span className="text-sm text-gray-500">⏱️ Completed</span>}
// // //     </div>
// // //   );
// // // };

// // // export default function TaskDetailPage() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const taskId = params.id as string;
// // //   const [task, setTask] = useState<TaskWithOffer | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [timerRunning, setTimerRunning] = useState(false);
// // // console.log('task',task)
// // //   // تابع کمکی برای دریافت مجدد تسک و به‌روزرسانی state
// // //   const refreshTask = async () => {
// // //     try {
// // //       const taskRes = await apiClient.get(`/api/tasks/${taskId}`);
// // //       const rawTask = taskRes.data;
// // //       const mappedStatus = mapBackendStatus(rawTask.status);
// // //       const mappedTask: Task = {
// // //         ...rawTask,
// // //         status: mappedStatus,
// // //         rawStatus: rawTask.status,
// // //         budget: rawTask.budget ?? null,
// // //         description: rawTask.description ?? '',
// // //         location: rawTask.location ?? '',
// // //         userName: rawTask.userName ?? undefined,
// // //         userPhone: rawTask.userPhone ?? undefined,
// // //         scheduledAt: rawTask.scheduledAt ?? undefined,
// // //         category: rawTask.category ?? undefined,
// // //       };

// // //       // دریافت وضعیت آفر
// // //       let offerStatus: OfferStatus | null = null;
// // //       let offerId: string | undefined;
// // //       try {
// // //         const offerRes = await apiClient.get(`/api/tasks/${taskId}/offers/my`);
// // //         offerStatus = offerRes.data.status;
// // //         offerId = offerRes.data.id;
// // //       } catch (error: any) {
// // //         if (error.response?.status === 404) {
// // //           offerStatus = null;
// // //         } else {
// // //           console.error('Error fetching offer:', error);
// // //         }
// // //       }

// // //       setTask({
// // //         ...mappedTask,
// // //         offerStatus,
// // //         offerId,
// // //       });

// // //       if (mappedStatus === 'STARTED') {
// // //         setTimerRunning(true);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error refreshing task:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const fetchTask = async () => {
// // //       try {
// // //         const taskRes = await apiClient.get(`/api/tasks/${taskId}`);
// // //         const rawTask = taskRes.data;
// // //         console.log('📦 Raw task from backend:', rawTask);
// // //         console.log('📌 Raw task.status:', rawTask.status);
        
// // //         const mappedStatus = mapBackendStatus(rawTask.status);
// // //         console.log('✅ Mapped status:', mappedStatus);
        
// // //         const mappedTask: Task = {
// // //           ...rawTask,
// // //           status: mappedStatus,
// // //           rawStatus: rawTask.status,
// // //           budget: rawTask.budget ?? null,
// // //           description: rawTask.description ?? '',
// // //           location: rawTask.location ?? '',
// // //           userName: rawTask.userName ?? undefined,
// // //           userPhone: rawTask.userPhone ?? undefined,
// // //           scheduledAt: rawTask.scheduledAt ?? undefined,
// // //           category: rawTask.category ?? undefined,
// // //         };

// // //         let offerStatus: OfferStatus | null = null;
// // //         let offerId: string | undefined;
// // //         try {
// // //           const offerRes = await apiClient.get(`/api/tasks/${taskId}/offers/my`);
// // //           console.log('📦 Offer response:', offerRes.data);
// // //           offerStatus = offerRes.data.status;
// // //           offerId = offerRes.data.id;
// // //         } catch (error: any) {
// // //           if (error.response?.status === 404) {
// // //             console.log('ℹ️ No offer found for this tasker');
// // //             offerStatus = null;
// // //           } else {
// // //             console.error('❌ Error fetching offer:', error);
// // //           }
// // //         }

// // //         setTask({
// // //           ...mappedTask,
// // //           offerStatus,
// // //           offerId,
// // //         });

// // //         if (mappedStatus === 'STARTED') {
// // //           setTimerRunning(true);
// // //         }
// // //       } catch (error) {
// // //         console.error('❌ Error fetching task:', error);
// // //         toast.error('مشکل در دریافت اطلاعات تسک');
// // //         router.push('/tasks');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchTask();
// // //   }, [taskId, router]);

// // //   // تابع شروع تسک - زنجیره‌ای
// // //   const handleStart = async () => {
// // //     if (!task) return;
// // //     if (!confirm('آیا مطمئن هستید که می‌خواهید این تسک را شروع کنید؟')) return;
// // //     setIsSubmitting(true);

// // //     try {
// // //       // بررسی وضعیت فعلی و آفر
// // //       if (task.offerStatus !== 'ACCEPTED') {
// // //         toast.error('پیشنهاد شما هنوز توسط کارفرما پذیرفته نشده است');
// // //         return;
// // //       }

// // //       // وضعیت خام فعلی را بررسی می‌کنیم
// // //       const currentRawStatus = task.rawStatus;

// // //       // مرحله ۱: اگر وضعیت CUSTOMER_SELECTED است، ابتدا تسکر باید بپذیرد
// // //       if (currentRawStatus === 'CUSTOMER_SELECTED') {
// // //         console.log('➡️ Calling tasker-accept...');
// // //         await apiClient.post(`/api/tasks/${taskId}/tasker-accept`);
// // //         await refreshTask(); // به‌روزرسانی task
// // //         toast.success('تسک توسط شما پذیرفته شد');
// // //         // بعد از این، وضعیت باید TASKER_ACCEPTED شود
// // //       }

// // //       // بعد از مرحله ۱، وضعیت جدید را دریافت می‌کنیم
// // //       // (اگر refreshTask انجام شده باشد، task به‌روز است)
// // //       // اما برای اطمینان، دوباره refresh می‌کنیم
// // //       await refreshTask();

// // //       // مرحله ۲: اگر وضعیت TASKER_ACCEPTED است، readyToStart
// // //       if (task?.rawStatus === 'TASKER_ACCEPTED') {
// // //         console.log('➡️ Calling readyToStart...');
// // //         await apiClient.post(`/api/tasks/${taskId}/ready`);
// // //         await refreshTask();
// // //         toast.success('تسک آماده شروع شد');
// // //       }

// // //       // مرحله ۳: اگر وضعیت READY_TO_START است، start
// // //       if (task?.rawStatus === 'READY_TO_START') {
// // //         console.log('➡️ Calling start...');
// // //         await apiClient.post(`/api/tasks/${taskId}/start`);
// // //         await refreshTask();
// // //         setTimerRunning(true);
// // //         toast.success('تسک با موفقیت شروع شد');
// // //       } else {
// // //         // اگر به مرحله ۳ نرسیدیم، خطا
// // //         toast.error('وضعیت تسک برای شروع مناسب نیست');
// // //       }
// // //     } catch (error: any) {
// // //       console.error('❌ Error in start chain:', error);
// // //       toast.error(error.response?.data?.message || 'خطا در شروع تسک');
// // //       // در صورت خطا، وضعیت را مجدداً دریافت می‌کنیم تا همگام شود
// // //       await refreshTask();
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   const handleComplete = async () => {
// // //     if (!task) return;
// // //     if (!confirm('آیا مطمئن هستید که این تسک کامل شده است؟')) return;
// // //     setIsSubmitting(true);
// // //     try {
// // //       await apiClient.post(`/api/tasks/${taskId}/complete`);
// // //       await refreshTask();
// // //       setTimerRunning(false);
// // //       toast.success('تسک با موفقیت تکمیل شد');
// // //     } catch (error: any) {
// // //       console.error('❌ Error completing task:', error);
// // //       toast.error(error.response?.data?.message || 'خطا در تکمیل تسک');
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   const handleCancel = async () => {
// // //     if (!task) return;
// // //     if (!confirm('آیا از لغو این تسک مطمئن هستید؟')) return;
// // //     setIsSubmitting(true);
// // //     try {
// // //       await apiClient.patch(`/api/tasks/${taskId}/status`, { status: 'CANCELLED' });
// // //       await refreshTask();
// // //       setTimerRunning(false);
// // //       toast.error('تسک لغو شد');
// // //     } catch (error: any) {
// // //       console.error('❌ Error cancelling task:', error);
// // //       toast.error(error.response?.data?.message || 'خطا در لغو تسک');
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   const availableActions = () => {
// // //     if (!task) return [];
// // //     const { status, offerStatus } = task;

// // //     if (offerStatus === null) {
// // //       return [{ label: 'Make Offer', action: () => router.push(`/tasks/${taskId}/offer`), icon: FaCheck }];
// // //     }

// // //     if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
// // //       return [];
// // //     }

// // //     // دکمه Start: اگر تسک ACCEPTED (شامل CUSTOMER_SELECTED و TASKER_ACCEPTED) و آفر ACCEPTED باشد
// // //     if (status === 'ACCEPTED' && offerStatus === 'ACCEPTED') {
// // //       return [{ label: 'Start', action: handleStart, icon: FaPlay, loading: isSubmitting }];
// // //     }

// // //     if (status === 'STARTED') {
// // //       return [{ label: 'Complete', action: handleComplete, icon: FaCheckCircle, loading: isSubmitting }];
// // //     }

// // //     return [];
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
// // //       </div>
// // //     );
// // //   }

// // //   if (!task) return null;

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
// // //       <div className="max-w-4xl mx-auto">
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 30 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.5 }}
// // //           className={`bg-white rounded-2xl overflow-hidden ${getShadowClass(task)}`}
// // //         >
// // //           {/* Header */}
// // //           <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500 px-6 flex justify-between items-center">
// // //             <button
// // //               onClick={() => router.back()}
// // //               className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition"
// // //             >
// // //               <FaArrowLeft /> Back
// // //             </button>
// // //             <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
// // //               {statusLabels[task.status]}
// // //             </div>
// // //           </div>

// // //           <div className="p-6 md:p-8">
// // //             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
// // //             {task.category && (
// // //               <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
// // //                 <FaTag className="text-green-500" />
// // //                 <span>{task.category}</span>
// // //               </div>
// // //             )}

// // //             {/* نمایش تایمر */}
// // //             <div className="flex flex-wrap justify-between items-center mb-6">
// // //               <div className="flex-1" />
// // //               <div className="flex items-center gap-4">
// // //                 {task.status === 'STARTED' || task.status === 'ACCEPTED' ? (
// // //                   <LiveTimer 
// // //                     isRunning={timerRunning} 
// // //                     onComplete={() => console.log('Timer completed')} 
// // //                   />
// // //                 ) : null}
// // //               </div>
// // //             </div>

// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               {/* سمت چپ */}
// // //               <div className="space-y-4">
// // //                 <div className="flex items-start gap-3">
// // //                   <FaFileAlt className="text-green-500 mt-1" />
// // //                   <div>
// // //                     <h3 className="font-semibold text-gray-700">Description</h3>
// // //                     <p className="text-gray-600">{task.description || 'No description'}</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center gap-3">
// // //                   <FaMapMarkerAlt className="text-green-500" />
// // //                   <div>
// // //                     <h3 className="font-semibold text-gray-700">Location</h3>
// // //                     <p className="text-gray-600">{task.location || 'N/A'}</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center gap-3">
// // //                   <FaDollarSign className="text-green-500" />
// // //                   <div>
// // //                     <h3 className="font-semibold text-gray-700">Budget</h3>
// // //                     <p className="text-gray-800 font-medium">
// // //                       {task.budget?.toLocaleString() ?? 'N/A'} Toman
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center gap-3">
// // //                   <FaCalendarAlt className="text-green-500" />
// // //                   <div>
// // //                     <h3 className="font-semibold text-gray-700">Created</h3>
// // //                     <p className="text-gray-600">{new Date(task.createdAt).toLocaleString()}</p>
// // //                   </div>
// // //                 </div>
// // //                 {task.scheduledAt && (
// // //                   <div className="flex items-center gap-3">
// // //                     <FaClock className="text-green-500" />
// // //                     <div>
// // //                       <h3 className="font-semibold text-gray-700">Scheduled</h3>
// // //                       <p className="text-gray-600">{new Date(task.scheduledAt).toLocaleString()}</p>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* سمت راست */}
// // //               <div className="bg-gray-50 rounded-xl p-4 space-y-3">
// // //                 <h3 className="font-bold text-gray-800 border-b pb-2">Client Information</h3>
// // //                 <div className="flex items-center gap-3">
// // //                   <FaUser className="text-green-500" />
// // //                   <div>
// // //                     <p className="text-sm text-gray-500">Name</p>
// // //                     <p className="font-medium">{task.userName || '—'}</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center gap-3">
// // //                   <FaPhone className="text-green-500" />
// // //                   <div>
// // //                     <p className="text-sm text-gray-500">Phone</p>
// // //                     <p className="font-medium">{task.userPhone || '—'}</p>
// // //                   </div>
// // //                 </div>
// // //                 {task.offerStatus && (
// // //                   <div className="border-t pt-3 mt-2">
// // //                     <h4 className="font-semibold text-gray-700 text-sm">Your Offer Status</h4>
// // //                     <div className="mt-1">
// // //                       <span className={`px-2 py-1 rounded-full text-xs ${offerStatusColors[task.offerStatus]}`}>
// // //                         {offerStatusLabels[task.offerStatus]}
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* دکمه‌های اقدام */}
// // //             <div className="flex flex-wrap gap-3 justify-between items-center mt-8 pt-4 border-t border-gray-200">
// // //               <div className="flex gap-3">
// // //                 {availableActions().map((action) => (
// // //                   <button
// // //                     key={action.label}
// // //                     onClick={action.action}
// // //                     disabled={action.loading}
// // //                     className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
// // //                   >
// // //                     {action.loading ? (
// // //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // //                     ) : (
// // //                       <>
// // //                         <action.icon /> {action.label}
// // //                       </>
// // //                     )}
// // //                   </button>
// // //                 ))}
// // //                 {task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
// // //                   <button
// // //                     onClick={handleCancel}
// // //                     disabled={isSubmitting}
// // //                     className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
// // //                   >
// // //                     {isSubmitting ? (
// // //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // //                     ) : (
// // //                       <>
// // //                         <FaBan /> Cancel
// // //                       </>
// // //                     )}
// // //                   </button>
// // //                 )}
// // //               </div>
// // //               <button
// // //                 onClick={() => router.push('/tasks')}
// // //                 className="text-gray-500 hover:text-gray-700 underline text-sm"
// // //               >
// // //                 ← Back to My Tasks
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // frontend/app/tasker-app/src/app/tasks/[id]/page.tsx

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { motion } from 'framer-motion';
// // import {
// //   FaArrowLeft, FaCheck, FaPlay, FaCheckCircle, FaBan,
// //   FaMapMarkerAlt, FaDollarSign, FaUser, FaPhone, FaCalendarAlt, FaClock, FaTag, FaFileAlt
// // } from 'react-icons/fa';
// // import toast from 'react-hot-toast';
// // import { apiClient } from '@packages/api-client';

// // type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
// // type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

// // interface Task {
// //   id: string;
// //   title: string;
// //   description: string;
// //   location: string;
// //   budget: number | null;
// //   status: TaskStatus;
// //   rawStatus: string;
// //   createdAt: string;
// //   scheduledAt?: string;
// //   userId: string;
// //   userName?: string;
// //   userPhone?: string;
// //   category?: string;
// // }

// // interface TaskWithOffer extends Task {
// //   offerStatus: OfferStatus | null;
// //   offerId?: string;
// // }

// // function mapBackendStatus(backendStatus: string): TaskStatus {
// //   const mapping: Record<string, TaskStatus> = {
// //     PENDING_APPROVAL: 'CREATED',
// //     APPROVED: 'ASSIGNED',
// //     REJECTED: 'CANCELLED',
// //     TASKER_ACCEPTED: 'ACCEPTED',
// //     READY_TO_START: 'STARTED',
// //     IN_PROGRESS: 'STARTED',
// //     COMPLETED: 'COMPLETED',
// //     CANCELLED: 'CANCELLED',
// //     CUSTOMER_SELECTED: 'ACCEPTED',
// //     OFFERING: 'ASSIGNED',
// //   };
// //   const mapped = mapping[backendStatus] || 'CREATED';
// //   console.log(`🔄 Mapping: "${backendStatus}" → "${mapped}"`);
// //   return mapped;
// // }

// // const statusLabels: Record<TaskStatus, string> = {
// //   CREATED: 'Created',
// //   ASSIGNED: 'Assigned',
// //   ACCEPTED: 'Accepted',
// //   STARTED: 'In Progress',
// //   COMPLETED: 'Completed',
// //   CANCELLED: 'Cancelled',
// // };

// // const statusColors: Record<TaskStatus, string> = {
// //   CREATED: 'bg-gray-200 text-gray-800',
// //   ASSIGNED: 'bg-blue-100 text-blue-800',
// //   ACCEPTED: 'bg-green-100 text-green-800',
// //   STARTED: 'bg-yellow-100 text-yellow-800',
// //   COMPLETED: 'bg-green-500 text-white',
// //   CANCELLED: 'bg-red-100 text-red-800',
// // };

// // const offerStatusLabels: Record<OfferStatus, string> = {
// //   PENDING: 'Pending',
// //   ACCEPTED: 'Accepted',
// //   REJECTED: 'Rejected',
// //   CANCELLED: 'Cancelled',
// // };

// // const offerStatusColors: Record<OfferStatus, string> = {
// //   PENDING: 'bg-yellow-100 text-yellow-800',
// //   ACCEPTED: 'bg-green-100 text-green-800',
// //   REJECTED: 'bg-red-100 text-red-800',
// //   CANCELLED: 'bg-gray-300 text-gray-600',
// // };

// // const getShadowClass = (task: TaskWithOffer): string => {
// //   const { status, offerStatus } = task;
// //   if (offerStatus === 'ACCEPTED') {
// //     return 'shadow-green-500/40 border-2 border-green-400';
// //   } else if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
// //     return 'shadow-red-500/40 border-2 border-red-400';
// //   } else if (offerStatus === 'PENDING') {
// //     return 'shadow-yellow-500/30 border-2 border-yellow-400';
// //   }
// //   if (status === 'ACCEPTED') {
// //     return 'shadow-green-500/40 border-2 border-green-400';
// //   } else if (status === 'CANCELLED') {
// //     return 'shadow-red-500/40 border-2 border-red-400';
// //   }
// //   return 'shadow-2xl';
// // };

// // const LiveTimer = ({ isRunning, onComplete }: { isRunning: boolean; onComplete: () => void }) => {
// //   const [seconds, setSeconds] = useState(0);
// //   const [isActive, setIsActive] = useState(isRunning);

// //   useEffect(() => {
// //     let interval: NodeJS.Timeout | null = null;
// //     if (isActive) {
// //       interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
// //     } else if (!isActive && seconds !== 0) {
// //       clearInterval(interval!);
// //     }
// //     return () => clearInterval(interval!);
// //   }, [isActive, seconds]);

// //   useEffect(() => {
// //     setIsActive(isRunning);
// //   }, [isRunning]);

// //   useEffect(() => {
// //     if (!isActive && seconds > 0) onComplete();
// //   }, [isActive, seconds, onComplete]);

// //   const formatTime = (totalSeconds: number) => {
// //     const hrs = Math.floor(totalSeconds / 3600);
// //     const mins = Math.floor((totalSeconds % 3600) / 60);
// //     const secs = totalSeconds % 60;
// //     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// //   };

// //   return (
// //     <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
// //       <FaClock className="text-green-500 text-lg" />
// //       <span className="text-2xl font-mono font-bold text-gray-700">{formatTime(seconds)}</span>
// //       {isActive && <span className="text-sm text-green-600 font-medium">⏳ In Progress</span>}
// //       {!isActive && seconds > 0 && <span className="text-sm text-gray-500">⏱️ Completed</span>}
// //     </div>
// //   );
// // };

// // export default function TaskDetailPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const taskId = params.id as string;

// //   const [task, setTask] = useState<TaskWithOffer | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [timerRunning, setTimerRunning] = useState(false);
// // console.log('task',task)
// //   const refreshTask = async () => {
// //     try {
// //       const taskRes = await apiClient.get(`/api/tasks/${taskId}`);
// //       const rawTask = taskRes.data;
// //       console.log('📦 Refreshed task:', rawTask);
// //       console.log('📌 rawStatus:', rawTask.status);

// //       const mappedStatus = mapBackendStatus(rawTask.status);
// //       const mappedTask: Task = {
// //         ...rawTask,
// //         status: mappedStatus,
// //         rawStatus: rawTask.status,
// //         budget: rawTask.budget ?? null,
// //         description: rawTask.description ?? '',
// //         location: rawTask.location ?? '',
// //         userName: rawTask.userName ?? undefined,
// //         userPhone: rawTask.userPhone ?? undefined,
// //         scheduledAt: rawTask.scheduledAt ?? undefined,
// //         category: rawTask.category ?? undefined,
// //       };

// //       let offerStatus: OfferStatus | null = null;
// //       let offerId: string | undefined;
// //       try {
// //         const offerRes = await apiClient.get(`/api/tasks/${taskId}/offers/my`);
// //         offerStatus = offerRes.data.status;
// //         offerId = offerRes.data.id;
// //       } catch (error: any) {
// //         if (error.response?.status !== 404) {
// //           console.error('Error fetching offer:', error);
// //         }
// //       }

// //       setTask({ ...mappedTask, offerStatus, offerId });

// //       if (mappedStatus === 'STARTED') {
// //         setTimerRunning(true);
// //       }
// //       if (mappedStatus === 'COMPLETED') {
// //         setTimerRunning(false);
// //       }

// //       return { mappedStatus, rawStatus: rawTask.status };
// //     } catch (error) {
// //       console.error('Error refreshing task:', error);
// //       return null;
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchTask = async () => {
// //       try {
// //         await refreshTask();
// //       } catch (error) {
// //         console.error('Error fetching task:', error);
// //         toast.error('مشکل در دریافت اطلاعات تسک');
// //         router.push('/tasks');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchTask();
// //   }, [taskId]);

// //   const handleStart = async () => {
// //     if (!task) return;
// //     if (!confirm('آیا می‌خواهید این تسک را شروع کنید؟')) return;
// //     setIsSubmitting(true);

// //     try {
// //       if (task.offerStatus !== 'ACCEPTED') {
// //         toast.error('پیشنهاد شما هنوز پذیرفته نشده است');
// //         return;
// //       }

// //       let currentRawStatus = task.rawStatus;
// //       console.log('🔄 Starting with rawStatus:', currentRawStatus);

// //       // مرحله ۱: CUSTOMER_SELECTED → TASKER_ACCEPTED
// //       if (currentRawStatus === 'CUSTOMER_SELECTED') {
// //         console.log('➡️ Calling tasker-accept...');
// //         await apiClient.post(`/api/tasks/${taskId}/tasker-accept`);
// //         const result = await refreshTask();
// //         currentRawStatus = result?.rawStatus || task.rawStatus;
// //         toast.success('تسک توسط شما پذیرفته شد');
// //         console.log('✅ After tasker-accept, rawStatus:', currentRawStatus);
// //       }

// //       // مرحله ۲: TASKER_ACCEPTED → READY_TO_START
// //       if (currentRawStatus === 'TASKER_ACCEPTED') {
// //         console.log('➡️ Calling readyToStart...');
// //         await apiClient.post(`/api/tasks/${taskId}/ready`);
// //         const result = await refreshTask();
// //         currentRawStatus = result?.rawStatus || task.rawStatus;
// //         toast.success('تسک آماده شروع شد');
// //         console.log('✅ After readyToStart, rawStatus:', currentRawStatus);
// //       }

// //       // مرحله ۳: READY_TO_START → IN_PROGRESS
// //       if (currentRawStatus === 'READY_TO_START') {
// //         console.log('➡️ Calling start...');
// //         await apiClient.post(`/api/tasks/${taskId}/start`);
// //         const result = await refreshTask();
// //         currentRawStatus = result?.rawStatus || task.rawStatus;
// //         setTimerRunning(true);
// //         toast.success('🚀 تسک با موفقیت شروع شد');
// //         console.log('✅ After start, rawStatus:', currentRawStatus);
// //       } else {
// //         // اگر به مرحله ۳ نرسید، خطا
// //         toast.error('وضعیت تسک برای شروع مناسب نیست (نیاز به READY_TO_START)');
// //         console.log('❌ Not ready for start, currentRawStatus:', currentRawStatus);
// //       }
// //     } catch (error: any) {
// //       console.error('❌ Error in start chain:', error);
// //       toast.error(error.response?.data?.message || 'خطا در شروع تسک');
// //       await refreshTask();
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleComplete = async () => {
// //     if (!task) return;
// //     if (!confirm('آیا مطمئن هستید که این تسک کامل شده است؟')) return;
// //     setIsSubmitting(true);

// //     try {
// //       console.log('🔍 Checking for complete. rawStatus:', task.rawStatus, 'status:', task.status);

// //       // بررسی: فقط زمانی که rawStatus = 'IN_PROGRESS' یا status = 'STARTED' باشد امکان تکمیل وجود دارد
// //       if (task.rawStatus !== 'IN_PROGRESS' && task.status !== 'STARTED') {
// //         toast.error('تسک در وضعیت مناسب برای تکمیل نیست (وضعیت فعلی: ' + (task.rawStatus || task.status) + ')');
// //         console.log('❌ Cannot complete. rawStatus:', task.rawStatus, 'status:', task.status);
// //         return;
// //       }

// //       console.log('➡️ Calling completeTask...');
// //      const response =  await apiClient.post(`/api/tasks/${taskId}/complete`);
// //       const result = await refreshTask();
// //       console.log('reponse',response)
// //       console.log('result',result)
// //       setTimerRunning(false);
// //       toast.success('🎉 تسک با موفقیت تکمیل شد');
// //       console.log('✅ After complete, rawStatus:', result?.rawStatus);
// //     } catch (error: any) {
// //       console.error('❌ Error completing task:', error);
// //       toast.error(error.response?.data?.message || 'خطا در تکمیل تسک');
// //       await refreshTask();
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleCancel = async () => {
// //     if (!task) return;
// //     if (!confirm('آیا از لغو این تسک مطمئن هستید؟')) return;
// //     setIsSubmitting(true);
// //     try {
// //       await apiClient.patch(`/api/tasks/${taskId}/status`, { status: 'CANCELLED' });
// //       await refreshTask();
// //       setTimerRunning(false);
// //       toast.error('تسک لغو شد');
// //     } catch (error: any) {
// //       console.error('Error cancelling task:', error);
// //       toast.error(error.response?.data?.message || 'خطا در لغو تسک');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const availableActions = () => {
// //     if (!task) return [];
// //     const { status, offerStatus } = task;

// //     if (offerStatus === null) {
// //       return [{ label: 'Make Offer', action: () => router.push(`/tasks/${taskId}/offer`), icon: FaCheck }];
// //     }

// //     if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') return [];

// //     // دکمه Start: فقط وقتی تسک در وضعیت ACCEPTED باشد
// //     if (status === 'ACCEPTED' && offerStatus === 'ACCEPTED') {
// //       return [{ label: 'Start', action: handleStart, icon: FaPlay, loading: isSubmitting }];
// //     }

// //     // دکمه Complete: فقط وقتی تسک در وضعیت STARTED باشد
// //     if (status === 'STARTED') {
// //       return [{ label: 'Complete', action: handleComplete, icon: FaCheckCircle, loading: isSubmitting }];
// //     }

// //     return [];
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
// //       </div>
// //     );
// //   }

// //   if (!task) return null;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
// //       <div className="max-w-4xl mx-auto">
// //         <motion.div
// //           initial={{ opacity: 0, y: 30 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //           className={`bg-white rounded-2xl overflow-hidden ${getShadowClass(task)}`}
// //         >
// //           <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500 px-6 flex justify-between items-center">
// //             <button
// //               onClick={() => router.back()}
// //               className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition"
// //             >
// //               <FaArrowLeft /> Back
// //             </button>
// //             <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
// //               {statusLabels[task.status]}
// //             </div>
// //           </div>

// //           <div className="p-6 md:p-8">
// //             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
// //             {task.category && (
// //               <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
// //                 <FaTag className="text-green-500" />
// //                 <span>{task.category}</span>
// //               </div>
// //             )}

// //             <div className="flex flex-wrap justify-between items-center mb-6">
// //               <div className="flex-1" />
// //               <div className="flex items-center gap-4">
// //                 {(task.status === 'STARTED' || task.status === 'ACCEPTED') && (
// //                   <LiveTimer isRunning={timerRunning} onComplete={() => {}} />
// //                 )}
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="space-y-4">
// //                 <div className="flex items-start gap-3">
// //                   <FaFileAlt className="text-green-500 mt-1" />
// //                   <div>
// //                     <h3 className="font-semibold text-gray-700">Description</h3>
// //                     <p className="text-gray-600">{task.description || 'No description'}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   <FaMapMarkerAlt className="text-green-500" />
// //                   <div>
// //                     <h3 className="font-semibold text-gray-700">Location</h3>
// //                     <p className="text-gray-600">{task.location || 'N/A'}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   <FaDollarSign className="text-green-500" />
// //                   <div>
// //                     <h3 className="font-semibold text-gray-700">Budget</h3>
// //                     <p className="text-gray-800 font-medium">
// //                       {task.budget?.toLocaleString() ?? 'N/A'} Toman
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   <FaCalendarAlt className="text-green-500" />
// //                   <div>
// //                     <h3 className="font-semibold text-gray-700">Created</h3>
// //                     <p className="text-gray-600">{new Date(task.createdAt).toLocaleString()}</p>
// //                   </div>
// //                 </div>
// //                 {task.scheduledAt && (
// //                   <div className="flex items-center gap-3">
// //                     <FaClock className="text-green-500" />
// //                     <div>
// //                       <h3 className="font-semibold text-gray-700">Scheduled</h3>
// //                       <p className="text-gray-600">{new Date(task.scheduledAt).toLocaleString()}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="bg-gray-50 rounded-xl p-4 space-y-3">
// //                 <h3 className="font-bold text-gray-800 border-b pb-2">Client Information</h3>
// //                 <div className="flex items-center gap-3">
// //                   <FaUser className="text-green-500" />
// //                   <div>
// //                     <p className="text-sm text-gray-500">Name</p>
// //                     <p className="font-medium">{task.userName || '—'}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   <FaPhone className="text-green-500" />
// //                   <div>
// //                     <p className="text-sm text-gray-500">Phone</p>
// //                     <p className="font-medium">{task.userPhone || '—'}</p>
// //                   </div>
// //                 </div>
// //                 {task.offerStatus && (
// //                   <div className="border-t pt-3 mt-2">
// //                     <h4 className="font-semibold text-gray-700 text-sm">Your Offer Status</h4>
// //                     <div className="mt-1">
// //                       <span className={`px-2 py-1 rounded-full text-xs ${offerStatusColors[task.offerStatus]}`}>
// //                         {offerStatusLabels[task.offerStatus]}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="flex flex-wrap gap-3 justify-between items-center mt-8 pt-4 border-t border-gray-200">
// //               <div className="flex gap-3">
// //                 {availableActions().map((action) => (
// //                   <button
// //                     key={action.label}
// //                     onClick={action.action}
// //                     disabled={action.loading}
// //                     className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
// //                   >
// //                     {action.loading ? (
// //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                     ) : (
// //                       <>
// //                         <action.icon /> {action.label}
// //                       </>
// //                     )}
// //                   </button>
// //                 ))}
// //                 {task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
// //                   <button
// //                     onClick={handleCancel}
// //                     disabled={isSubmitting}
// //                     className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
// //                   >
// //                     {isSubmitting ? (
// //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                     ) : (
// //                       <>
// //                         <FaBan /> Cancel
// //                       </>
// //                     )}
// //                   </button>
// //                 )}
// //               </div>
// //               <button
// //                 onClick={() => router.push('/tasks')}
// //                 className="text-gray-500 hover:text-gray-700 underline text-sm"
// //               >
// //                 ← Back to My Tasks
// //               </button>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }
// // frontend/app/tasker-app/src/app/tasks/[id]/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import {
//   FaArrowLeft, FaCheck, FaPlay, FaCheckCircle, FaBan,
//   FaMapMarkerAlt, FaDollarSign, FaUser, FaPhone, FaCalendarAlt, FaClock, FaTag, FaFileAlt
// } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import { apiClient } from '@packages/api-client';

// type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
// type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   budget: number | null;
//   status: TaskStatus;
//   rawStatus: string;
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
//     CUSTOMER_SELECTED: 'ACCEPTED',
//     OFFERING: 'ASSIGNED',
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

// const getShadowClass = (task: TaskWithOffer): string => {
//   const { status, offerStatus } = task;
//   if (offerStatus === 'ACCEPTED') {
//     return 'shadow-green-500/40 border-2 border-green-400';
//   } else if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') {
//     return 'shadow-red-500/40 border-2 border-red-400';
//   } else if (offerStatus === 'PENDING') {
//     return 'shadow-yellow-500/30 border-2 border-yellow-400';
//   }
//   if (status === 'ACCEPTED') {
//     return 'shadow-green-500/40 border-2 border-green-400';
//   } else if (status === 'CANCELLED') {
//     return 'shadow-red-500/40 border-2 border-red-400';
//   }
//   return 'shadow-2xl';
// };

// // تایمر زنده
// const LiveTimer = ({ isRunning, onComplete }: { isRunning: boolean; onComplete: () => void }) => {
//   const [seconds, setSeconds] = useState(0);
//   const [isActive, setIsActive] = useState(isRunning);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (isActive) {
//       interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
//     } else if (!isActive && seconds !== 0) {
//       clearInterval(interval!);
//     }
//     return () => clearInterval(interval!);
//   }, [isActive, seconds]);

//   useEffect(() => {
//     setIsActive(isRunning);
//   }, [isRunning]);

//   useEffect(() => {
//     if (!isActive && seconds > 0) onComplete();
//   }, [isActive, seconds, onComplete]);

//   const formatTime = (totalSeconds: number) => {
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
//       <FaClock className="text-green-500 text-lg" />
//       <span className="text-2xl font-mono font-bold text-gray-700">{formatTime(seconds)}</span>
//       {isActive && <span className="text-sm text-green-600 font-medium">⏳ In Progress</span>}
//       {!isActive && seconds > 0 && <span className="text-sm text-gray-500">⏱️ Completed</span>}
//     </div>
//   );
// };

// export default function TaskDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const taskId = params.id as string;

//   const [task, setTask] = useState<TaskWithOffer | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [timerRunning, setTimerRunning] = useState(false);

//   // به‌روزرسانی تسک از سرور
//   const refreshTask = async () => {
//     try {
//       const taskRes = await apiClient.get(`/api/tasks/${taskId}`);
//       const rawTask = taskRes.data;
//       const mappedStatus = mapBackendStatus(rawTask.status);
//       const mappedTask: Task = {
//         ...rawTask,
//         status: mappedStatus,
//         rawStatus: rawTask.status,
//         budget: rawTask.budget ?? null,
//         description: rawTask.description ?? '',
//         location: rawTask.location ?? '',
//         userName: rawTask.userName ?? undefined,
//         userPhone: rawTask.userPhone ?? undefined,
//         scheduledAt: rawTask.scheduledAt ?? undefined,
//         category: rawTask.category ?? undefined,
//       };

//       let offerStatus: OfferStatus | null = null;
//       let offerId: string | undefined;
//       try {
//         const offerRes = await apiClient.get(`/api/tasks/${taskId}/offers/my`);
//         offerStatus = offerRes.data.status;
//         offerId = offerRes.data.id;
//       } catch (error: any) {
//         if (error.response?.status !== 404) {
//           console.error('Error fetching offer:', error);
//         }
//       }

//       setTask({ ...mappedTask, offerStatus, offerId });
//       if (mappedStatus === 'STARTED') setTimerRunning(true);
//       if (mappedStatus === 'COMPLETED') setTimerRunning(false);
//     } catch (error) {
//       console.error('Error refreshing task:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         await refreshTask();
//       } catch (error) {
//         console.error('Error fetching task:', error);
//         toast.error('مشکل در دریافت اطلاعات تسک');
//         router.push('/tasks');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTask();
//   }, [taskId]);

//   // ---- دکمه Start (زنجیره‌ای) ----
//   const handleStart = async () => {
//     if (!task) return;
//     if (!confirm('آیا می‌خواهید این تسک را شروع کنید؟')) return;
//     setIsSubmitting(true);

//     try {
//       if (task.offerStatus !== 'ACCEPTED') {
//         toast.error('پیشنهاد شما هنوز پذیرفته نشده است');
//         return;
//       }

//       // مرحله ۱: اگر CUSTOMER_SELECTED باشد، tasker-accept
//       if (task.rawStatus === 'CUSTOMER_SELECTED') {
//         await apiClient.post(`/api/tasks/${taskId}/tasker-accept`);
//         await refreshTask();
//         toast.success('تسک توسط شما پذیرفته شد');
//       }

//       // مرحله ۲: اگر TASKER_ACCEPTED باشد، readyToStart
//       if (task?.rawStatus === 'TASKER_ACCEPTED') {
//         await apiClient.post(`/api/tasks/${taskId}/ready`);
//         await refreshTask();
//         toast.success('تسک آماده شروع شد');
//       }

//       // مرحله ۳: اگر READY_TO_START باشد، start
//       if (task?.rawStatus === 'READY_TO_START') {
//         await apiClient.post(`/api/tasks/${taskId}/start`);
//         await refreshTask();
//         setTimerRunning(true);
//         toast.success('تسک با موفقیت شروع شد');
//       } else {
//         toast.error('وضعیت تسک برای شروع مناسب نیست');
//       }
//     } catch (error: any) {
//       console.error('Error in start chain:', error);
//       toast.error(error.response?.data?.message || 'خطا در شروع تسک');
//       await refreshTask();
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ---- دکمه Complete ----
//   const handleComplete = async () => {
//     if (!task) return;
//     if (!confirm('آیا مطمئن هستید که این تسک کامل شده است؟')) return;
//     setIsSubmitting(true);

//     try {
//       // بررسی وضعیت: فقط در STARTED یا IN_PROGRESS امکان تکمیل وجود دارد
//       if (task.rawStatus !== 'IN_PROGRESS') {
//         toast.error('تسک در وضعیت مناسب برای تکمیل نیست');
//         return;
//       }

//      const response = await apiClient.post(`/api/tasks/${taskId}/complete`);
//      console.log('response complete',response)
//       await refreshTask();
//       setTimerRunning(false);
//       toast.success('🎉 تسک با موفقیت تکمیل شد');
//     } catch (error: any) {
//       console.error('Error completing task:', error);
//       toast.error(error.response?.data?.message || 'خطا در تکمیل تسک');
//       await refreshTask();
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = async () => {
//     if (!task) return;
//     if (!confirm('آیا از لغو این تسک مطمئن هستید؟')) return;
//     setIsSubmitting(true);
//     try {
//       await apiClient.patch(`/api/tasks/${taskId}/status`, { status: 'CANCELLED' });
//       await refreshTask();
//       setTimerRunning(false);
//       toast.error('تسک لغو شد');
//     } catch (error: any) {
//       console.error('Error cancelling task:', error);
//       toast.error(error.response?.data?.message || 'خطا در لغو تسک');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // دکمه‌های قابل نمایش
//   const availableActions = () => {
//     if (!task) return [];
//     const { status, offerStatus } = task;

//     if (offerStatus === null) {
//       return [{ label: 'Make Offer', action: () => router.push(`/tasks/${taskId}/offer`), icon: FaCheck }];
//     }

//     if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') return [];

//     // دکمه Start: فقط وقتی تسک در وضعیت ACCEPTED باشد
//     if (status === 'ACCEPTED' && offerStatus === 'ACCEPTED') {
//       return [{ label: 'Start', action: handleStart, icon: FaPlay, loading: isSubmitting }];
//     }

//     // دکمه Complete: فقط وقتی تسک در وضعیت STARTED باشد
//     if (status === 'STARTED') {
//       return [{ label: 'Complete', action: handleComplete, icon: FaCheckCircle, loading: isSubmitting }];
//     }

//     return [];
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-100 to-blue-200">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
//       </div>
//     );
//   }

//   if (!task) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 text-black w-full py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className={`bg-white rounded-2xl overflow-hidden ${getShadowClass(task)}`}
//         >
//           {/* Header */}
//           <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500 px-6 flex justify-between items-center">
//             <button
//               onClick={() => router.back()}
//               className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition"
//             >
//               <FaArrowLeft /> Back
//             </button>
//             <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
//               {statusLabels[task.status]}
//             </div>
//           </div>

//           <div className="p-6 md:p-8">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
//             {task.category && (
//               <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
//                 <FaTag className="text-green-500" />
//                 <span>{task.category}</span>
//               </div>
//             )}

//             {/* تایمر */}
//             <div className="flex flex-wrap justify-between items-center mb-6">
//               <div className="flex-1" />
//               <div className="flex items-center gap-4">
//                 {(task.status === 'STARTED' || task.status === 'ACCEPTED') && (
//                   <LiveTimer isRunning={timerRunning} onComplete={() => {}} />
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* سمت چپ */}
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <FaFileAlt className="text-green-500 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-gray-700">Description</h3>
//                     <p className="text-gray-600">{task.description || 'No description'}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FaMapMarkerAlt className="text-green-500" />
//                   <div>
//                     <h3 className="font-semibold text-gray-700">Location</h3>
//                     <p className="text-gray-600">{task.location || 'N/A'}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FaDollarSign className="text-green-500" />
//                   <div>
//                     <h3 className="font-semibold text-gray-700">Budget</h3>
//                     <p className="text-gray-800 font-medium">
//                       {task.budget?.toLocaleString() ?? 'N/A'} Toman
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FaCalendarAlt className="text-green-500" />
//                   <div>
//                     <h3 className="font-semibold text-gray-700">Created</h3>
//                     <p className="text-gray-600">{new Date(task.createdAt).toLocaleString()}</p>
//                   </div>
//                 </div>
//                 {task.scheduledAt && (
//                   <div className="flex items-center gap-3">
//                     <FaClock className="text-green-500" />
//                     <div>
//                       <h3 className="font-semibold text-gray-700">Scheduled</h3>
//                       <p className="text-gray-600">{new Date(task.scheduledAt).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* سمت راست */}
//               <div className="bg-gray-50 rounded-xl p-4 space-y-3">
//                 <h3 className="font-bold text-gray-800 border-b pb-2">Client Information</h3>
//                 <div className="flex items-center gap-3">
//                   <FaUser className="text-green-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Name</p>
//                     <p className="font-medium">{task.userName || '—'}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FaPhone className="text-green-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Phone</p>
//                     <p className="font-medium">{task.userPhone || '—'}</p>
//                   </div>
//                 </div>
//                 {task.offerStatus && (
//                   <div className="border-t pt-3 mt-2">
//                     <h4 className="font-semibold text-gray-700 text-sm">Your Offer Status</h4>
//                     <div className="mt-1">
//                       <span className={`px-2 py-1 rounded-full text-xs ${offerStatusColors[task.offerStatus]}`}>
//                         {offerStatusLabels[task.offerStatus]}
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* دکمه‌های اقدام */}
//             <div className="flex flex-wrap gap-3 justify-between items-center mt-8 pt-4 border-t border-gray-200">
//               <div className="flex gap-3">
//                 {availableActions().map((action) => (
//                   <button
//                     key={action.label}
//                     onClick={action.action}
//                     disabled={action.loading}
//                     className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
//                   >
//                     {action.loading ? (
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     ) : (
//                       <>
//                         <action.icon /> {action.label}
//                       </>
//                     )}
//                   </button>
//                 ))}
//                 {task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
//                   <button
//                     onClick={handleCancel}
//                     disabled={isSubmitting}
//                     className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
//                   >
//                     {isSubmitting ? (
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     ) : (
//                       <>
//                         <FaBan /> Cancel
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>
//               <button
//                 onClick={() => router.push('/tasks')}
//                 className="text-gray-500 hover:text-gray-700 underline text-sm"
//               >
//                 ← Back to My Tasks
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

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

type TaskStatus = 'CREATED' | 'ASSIGNED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: number | null;
  status: TaskStatus;
  rawStatus: string;
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
    CUSTOMER_SELECTED: 'ACCEPTED',
    OFFERING: 'ASSIGNED',
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

const LiveTimer = ({ isRunning, onComplete }: { isRunning: boolean; onComplete: () => void }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(isRunning);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds]);

  useEffect(() => {
    setIsActive(isRunning);
  }, [isRunning]);

  useEffect(() => {
    if (!isActive && seconds > 0) onComplete();
  }, [isActive, seconds, onComplete]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
      <FaClock className="text-green-500 text-lg" />
      <span className="text-2xl font-mono font-bold text-gray-700">{formatTime(seconds)}</span>
      {isActive && <span className="text-sm text-green-600 font-medium">⏳ In Progress</span>}
      {!isActive && seconds > 0 && <span className="text-sm text-gray-500">⏱️ Completed</span>}
    </div>
  );
};

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [task, setTask] = useState<TaskWithOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const refreshTask = async () => {
    try {
      const taskRes = await apiClient.get(`/api/tasks/${taskId}`);
      const rawTask = taskRes.data;
      console.log('📦 Refreshed task:', rawTask);
      console.log('📌 rawStatus:', rawTask.status);

      const mappedStatus = mapBackendStatus(rawTask.status);
      const mappedTask: Task = {
        ...rawTask,
        status: mappedStatus,
        rawStatus: rawTask.status,
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
        if (error.response?.status !== 404) {
          console.error('Error fetching offer:', error);
        }
      }

      setTask({ ...mappedTask, offerStatus, offerId });

      if (mappedStatus === 'STARTED') {
        setTimerRunning(true);
      }
      if (mappedStatus === 'COMPLETED') {
        setTimerRunning(false);
      }

      return { mappedStatus, rawStatus: rawTask.status };
    } catch (error) {
      console.error('Error refreshing task:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        await refreshTask();
      } catch (error) {
        console.error('Error fetching task:', error);
        toast.error('مشکل در دریافت اطلاعات تسک');
        router.push('/tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleStart = async () => {
    if (!task) return;
    if (!confirm('آیا می‌خواهید این تسک را شروع کنید؟')) return;
    setIsSubmitting(true);

    try {
      if (task.offerStatus !== 'ACCEPTED') {
        toast.error('پیشنهاد شما هنوز پذیرفته نشده است');
        return;
      }

      let currentRawStatus = task.rawStatus;
      console.log('🔄 Starting with rawStatus:', currentRawStatus);

      if (currentRawStatus === 'CUSTOMER_SELECTED') {
        console.log('➡️ Calling tasker-accept...');
        await apiClient.post(`/api/tasks/${taskId}/tasker-accept`);
        const result = await refreshTask();
        currentRawStatus = result?.rawStatus || task.rawStatus;
        toast.success('تسک توسط شما پذیرفته شد');
      }

      if (currentRawStatus === 'TASKER_ACCEPTED') {
        console.log('➡️ Calling readyToStart...');
        await apiClient.post(`/api/tasks/${taskId}/ready`);
        const result = await refreshTask();
        currentRawStatus = result?.rawStatus || task.rawStatus;
        toast.success('تسک آماده شروع شد');
      }

      if (currentRawStatus === 'READY_TO_START') {
        console.log('➡️ Calling start...');
        await apiClient.post(`/api/tasks/${taskId}/start`);
        const result = await refreshTask();
        currentRawStatus = result?.rawStatus || task.rawStatus;
        setTimerRunning(true);
        toast.success('🚀 تسک با موفقیت شروع شد');
      } else {
        toast.error('وضعیت تسک برای شروع مناسب نیست (نیاز به READY_TO_START)');
      }
    } catch (error: any) {
      console.error('❌ Error in start chain:', error);
      toast.error(error.response?.data?.message || 'خطا در شروع تسک');
      await refreshTask();
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- دکمه Complete ----
  const handleComplete = async () => {
    if (!task) return;
    if (!confirm('آیا مطمئن هستید که این تسک کامل شده است؟')) return;
    setIsSubmitting(true);

    try {
      // بررسی وضعیت: باید rawStatus برابر با 'IN_PROGRESS' باشد
      // یا status برابر با 'STARTED' (که نگاشت شده)
      console.log('🔍 Current rawStatus:', task.rawStatus);
      console.log('🔍 Current mapped status:', task.status);

      if (task.rawStatus !== 'IN_PROGRESS' && task.status !== 'STARTED') {
        toast.error(`تسک در وضعیت مناسب برای تکمیل نیست (وضعیت فعلی: ${task.rawStatus || task.status})`);
        return;
      }

      console.log('➡️ Calling completeTask...');
      const response = await apiClient.post(`/api/tasks/${taskId}/complete`);
      console.log('✅ Complete response:', response.data);

      // بعد از موفقیت، وضعیت را refresh می‌کنیم
      await refreshTask();
      setTimerRunning(false);
      toast.success('🎉 تسک با موفقیت تکمیل شد');
    } catch (error: any) {
      console.error('❌ Error completing task:', error);
      // نمایش پیام خطای دقیق از سرور
      const errorMessage = error.response?.data?.message || 'خطا در تکمیل تسک';
      toast.error(errorMessage);
      // در صورت خطا، دوباره وضعیت را دریافت می‌کنیم تا همگام شود
      await refreshTask();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!task) return;
    if (!confirm('آیا از لغو این تسک مطمئن هستید؟')) return;
    setIsSubmitting(true);
    try {
      await apiClient.patch(`/api/tasks/${taskId}/status`, { status: 'CANCELLED' });
      await refreshTask();
      setTimerRunning(false);
      toast.error('تسک لغو شد');
    } catch (error: any) {
      console.error('Error cancelling task:', error);
      toast.error(error.response?.data?.message || 'خطا در لغو تسک');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableActions = () => {
    if (!task) return [];
    const { status, offerStatus } = task;

    if (offerStatus === null) {
      return [{ label: 'Make Offer', action: () => router.push(`/tasks/${taskId}/offer`), icon: FaCheck }];
    }

    if (offerStatus === 'REJECTED' || offerStatus === 'CANCELLED') return [];

    if (status === 'ACCEPTED' && offerStatus === 'ACCEPTED') {
      return [{ label: 'Start', action: handleStart, icon: FaPlay, loading: isSubmitting }];
    }

    if (status === 'STARTED') {
      return [{ label: 'Complete', action: handleComplete, icon: FaCheckCircle, loading: isSubmitting }];
    }

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

  const handleCompleTask =async ()=>{
try {
      const res = await apiClient.post(`/api/tasks/${taskId}/complete`)
    console.log('res handlw cpmplet task',res)
      await refreshTask();
console.log('task after complet ',task)
} catch (error) {
  console.log(error)
}

  }
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

            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="flex-1" />
              <div className="flex items-center gap-4">
                {(task.status === 'STARTED' || task.status === 'ACCEPTED') && (
                  <LiveTimer isRunning={timerRunning} onComplete={() => {}} />
                )}
              </div>
            </div>

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
              onClick={handleCompleTask}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
              >complet task</button>
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