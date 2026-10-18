// frontend/app/admin-app/src/app/admin/categories/page.tsx
'use client';

import { useState } from 'react';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

interface Category {
  id: string;
  name: string;
  icon: string;
  taskCount: number;
  status: 'active' | 'inactive';
}

const mockCategories: Category[] = [
  { id: '1', name: 'تعمیرات', icon: '🔧', taskCount: 124, status: 'active' },
  { id: '2', name: 'نظافت', icon: '🧹', taskCount: 89, status: 'active' },
  { id: '3', name: 'لوله‌کشی', icon: '💧', taskCount: 45, status: 'inactive' },
];

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = categories.filter(cat =>
    cat.name.includes(searchTerm)
  );

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این دسته‌بندی اطمینان دارید؟')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (!newCategoryName.trim()) return;
    if (editingId) {
      setCategories(prev => prev.map(c => c.id === editingId ? { ...c, name: newCategoryName } : c));
    } else {
      const newId = Date.now().toString();
      setCategories([...categories, { id: newId, name: newCategoryName, icon: '📁', taskCount: 0, status: 'active' }]);
    }
    setShowModal(false);
    setNewCategoryName('');
    setEditingId(null);
  };

  const openEdit = (cat: Category) => {
    setEditingId(cat.id);
    setNewCategoryName(cat.name);
    setShowModal(true);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="text-black p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📂 دسته‌بندی تسکرها</h1>
          <div className="flex gap-2 mt-3 sm:mt-0">
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
            <button
              onClick={() => { setEditingId(null); setNewCategoryName(''); setShowModal(true); }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
            >
              <FiPlus /> جدید
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-[#c7d2d8] via-[#ffffff] to-[#c7d2d8]">
              <tr className="text-left">
                <th className="p-3">آیکون</th>
                <th className="p-3">نام دسته</th>
                <th className="p-3">تعداد تسک</th>
                <th className="p-3">وضعیت</th>
                <th className="p-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(cat => (
                <tr key={cat.id} className="border-t border-gray-400 transition bg-gradient-to-r from-[#f6f7f7] via-[#ffffff] to-[#f0f1f1]">
                  <td className="p-3 text-2xl">{cat.icon}</td>
                  <td className="p-3 font-medium">{cat.name}</td>
                  <td className="p-3">{cat.taskCount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${cat.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {cat.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-3">
                    <button onClick={() => openEdit(cat)} className="text-indigo-600 hover:text-indigo-800"><FiEdit size={18} /></button>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700"><FiTrash2 size={18} /></button>
                  </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96">
              <h3 className="text-xl font-bold mb-4">{editingId ? 'ویرایش دسته' : 'دسته جدید'}</h3>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                placeholder="نام دسته"
              />
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-300 py-2 rounded-lg">انصراف</button>
                <button onClick={handleSave} className="flex-1 bg-green-500 text-white py-2 rounded-lg">ذخیره</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(CategoriesPage, { roles: [UserRole.ADMIN], redirectTo: '/' });