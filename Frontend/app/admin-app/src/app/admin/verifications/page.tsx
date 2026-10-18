// frontend/app/admin-app/src/app/admin/verifications/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';
import { apiClient } from '@packages/api-client';
import { FiCheck, FiX, FiEye, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Verification {
  id: string;
  type: string;
  documentUrl: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  userProfile: {
    userId: string;
    name: string | null;
  };
}

function VerificationsPage() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/user/admin/verifications/pending');
      setVerifications(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to load verifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

// frontend/app/admin-app/src/app/admin/verifications/page.tsx
// (همان کد فعلی شما، با اضافه کردن مجدد fetchPending بعد از approve/reject)

const handleApprove = async (id: string) => {
  setProcessingId(id);
  try {
    await apiClient.patch(`/api/user/admin/verifications/${id}/approve`);
    toast.success('Verification approved');
    await fetchPending(); // ← دریافت مجدد لیست
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Approval failed');
  } finally {
    setProcessingId(null);
  }
};

const handleReject = async (id: string) => {
  const reason = prompt('Please enter rejection reason (minimum 3 characters):');
  if (!reason || reason.length < 3) {
    toast.error('Rejection reason is required (min 3 chars)');
    return;
  }
  setProcessingId(id);
  try {
    await apiClient.patch(`/api/user/admin/verifications/${id}/reject`, { reason });
    toast.success('Verification rejected');
    await fetchPending();
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Rejection failed');
  } finally {
    setProcessingId(null);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 md:px-8 lg:px-10">
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">✅ Verification Requests</h1>
          <button
            onClick={fetchPending}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        {verifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center text-gray-500">
            No pending verification requests.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifications.map((ver) => (
              <div key={ver.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {ver.userProfile.name || 'Unnamed User'}
                      </h3>
                      <p className="text-sm text-gray-500">User ID: {ver.userProfile.userId}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Document type:</strong> {ver.type}</p>
                    <p><strong>Submitted at:</strong> {new Date(ver.createdAt).toLocaleString()}</p>
                    {ver.documentUrl && (
                      <Link
                        href={ver.documentUrl}
                        target="_blank"
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <FiEye /> View Document
                      </Link>
                    )}
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => handleApprove(ver.id)}
                      disabled={processingId === ver.id}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition disabled:opacity-50"
                    >
                      <FiCheck /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(ver.id)}
                      disabled={processingId === ver.id}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition disabled:opacity-50"
                    >
                      <FiX /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(VerificationsPage, {
  roles: [UserRole.ADMIN],
  redirectTo: '/',
});