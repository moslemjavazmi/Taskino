
// frontend/app/admin-app/src/app/admin/taskers/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';
import { FiEdit, FiTrash2, FiSearch, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { apiClient } from '@packages/api-client';
import Link from 'next/link';
interface Tasker {
  id: string;
  name: string;
  mobile: string;
  verified: boolean;
  isActive: boolean;
  hourlyRate: number | null;
  serviceAreas: string[];
  rating: number;
  verificationStatus: 'APPROVED' | 'PENDING' | 'REJECTED' | 'NOT_SUBMITTED';
  createdAt: string;
}

function AdminTaskersPage() {
  const [taskers, setTaskers] = useState<Tasker[]>([]);
  const [filteredTaskers, setFilteredTaskers] = useState<Tasker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  const fetchTaskers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/api/user/admin/taskers');
      setTaskers(response.data);
      setFilteredTaskers(response.data);
    } catch (err: any) {
      console.error('Error fetching taskers:', err);
      setError(err.response?.data?.message || 'Failed to load taskers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskers();
  }, []);

  useEffect(() => {
    let filtered = taskers;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (tasker) =>
          tasker.name.toLowerCase().includes(term) || tasker.mobile.includes(term)
      );
    }
    setFilteredTaskers(filtered);
  }, [searchTerm, taskers]);

  const handleDelete = async (taskerId: string) => {
    if (!confirm('Are you sure you want to delete this tasker?')) return;
    try {
      await apiClient.delete(`/api/user/admin/users/${taskerId}`);
      setTaskers((prev) => prev.filter((t) => t.id !== taskerId));
    } catch (err) {
      alert('Failed to delete tasker');
    }
  };

const handleToggleActive = async (taskerId: string, currentStatus: boolean) => {
  try {
    // ابتدا اطلاعات فعلی تسکر را بگیرید
    const res = await apiClient.get(`/api/user/admin/taskers/${taskerId}`);
    const taskerData = res.data;
    // سپس بروزرسانی با وضعیت جدید
    await apiClient.put(`/api/user/admin/taskers/${taskerId}`, {
      ...taskerData,
      isActive: !currentStatus,
    });
    setTaskers((prev) =>
      prev.map((t) =>
        t.id === taskerId ? { ...t, isActive: !currentStatus } : t
      )
    );
  } catch (err) {
    alert('Failed to update status');
  }
};



  const getVerificationBadge = (status: string) => {
    const styles: Record<string, string> = {
      APPROVED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      REJECTED: 'bg-red-100 text-red-800',
      NOT_SUBMITTED: 'bg-gray-100 text-gray-600',
    };
    const labels: Record<string, string> = {
      APPROVED: 'Approved',
      PENDING: 'Pending',
      REJECTED: 'Rejected',
      NOT_SUBMITTED: 'Not submitted',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-red-500">{error}</div>
    );
  }

  return (
    <div className="w-full px-4 py-6 md:px-8 lg:px-10">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">🔧 Taskers Management</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none w-64 text-sm"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-gray-600">
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Mobile</th>
                  <th className="px-6 py-4 font-semibold">Verification</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Hourly Rate</th>
                  <th className="px-6 py-4 font-semibold">Rating</th>
                  <th className="px-6 py-4 font-semibold">Service Areas</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTaskers.map((tasker) => (
                  <tr key={tasker.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{tasker.name}</td>
                    <td className="px-6 py-4">{tasker.mobile}</td>
                    <td className="px-6 py-4">{getVerificationBadge(tasker.verificationStatus)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(tasker.id, tasker.isActive)}
                        className="flex items-center gap-1 text-sm"
                      >
                        {tasker.isActive ? (
                          <>
                            <FiToggleRight className="text-green-500 text-xl" />
                            <span className="text-green-600">Active</span>
                          </>
                        ) : (
                          <>
                            <FiToggleLeft className="text-gray-400 text-xl" />
                            <span className="text-gray-500">Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {tasker.hourlyRate ? `$${tasker.hourlyRate}/hr` : '—'}
                    </td>
                    <td className="px-6 py-4">{tasker.rating > 0 ? `⭐ ${tasker.rating}` : '—'}</td>
                    <td className="px-6 py-4">
                      {tasker.serviceAreas.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {tasker.serviceAreas.slice(0, 2).map((area) => (
                            <span key={area} className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">
                              {area}
                            </span>
                          ))}
                          {tasker.serviceAreas.length > 2 && (
                            <span className="text-xs text-gray-400">+{tasker.serviceAreas.length - 2}</span>
                          )}
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(tasker.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-3">
                      <Link
                      href={`/admin/taskers/edit/${tasker.id}`}
                    >
                        <button
                          className="text-indigo-500 hover:text-indigo-700 transition cursor-pointer"
                          title="Edit tasker"
                        >
                          <FiEdit size={18} />
                        </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(tasker.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Delete tasker"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTaskers.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              No taskers found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminTaskersPage, {
  roles: [UserRole.ADMIN],
  redirectTo: '/',
});