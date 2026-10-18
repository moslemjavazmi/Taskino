// frontend/app/admin-app/src/app/admin/users-management/page.tsx
'use client';

import { useState } from 'react';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  mobile: string;
  role: string;
  verified: boolean;
  createdAt: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'احمد محمدی', mobile: '09123456789', role: 'ADMIN', verified: true, createdAt: '2026-01-15' },
  { id: '2', name: 'سارا حسینی', mobile: '09129876543', role: 'USER', verified: true, createdAt: '2026-02-10' },
  { id: '3', name: 'رضا کریمی', mobile: '09331234567', role: 'TASKER', verified: false, createdAt: '2026-03-01' },
];

function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = users.filter(u => u.name.includes(searchTerm) || u.mobile.includes(searchTerm));

  const handleDelete = (id: string) => {
    if (confirm('حذف شود؟')) setUsers(prev => prev.filter(u => u.id !== id));
  };

  const renderRoleBadge = (role: string) => {
    const color = role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : role === 'TASKER' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
    const label = role === 'ADMIN' ? 'ادمین' : role === 'TASKER' ? 'تسکر' : 'کاربر';
    return <span className={`px-2 py-1 rounded-full text-xs ${color}`}>{label}</span>;
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="text-black p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">👥 مدیریت کاربران</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gradient-to-b from-[#c7d2d8] via-[#ffffff] to-[#c7d2d8] text-sm border border-gray-200 rounded-lg px-4 py-2 pr-10 w-64"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-[#c7d2d8] via-[#ffffff] to-[#c7d2d8]">
              <tr className="text-left"><th className="p-3">نام</th><th className="p-3">موبایل</th><th className="p-3">نقش</th><th className="p-3">تأیید</th><th className="p-3">تاریخ عضویت</th><th className="p-3 text-center">عملیات</th></tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-t border-gray-400 bg-gradient-to-r from-[#f6f7f7] via-white to-[#f0f1f1]">
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.mobile}</td>
                  <td className="p-3">{renderRoleBadge(user.role)}</td>
                  <td className="p-3">{user.verified ? '✔️ تأیید شده' : '❌ تأیید نشده'}</td>
                  <td className="p-3">{new Date(user.createdAt).toLocaleDateString('fa-IR')}</td>
                  <td className="p-3 text-center space-x-3">
                    <button className="text-indigo-600"><FiEdit size={18} /></button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500"><FiTrash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withAuth(UsersManagementPage, { roles: [UserRole.ADMIN], redirectTo: '/' });