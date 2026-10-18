// // // frontend/user-app/src/app/tasks/create/page.tsx
// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { motion } from 'framer-motion';
// // import { FaSave, FaArrowLeft } from 'react-icons/fa';
// // import toast from 'react-hot-toast';
// // import { apiClient } from '@packages/api-client';

// // export default function CreateTaskPage() {
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(false);
// //   const [form, setForm] = useState({ title: '', category: '', description: '', budget: '', location: '' });

// //   const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!form.title.trim()) { toast.error('Title required'); return; }
// //     if (!form.budget || parseInt(form.budget) <= 0) { toast.error('Valid budget required'); return; }
// //     setLoading(true);
// //     try {
// //       // await apiClient.post('/api/tasks', { title: form.title, description: form.description, location: form.location, budget: parseInt(form.budget) });
// //       await new Promise(resolve => setTimeout(resolve, 1000));
// //       toast.success('Task created successfully!');
// //       router.push('/tasks');
// //     } catch (err) { toast.error('Failed to create task'); } finally { setLoading(false); }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
// //       <div className="max-w-2xl mx-auto">
// //         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-8">
// //           <h1 className="text-2xl font-bold text-center text-white mb-6">Create New Task</h1>
// //           <form onSubmit={handleSubmit} className="space-y-5">
// //             <div><label className="block text-gray-300 mb-1">Task Title *</label><input type="text" name="title" value={form.title} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none" required /></div>
// //             <div><label className="block text-gray-300 mb-1">Category *</label><select name="category" value={form.category} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" required><option value="">Select</option><option>Repairs</option><option>Cleaning</option><option>Plumbing</option><option>Electrical</option><option>Other</option></select></div>
// //             <div><label className="block text-gray-300 mb-1">Description</label><textarea name="description" rows={3} value={form.description} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"></textarea></div>
// //             <div><label className="block text-gray-300 mb-1">Budget (Toman) *</label><input type="number" name="budget" value={form.budget} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" required /></div>
// //             <div><label className="block text-gray-300 mb-1">Location</label><input type="text" name="location" value={form.location} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="Address or area" /></div>
// //             <div className="flex justify-end gap-3 pt-4"><button type="button" onClick={() => router.back()} className="flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 text-white"><FaArrowLeft /> Cancel</button><button type="submit" disabled={loading} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-6 py-2 rounded-lg transition disabled:opacity-50"><FaSave /> {loading ? 'Creating...' : 'Create Task'}</button></div>
// //           </form>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { FaSave, FaArrowLeft } from 'react-icons/fa';
// import toast from 'react-hot-toast';
// import { apiClient } from '@packages/api-client';

// export default function CreateTaskPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ title: '', category: '', description: '', budget: '', location: '' });

//   const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.title.trim()) {
//       toast.error('Title required');
//       return;
//     }
//     if (!form.budget || parseInt(form.budget) <= 0) {
//       toast.error('Valid budget required');
//       return;
//     }
//     setLoading(true);
//     try {
//       const payload = {
//         title: form.title,
//         description: form.description || '',
//         location: form.location || '',
//         // بودجه فعلاً در مدل Task وجود ندارد (می‌توان بعداً اضافه کرد)
//       };
//       const response = await apiClient.post('/api/tasks', payload);
//       if (response.status === 201) {
//         toast.success('Task created successfully!');
//         router.push('/tasks');
//       } else {
//         throw new Error('Unexpected response');
//       }
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err.response?.data?.message || 'Failed to create task');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
//       <div className="max-w-2xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-8">
//           <h1 className="text-2xl font-bold text-center text-white mb-6">Create New Task</h1>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div><label className="block text-gray-300 mb-1">Task Title *</label><input type="text" name="title" value={form.title} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none" required /></div>
//             <div><label className="block text-gray-300 mb-1">Category *</label><select name="category" value={form.category} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" required><option value="">Select</option><option>Repairs</option><option>Cleaning</option><option>Plumbing</option><option>Electrical</option><option>Other</option></select></div>
//             <div><label className="block text-gray-300 mb-1">Description</label><textarea name="description" rows={3} value={form.description} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"></textarea></div>
//             <div><label className="block text-gray-300 mb-1">Budget (Toman) *</label><input type="number" name="budget" value={form.budget} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" required /></div>
//             <div><label className="block text-gray-300 mb-1">Location</label><input type="text" name="location" value={form.location} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white" placeholder="Address or area" /></div>
//             <div className="flex justify-end gap-3 pt-4"><button type="button" onClick={() => router.back()} className="flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 text-white"><FaArrowLeft /> Cancel</button><button type="submit" disabled={loading} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-6 py-2 rounded-lg transition disabled:opacity-50"><FaSave /> {loading ? 'Creating...' : 'Create Task'}</button></div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// // // frontend/user-app/src/app/tasks/create/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

import { apiClient } from '@packages/api-client';

type FormState = {
  title: string;
  category: string;
  description: string;
  budget: string;
  location: string;
};

export default function CreateTaskPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    title: '',
    category: '',
    description: '',
    budget: '',
    location: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error('Title required');
      return;
    }

    if (!form.budget || Number(form.budget) <= 0) {
      toast.error('Valid budget required');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title,
        description: form.description,
        location: form.location,
      };

      console.log('PAYLOAD:', payload);

      const response = await apiClient.post(
        '/api/tasks',
        payload,
      );

      console.log('TASK RESPONSE:', response.data);

      toast.success('Task created successfully');

      router.push('/tasks');
    } catch (error: any) {
      console.error('CREATE TASK ERROR:', error);

      toast.error(
        error?.response?.data?.message ||
          'Failed to create task',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 p-8"
        >
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Create New Task
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-gray-300 mb-1">
                Task Title *
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">
                Category *
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Select</option>
                <option>Repairs</option>
                <option>Cleaning</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">
                Description
              </label>

              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">
                Budget (Toman) *
              </label>

              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Address or area"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 text-white"
              >
                <FaArrowLeft />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                <FaSave />

                {loading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}