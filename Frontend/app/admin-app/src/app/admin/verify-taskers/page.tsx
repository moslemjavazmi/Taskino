// frontend/app/admin-app/src/app/admin/verify-taskers/page.tsx
'use client';

import { useState } from 'react';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';
import { FiCheck, FiX, FiEye } from 'react-icons/fi';

interface TaskerVerification {
  id: string;
  name: string;
  mobile: string;
  documentType: string;
  documentUrl: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockVerifications: TaskerVerification[] = [
  { id: '1', name: 'رضا کریمی', mobile: '09331234567', documentType: 'کارت ملی', documentUrl: '/docs/id1.jpg', submittedAt: '۱۴۰۳/۰۱/۱۵', status: 'pending' },
  { id: '2', name: 'سارا حسینی', mobile: '09129876543', documentType: 'مدرک تحصیلی', documentUrl: '/docs/cert.jpg', submittedAt: '۱۴۰۳/۰۱/۱۴', status: 'pending' },
];

function VerifyTaskersPage() {
  const [list, setList] = useState<TaskerVerification[]>(mockVerifications);

  const handleApprove = (id: string) => {
    setList(prev => prev.map(item => item.id === id ? { ...item, status: 'approved' } : item));
  };
  const handleReject = (id: string) => {
    setList(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected' } : item));
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="text-black p-6">
        <h1 className="text-2xl font-bold mb-6">✅ تأیید تسکرها</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.mobile}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : item.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {item.status === 'pending' ? 'در انتظار' : item.status === 'approved' ? 'تأیید شده' : 'رد شده'}
                </span>
              </div>
              <div className="mt-4 text-sm">
                <p><strong>نوع مدرک:</strong> {item.documentType}</p>
                <p><strong>تاریخ ارسال:</strong> {item.submittedAt}</p>
                <button className="text-blue-600 flex items-center gap-1 mt-2"><FiEye /> مشاهده مدرک</button>
              </div>
              {item.status === 'pending' && (
                <div className="flex gap-3 mt-4">
                  <button onClick={() => handleApprove(item.id)} className="flex-1 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"><FiCheck /> تأیید</button>
                  <button onClick={() => handleReject(item.id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"><FiX /> رد</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withAuth(VerifyTaskersPage, { roles: [UserRole.ADMIN], redirectTo: '/' });