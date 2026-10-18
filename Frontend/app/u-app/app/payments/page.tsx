// frontend/user-app/src/app/payments/page.tsx
'use client';

import { motion } from 'framer-motion';
import { FaCreditCard, FaEye } from 'react-icons/fa';
import Link from 'next/link';

const payments = [
  { id: 'p1', taskId: '1', amount: 250000, status: 'Paid', date: '2026-05-20' },
  { id: 'p2', taskId: '2', amount: 600000, status: 'Pending', date: '2026-05-19' },
];

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-6 text-white"><FaCreditCard className="text-emerald-400" /> My Payments</h1>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="bg-gray-800/50 text-gray-300"><tr><th className="p-3">Task</th><th>Amount</th><th>Status</th><th>Date</th><th></th></tr></thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} className="border-t border-gray-800">
                    <td className="p-3">Task #{p.taskId}</td><td>{p.amount.toLocaleString()} Toman</td>
                    <td><span className={`px-2 py-1 rounded-full text-xs ${p.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{p.status}</span></td>
                    <td>{p.date}</td>
                    <td><Link href={`/payments/${p.id}`} className="text-emerald-400 hover:text-emerald-300"><FaEye /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}