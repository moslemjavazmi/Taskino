// frontend/app/admin-app/src/app/admin/tasks/create/page.tsx
'use client';

import { useState } from 'react';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';

function CreateTaskPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تسک جدید ایجاد شد (داده استاتیک)');
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="text-black p-6 max-w-2xl mx-auto bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">ایجاد تسک جدید</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">عنوان تسک</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">دسته‌بندی</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option value="">انتخاب کنید</option>
              <option value="تعمیرات">تعمیرات</option>
              <option value="نظافت">نظافت</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">بودجه (تومان)</label>
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>
          <button type="submit" className="bg-green-500 text-white w-full py-2 rounded-lg">ایجاد تسک</button>
        </form>
      </div>
    </div>
  );
}

export default withAuth(CreateTaskPage, { roles: [UserRole.ADMIN], redirectTo: '/' });