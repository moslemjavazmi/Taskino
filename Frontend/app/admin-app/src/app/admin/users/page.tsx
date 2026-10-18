

// // frontend/app/admin-app/src/app/admin/users/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { withAuth } from '@packages/auth-store/src/withAuth';
// import { UserRole } from '@packages/auth-store';
// import { FiEdit, FiTrash2, FiSearch, FiUsers, FiUserCheck } from 'react-icons/fi';
// import { apiClient } from '@packages/api-client';

// // Types
// interface BaseUser {
//   id: string;
//   mobile: string;
//   name: string;
//   verified: boolean;
//   createdAt: string;
// }

// interface FullUser extends BaseUser {
//   role: string;
//   rating?: number;
//   taskerProfile?: {
//     isActive: boolean;
//     hourlyRate: number | null;
//     serviceAreas: string[];
//   } | null;
//   verifications?: { status: string; type: string }[];
// }

// interface Tasker extends BaseUser {
//   isActive: boolean;
//   hourlyRate: number | null;
//   serviceAreas: string[];
//   rating: number;
//   verificationStatus: string;
// }

// function AdminUsersPage() {
//   const [activeTab, setActiveTab] = useState<'all' | 'taskers'>('all');
//   const [allUsers, setAllUsers] = useState<FullUser[]>([]);
//   const [taskers, setTaskers] = useState<Tasker[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<FullUser[]>([]);
//   const [filteredTaskers, setFilteredTaskers] = useState<Tasker[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // دریافت داده‌ها از API
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         if (activeTab === 'all') {
//           const response = await apiClient.get('/api/user/admin/users');
//           setAllUsers(response.data);
//           setFilteredUsers(response.data);
//           console.log('res in all',response)
//         } else {
//           const response = await apiClient.get('/api/user/admin/taskers');
//           setTaskers(response.data);
//           setFilteredTaskers(response.data);
//           console.log('res in taskers',response)

//         }
//       } catch (err: any) {
//         console.error('Error fetching data:', err);
//         setError(err.response?.data?.message || 'خطا در دریافت اطلاعات');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [activeTab]);

//   // فیلتر جستجو
//   useEffect(() => {
//     if (activeTab === 'all') {
//       const filtered = allUsers.filter(user =>
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.mobile.includes(searchTerm)
//       );
//       setFilteredUsers(filtered);
//     } else {
//       const filtered = taskers.filter(tasker =>
//         tasker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         tasker.mobile.includes(searchTerm)
//       );
//       setFilteredTaskers(filtered);
//     }
//   }, [searchTerm, allUsers, taskers, activeTab]);

//   const handleDelete = async (userId: string) => {
//     if (!confirm('آیا از حذف این کاربر اطمینان دارید؟')) return;
//     try {
//       await apiClient.delete(`api/user/admin/users/${userId}`);
//       // به‌روزرسانی لیست
//       if (activeTab === 'all') {
//         setAllUsers(prev => prev.filter(u => u.id !== userId));
//       } else {
//         setTaskers(prev => prev.filter(t => t.id !== userId));
//       }
//     } catch (err) {
//       alert('خطا در حذف کاربر');
//     }
//   };

//   const renderVerifyBadge = (verified: boolean) => (
//     verified ?
//       <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">تأیید شده</span> :
//       <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs">تأیید نشده</span>
//   );

//   const renderRoleBadge = (role: string) => {
//     const classes = {
//       ADMIN: 'bg-purple-100 text-purple-800',
//       TASKER: 'bg-blue-100 text-blue-800',
//       SUPPORT: 'bg-orange-100 text-orange-800',
//       USER: 'bg-gray-100 text-gray-800'
//     };
//     const labels = {
//       ADMIN: 'ادمین',
//       TASKER: 'تسکر',
//       SUPPORT: 'پشتیبان',
//       USER: 'کاربر'
//     };
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs ${classes[role as keyof typeof classes] || classes.USER}`}>
//         {labels[role as keyof typeof labels] || role}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-4 py-6">
//       <div className="text-black p-6">
//         {/* سربرگ با تب */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
//           <div className="flex gap-2 mb-3 sm:mb-0">
//             <button
//               onClick={() => setActiveTab('all')}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
//                 activeTab === 'all'
//                   ? 'bg-green-500 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <FiUsers /> همه کاربران
//             </button>
//             <button
//               onClick={() => setActiveTab('taskers')}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
//                 activeTab === 'taskers'
//                   ? 'bg-green-500 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <FiUserCheck /> تسکرها
//             </button>
//           </div>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="جستجو بر اساس نام یا موبایل..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-gradient-to-b from-[#c7d2d8] via-[#ffffff] to-[#c7d2d8] text-sm border border-gray-200 rounded-lg px-4 py-2 pr-10 w-full sm:w-80"
//             />
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* جدول کاربران */}
//         <div className="overflow-x-auto rounded-xl shadow">
//           <table className="w-full text-sm">
//             <thead className="bg-gradient-to-r from-[#c7d2d8] via-[#ffffff] to-[#c7d2d8]">
//               <tr className="text-left">
//                 <th className="p-3">نام</th>
//                 <th className="p-3">موبایل</th>
//                 <th className="p-3">نقش</th>
//                 <th className="p-3">وضعیت</th>
//                 {activeTab === 'taskers' && (
//                   <>
//                     <th className="p-3">فعال/غیرفعال</th>
//                     <th className="p-3">نرخ ساعتی</th>
//                     <th className="p-3">امتیاز</th>
//                   </>
//                 )}
//                 <th className="p-3">تاریخ عضویت</th>
//                 <th className="p-3 text-center">عملیات</th>
//               </tr>
//             </thead>
//             <tbody>
//               {activeTab === 'all' && filteredUsers.map((user) => (
//                 <tr key={user.id} className="border-t border-gray-400 transition bg-gradient-to-r from-[#f6f7f7] via-[#ffffff] to-[#f0f1f1]">
//                   <td className="p-3 font-medium">{user.name}</td>
//                   <td className="p-3">{user.mobile}</td>
//                   <td className="p-3">{renderRoleBadge(user.role)}</td>
//                   <td className="p-3">{renderVerifyBadge(user.verified)}</td>
//                   <td className="p-3">{new Date(user.createdAt).toLocaleDateString('fa-IR')}</td>
//                   <td className="p-3 text-center space-x-3">
//                     <button className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
//                       <FiEdit size={18} />
//                     </button>
//                     <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 cursor-pointer">
//                       <FiTrash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {activeTab === 'taskers' && filteredTaskers.map((tasker) => (
//                 <tr key={tasker.id} className="border-t border-gray-400 transition bg-gradient-to-r from-[#f6f7f7] via-[#ffffff] to-[#f0f1f1]">
//                   <td className="p-3 font-medium">{tasker.name}</td>
//                   <td className="p-3">{tasker.mobile}</td>
//                   <td className="p-3">{renderRoleBadge('TASKER')}</td>
//                   <td className="p-3">{renderVerifyBadge(tasker.verified)}</td>
//                   <td className="p-3">
//                     {tasker.isActive ?
//                       <span className="text-green-600">فعال</span> :
//                       <span className="text-red-600">غیرفعال</span>
//                     }
//                   </td>
//                   <td className="p-3">{tasker.hourlyRate ? `${tasker.hourlyRate.toLocaleString()} تومان` : '---'}</td>
//                   <td className="p-3">{tasker.rating > 0 ? tasker.rating : '---'}</td>
//                   <td className="p-3">{new Date(tasker.createdAt).toLocaleDateString('fa-IR')}</td>
//                   <td className="p-3 text-center space-x-3">
//                     <button className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
//                       <FiEdit size={18} />
//                     </button>
//                     <button onClick={() => handleDelete(tasker.id)} className="text-red-500 hover:text-red-700 cursor-pointer">
//                       <FiTrash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {(activeTab === 'all' && filteredUsers.length === 0) && (
//             <div className="p-6 text-center text-gray-500">هیچ کاربری یافت نشد</div>
//           )}
//           {(activeTab === 'taskers' && filteredTaskers.length === 0) && (
//             <div className="p-6 text-center text-gray-500">هیچ تسکری یافت نشد</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withAuth(AdminUsersPage, {
//   roles: [UserRole.ADMIN],
//   redirectTo: '/',
// });


// frontend/app/admin-app/src/app/admin/users/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';
import { FiEdit, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { apiClient } from '@packages/api-client';

interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  role: 'ADMIN' | 'USER' | 'TASKER' | 'SUPPORT';
  verified: boolean;
  createdAt: string;
  taskerProfile?: {
    isActive: boolean;
    hourlyRate: number | null;
    serviceAreas: string[];
    rating: number;
  };
  verifications?: { id: string; type: string; status: string; documentUrl?: string }[];
}

function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/api/user/admin/users');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.mobile.includes(term) ||
          (user.email && user.email.toLowerCase().includes(term))
      );
    }
    if (roleFilter !== 'ALL') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }
    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await apiClient.delete(`/api/user/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
    // Navigate to edit page or open modal
  };

  const renderRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      ADMIN: 'bg-purple-100 text-purple-800',
      TASKER: 'bg-blue-100 text-blue-800',
      SUPPORT: 'bg-orange-100 text-orange-800',
      USER: 'bg-gray-100 text-gray-800',
    };
    const labels: Record<string, string> = {
      ADMIN: 'Admin',
      TASKER: 'Tasker',
      SUPPORT: 'Support',
      USER: 'User',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role] || 'bg-gray-100'}`}>
        {labels[role] || role}
      </span>
    );
  };

  const renderVerifyBadge = (verified: boolean) =>
    verified ? (
      <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">Verified</span>
    ) : (
      <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs">Unverified</span>
    );

  const renderDocumentsStatus = (user: User) => {
    if (user.role !== 'TASKER' || !user.verifications?.length) return '—';
    const hasApproved = user.verifications.some((v) => v.status === 'APPROVED');
    const hasPending = user.verifications.some((v) => v.status === 'PENDING');
    if (hasApproved) return <span className="text-green-600 text-sm">Approved</span>;
    if (hasPending) return <span className="text-yellow-600 text-sm">Pending</span>;
    return <span className="text-gray-400 text-sm">Not submitted</span>;
  };

  const renderTaskerInfo = (user: User) => {
    if (user.role !== 'TASKER') return '—';
    const profile = user.taskerProfile;
    if (!profile) return 'Inactive';
    return (
      <div className="text-xs space-y-1">
        <div>
          Status:{' '}
          {profile.isActive ? (
            <span className="text-green-600">Active</span>
          ) : (
            <span className="text-red-600">Inactive</span>
          )}
        </div>
        {profile.hourlyRate && <div>Rate: ${profile.hourlyRate}/hr</div>}
        {profile.rating > 0 && <div>⭐ {profile.rating}</div>}
      </div>
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">👥 Users & Taskers</h1>
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, mobile, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none w-64 text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {/* Role Filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 appearance-none bg-white text-sm"
              >
                <option value="ALL">All Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
                <option value="TASKER">Tasker</option>
                <option value="SUPPORT">Support</option>
              </select>
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-gray-600">
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Verification</th>
                  <th className="px-6 py-4 font-semibold">Documents</th>
                  <th className="px-6 py-4 font-semibold">Tasker Info</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4">
                      <div>{user.mobile}</div>
                      {user.email && <div className="text-xs text-gray-500">{user.email}</div>}
                    </td>
                    <td className="px-6 py-4">{renderRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">{renderVerifyBadge(user.verified)}</td>
                    <td className="px-6 py-4">{renderDocumentsStatus(user)}</td>
                    <td className="px-6 py-4">{renderTaskerInfo(user)}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-indigo-500 hover:text-indigo-700 transition"
                          title="Edit user"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Delete user"
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
          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              No users found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminUsersPage, {
  roles: [UserRole.ADMIN],
  redirectTo: '/',
});