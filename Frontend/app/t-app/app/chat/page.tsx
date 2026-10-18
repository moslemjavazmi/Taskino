"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaPaperPlane } from "react-icons/fa";

const initialMessages = [
  { id: 1, text: "سلام، مشکل یخچال رو توضیح بدید؟", sender: "user", time: "۱۰:۳۰" },
  { id: 2, text: "سلام، بله کمپرسور صدا میده", sender: "me", time: "۱۰:۳۲" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState("");

  const send = () => {
    if (newMsg.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMsg, sender: "me", time: new Date().toLocaleTimeString() }]);
      setNewMsg("");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col h-[70vh]">
      <div className="p-4 border-b flex items-center gap-2"><FaUser className="text-green-500" /> <span className="font-bold">مهدی رضایی (کارفرما)</span></div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs p-3 rounded-xl ${m.sender === "me" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"}`}>
              {m.text}<div className="text-xs opacity-70 mt-1">{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2"><input className="flex-1 border rounded-xl p-2" placeholder="پیام خود را بنویسید..." value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} /><button onClick={send} className="bg-green-500 text-white p-2 rounded-xl"><FaPaperPlane /></button></div>
    </motion.div>
  );
}