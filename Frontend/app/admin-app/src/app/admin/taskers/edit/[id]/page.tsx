//Frontend/app/admin-app/src/app/admin/taskers/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';
import { apiClient } from '@packages/api-client';
import { motion } from 'framer-motion';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface TaskerEditForm {
  name: string;
  hourlyRate: number | '';
  serviceAreas: string;
  isActive: boolean;
}

function EditTaskerPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<TaskerEditForm>({
    name: '',
    hourlyRate: '',
    serviceAreas: '',
    isActive: false,
  });

  useEffect(() => {
    const fetchTasker = async () => {
      try {
        const res = await apiClient.get(`/api/user/admin/taskers/${id}`);
        const data = res.data;
        setForm({
          name: data.name || '',
          hourlyRate: data.hourlyRate || '',
          serviceAreas: data.serviceAreas?.join(', ') || '',
          isActive: data.isActive ?? false,
        });
      } catch (err) {
        toast.error('Failed to load tasker data');
      } finally {
        setLoading(false);
      }
    };
    fetchTasker();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.put(`/api/user/admin/taskers/${id}`, {
        name: form.name,
        hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : null,
        serviceAreas: form.serviceAreas.split(',').map(s => s.trim()),
        isActive: form.isActive,
      });
      toast.success('Tasker updated successfully');
      router.push('/admin/taskers'); // ✅ بازگشت به لیست
    } catch (err) {
      toast.error('Failed to update tasker');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/taskers'); // ✅ بازگشت مستقیم به لیست
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-blue-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-2xl font-bold mb-6">Edit Tasker</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Hourly Rate (Toman)</label>
              <input
                type="number"
                name="hourlyRate"
                value={form.hourlyRate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Service Areas (comma separated)</label>
              <input
                type="text"
                name="serviceAreas"
                value={form.serviceAreas}
                onChange={handleChange}
                placeholder="Tehran, Karaj, Shiraz"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-gray-700">Active</label>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <FaArrowLeft /> Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default withAuth(EditTaskerPage, {
  roles: [UserRole.ADMIN],
  redirectTo: '/',
});