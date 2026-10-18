// // frontend/user-app/src/app/notifications/page.tsx
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaBell, FaCheckCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
// import { formatDistanceToNow } from 'date-fns';

// // Mock notifications (replace with real API later)
// const mockNotifications = [
//   {
//     id: '1',
//     type: 'info',
//     title: 'Task Accepted',
//     message: 'Your task "Fix plumbing" has been accepted by Reza Karimi.',
//     read: false,
//     createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
//   },
//   {
//     id: '2',
//     type: 'success',
//     title: 'Payment Received',
//     message: 'Payment of 250,000 Toman has been received for task #1234.',
//     read: false,
//     createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
//   },
//   {
//     id: '3',
//     type: 'warning',
//     title: 'Task Cancelled',
//     message: 'Tasker cancelled "Home Cleaning" task.',
//     read: true,
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
//   },
// ];

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState(mockNotifications);
//   const [filter, setFilter] = useState<'all' | 'unread'>('all');

//   const filteredNotifs = notifications.filter(n => filter === 'all' || !n.read);

//   const markAsRead = (id: string) => {
//     setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
//   };

//   const markAllAsRead = () => {
//     setNotifications(prev => prev.map(n => ({ ...n, read: true })));
//   };

//   const getIcon = (type: string) => {
//     switch (type) {
//       case 'success': return <FaCheckCircle className="text-green-500" />;
//       case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
//       default: return <FaInfoCircle className="text-blue-500" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//             <h1 className="text-2xl font-bold flex items-center gap-2">
//               <FaBell className="text-green-500" /> Notifications
//             </h1>
//             <div className="flex gap-3">
//               <select
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value as any)}
//                 className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
//               >
//                 <option value="all">All</option>
//                 <option value="unread">Unread</option>
//               </select>
//               <button
//                 onClick={markAllAsRead}
//                 className="text-sm text-indigo-600 hover:text-indigo-800"
//               >
//                 Mark all read
//               </button>
//             </div>
//           </div>
//           <div className="divide-y divide-gray-100">
//             {filteredNotifs.length === 0 && (
//               <div className="py-12 text-center text-gray-500">
//                 No notifications found.
//               </div>
//             )}
//             {filteredNotifs.map((notif) => (
//               <div
//                 key={notif.id}
//                 className={`p-5 hover:bg-gray-50 transition cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
//                 onClick={() => markAsRead(notif.id)}
//               >
//                 <div className="flex gap-3">
//                   <div className="mt-1">{getIcon(notif.type)}</div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-800">{notif.title}</h3>
//                     <p className="text-gray-600 text-sm">{notif.message}</p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       {formatDistanceToNow(notif.createdAt, { addSuffix: true })}
//                     </p>
//                   </div>
//                   {!notif.read && <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


// frontend/user-app/src/app/notifications/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCheckCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
// import { formatDistanceToNow } from 'date-fns';

const mockNotifications = [
  { id: '1', type: 'info', title: 'Task Accepted', message: 'Your task "Fix plumbing" has been accepted by Reza Karimi.', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 5) },
  { id: '2', type: 'success', title: 'Payment Received', message: 'Payment of 250,000 Toman received for task #1234.', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60) },
  { id: '3', type: 'warning', title: 'Task Cancelled', message: 'Tasker cancelled "Home Cleaning" task.', read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter(n => filter === 'all' || !n.read);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    if (type === 'success') return <FaCheckCircle className="text-emerald-400" />;
    if (type === 'warning') return <FaExclamationTriangle className="text-amber-400" />;
    return <FaInfoCircle className="text-blue-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
              <FaBell className="text-emerald-400" /> Notifications
            </h1>
            <div className="flex gap-3">
              <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-sm text-white">
                <option value="all">All</option>
                <option value="unread">Unread</option>
              </select>
              <button onClick={markAllAsRead} className="text-sm text-emerald-400 hover:text-emerald-300">Mark all read</button>
            </div>
          </div>
          <div className="divide-y divide-gray-800">
            {filtered.length === 0 && <div className="py-12 text-center text-gray-400">No notifications.</div>}
            {filtered.map((notif) => (
              <div key={notif.id} className={`p-5 hover:bg-gray-800/50 transition cursor-pointer ${!notif.read ? 'bg-gray-800/30' : ''}`} onClick={() => markAsRead(notif.id)}>
                <div className="flex gap-3">
                  <div className="mt-1">{getIcon(notif.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{notif.title}</h3>
                    <p className="text-gray-400 text-sm">{notif.message}</p>
                    {/* <p className="text-xs text-gray-500 mt-1">{formatDistanceToNow(notif.createdAt, { addSuffix: true })}</p> */}
                  </div>
                  {!notif.read && <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}