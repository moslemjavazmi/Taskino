// frontend/user-app/src/app/payments/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaReceipt } from 'react-icons/fa';

const mockPayment = {
  id: 'p1', taskId: '1', amount: 250000, status: 'Paid', method: 'Credit Card', transactionId: 'TXN123456', date: '2026-05-20T10:30:00Z',
};

export default function PaymentDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4"><FaReceipt className="text-emerald-400 text-xl" /><h1 className="text-2xl font-bold text-white">Payment Details</h1></div>
          <div className="space-y-3 text-gray-300">
            <p><strong className="text-white">Payment ID:</strong> {id}</p>
            <p><strong className="text-white">Task ID:</strong> {mockPayment.taskId}</p>
            <p><strong className="text-white">Amount:</strong> {mockPayment.amount.toLocaleString()} Toman</p>
            <p><strong className="text-white">Status:</strong> <span className="text-emerald-400">{mockPayment.status}</span></p>
            <p><strong className="text-white">Method:</strong> {mockPayment.method}</p>
            <p><strong className="text-white">Transaction ID:</strong> {mockPayment.transactionId}</p>
            <p><strong className="text-white">Date:</strong> {new Date(mockPayment.date).toLocaleString()}</p>
          </div>
          <button onClick={() => router.back()} className="mt-6 bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-4 py-2 rounded-lg transition">Back</button>
        </motion.div>
      </div>
    </div>
  );
}