"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaExchangeAlt, FaCreditCard } from "react-icons/fa";

export default function WalletPage() {
  const [balance] = useState(1250000);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-l from-green-400 to-blue-500 rounded-2xl p-6 text-white text-center mb-6">
        <FaWallet className="text-5xl mx-auto mb-2" />
        <p className="text-lg">موجودی قابل تسویه</p>
        <p className="text-4xl font-bold">{balance.toLocaleString()} تومان</p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
        <h3 className="font-bold">درخواست تسویه حساب</h3>
        <input type="number" placeholder="مبلغ به تومان" className="border rounded-xl p-3 w-full" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} />
        <select className="border rounded-xl p-3 w-full"><option>کارت بانکی به شماره ****۱۲۳۴</option><option>واریز به حساب شبا</option></select>
        <button className="bg-green-500 text-white w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"><FaExchangeAlt /> درخواست تسویه</button>
        <div className="text-sm text-gray-500 text-center">حداقل مبلغ تسویه ۵۰,۰۰۰ تومان</div>
      </div>
    </motion.div>
  );
}