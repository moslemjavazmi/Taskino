// frontend/user-app/src/app/tasks/accept/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { apiClient } from '@packages/api-client';

export default function AcceptTaskPage() {
  const { id } = useParams();
  const router = useRouter();

const handleAccept = async () => {
  try {
    await apiClient.post(
      `/api/tasks/${id}/assign`,
    );

    toast.success(
      'Task accepted successfully',
    );

    router.push('/tasks');
  } catch (error) {
    toast.error(
      'Failed to accept task',
    );
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 text-center">
          <FaCheckCircle className="text-emerald-400 text-5xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Accept Task</h1>
          <p className="text-gray-400 mb-6">Are you sure you want to accept task #{id}?</p>
          <div className="flex gap-3 justify-center">
            <button onClick={handleAccept} className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-6 py-2 rounded-lg transition">Yes, Accept</button>
            <button onClick={() => router.back()} className="border border-gray-700 px-6 py-2 rounded-lg hover:bg-gray-800 transition text-white">Cancel</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}