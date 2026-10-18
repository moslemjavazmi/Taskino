// import { FiEdit, FiTrash2 } from "react-icons/fi";
// export default function page() {
//     const users = [{
//         name: 'shag',
//         email: 'shag@gmail.com',
//         verify: "yes",
//         createAt:"2026.8.1",
//         role:'user'
//     },
//     {
//         name: 'shag',
//         email: 'shag@gmail.com',
//         verify: "yes",
//         createAt:"2026.8.1",
//         role:'user'
//         },
//     {
//         name: 'shag',
//         email: 'shag@gmail.com',
//         verify: "yes",
//         createAt:"2026.8.1",
//         role:'user'
//     },{
//         name: 'shag',
//         email: 'shag@gmail.com',
//         verify: "yes",
//         createAt:"2026.8.1",
//         role:'user'
//     },
//     {
//         name: 'shag',
//         email: 'shag@gmail.com',
//         verify: "yes",
//         createAt:"2026.8.1",
//         role:'user'
//         },
//     {
//         name: 'shag',
//         email: 'shag@gmail.com',
//         verify: "yes",
//         createAt:"2026.8.1",
//         role:'user'
//     }]
//   return (
//       <div className='flex w-full justify-center'>

//            <div className="text-black p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 ">
//         <h1 className="text-2xl font-bold">👥Search Tasker</h1>
//         <input
//           type="text"
         
//           placeholder="Search Tasker..."
//           className=" bg-gradient-to-b
//         from-[#c7d2d8] via-[#ffffff] to-[#c7d2d8] text-sm border border-gray-200 rounded-lg px-3 py-2 mt-3 mx-2 sm:mt-0 w-full sm:w-64"
//         />
//       </div>

//       <div className="overflow-x-auto rounded-xl shadow ">
//         <table className="w-full text-sm ">
//           <thead className="bg-gradient-to-r
//         from-[#c7d2d8] via-[#ffffff] to-[#c7d2d8]">
//             <tr className=" text-left">
//               <th className="p-3">Name</th>
//               <th className="p-3">Email/Phone</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Verify</th>
//               <th className="p-3">Paper</th>
//               <th className="p-3">Create At</th>
//               <th className="p-3 text-center">Operation</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr
//                 key={user._id}
//                 className="border-t border-gray-400 transition bg-gradient-to-r
//         from-[#f6f7f7] via-[#ffffff] to-[#f0f1f1] hover:text-blue-900"
//               >
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">{user.role} </td>
//                 <td className="p-3">{user.verify} </td>
//                 <td className="p-3">{user.Paper || 'Not send Paper'} </td>
//                 <td className="p-3">{user.createAt} </td>
                
//                 <td className="p-3 text-center space-x-3">
//                   <button
                   
//                     className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
//                   >
//                     <FiEdit size={18} />
//                   </button>
//                   <button
                   
//                     className="text-red-500 hover:text-red-700 cursor-pointer"
//                   >
//                     <FiTrash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {users.length === 0 && (
//           <div className="p-6 text-center text-gray-500">
//             هیچ کاربری یافت نشد
//           </div>
//         )}
//       </div>
//     </div>
//     </div>
//   )
// }


// frontend/app/admin-app/src/app/admin/users/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { withAuth } from '@packages/auth-store/src/withAuth';
import { UserRole } from '@packages/auth-store';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import { apiClient } from '@packages/api-client';

// Types matching backend models
interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  role: string; // ADMIN, USER, TASKER, SUPPORT
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Replace with actual admin endpoint when available
        // const response = await apiClient.get('/api/user/admin/users');
        // setUsers(response.data);
        
        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockUsers: User[] = [
          {
            id: '1',
            name: 'احمد محمدی',
            mobile: '09123456789',
            email: 'ahmad@example.com',
            role: 'ADMIN',
            verified: true,
            createdAt: '2026-01-15',
          },
          {
            id: '2',
            name: 'سارا حسینی',
            mobile: '09129876543',
            email: 'sara@example.com',
            role: 'USER',
            verified: true,
            createdAt: '2026-02-10',
          },
          {
            id: '3',
            name: 'رضا کریمی',
            mobile: '09331234567',
            email: 'reza@example.com',
            role: 'TASKER',
            verified: true,
            createdAt: '2026-01-20',
            taskerProfile: {
              isActive: true,
              hourlyRate: 250000,
              serviceAreas: ['تهران', 'کرج'],
              rating: 4.8,
            },
            verifications: [{ id: 'v1', type: 'identity', status: 'APPROVED', documentUrl: '/docs/id.jpg' }],
          },
          {
            id: '4',
            name: 'مریم علوی',
            mobile: '09901234567',
            email: 'maryam@example.com',
            role: 'TASKER',
            verified: false,
            createdAt: '2026-02-01',
            taskerProfile: {
              isActive: false,
              hourlyRate: null,
              serviceAreas: [],
              rating: 0,
            },
            verifications: [{ id: 'v2', type: 'identity', status: 'PENDING', documentUrl: null }],
          },
          {
            id: '5',
            name: 'علی رضایی',
            mobile: '09111223344',
            email: 'ali@example.com',
            role: 'SUPPORT',
            verified: true,
            createdAt: '2026-01-05',
          },
        ];
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = (userId: string) => {
    if (confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
    // Navigate to edit page or open modal
  };

  const renderVerifyStatus = (verified: boolean) => (
    verified ? (
      <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">تأیید شده</span>
    ) : (
      <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs">تأیید نشده</span>
    )
  );

  const renderPapers = (user: User) => {
    if (user.role === 'TASKER' && user.verifications && user.verifications.length > 0) {
      const hasApproved = user.verifications.some(v => v.status === 'APPROVED');
      const hasPending = user.verifications.some(v => v.status === 'PENDING');
      if (hasApproved) return <span className="text-green-600">تأیید شده</span>;
      if (hasPending) return <span className="text-yellow-600">در انتظار</span>;
      return <span className="text-gray-500">ارسال نشده</span>;
    }
    return <span className="text-gray-400">-</span>;
  };

  const renderTaskerInfo = (user: User) => {
    if (user.role !== 'TASKER') return '-';
    const profile = user.taskerProfile;
    if (!profile) return 'غیرفعال';
    return (
      <div className="text-xs">
        <div>وضعیت: {profile.isActive ? <span className="text-green-600">فعال</span> : <span className="text-red-600">غیرفعال</span>}</div>
        {profile.hourlyRate && <div>نرخ ساعتی: {profile.hourlyRate.toLocaleString()} تومان</div>}
        {profile.rating > 0 && <div>امتیاز: {profile.rating}</div>}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="text-black p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">👥 مدیریت کاربران و تسکرها</h1>
          <div className="relative mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="جستجو بر اساس نام، موبایل یا ایمیل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gradient-to-b from-[#c7d2d8] via-[#ffffff] to-[#c7d2d8] text-sm border border-gray-200 rounded-lg px-4 py-2 pr-10 w-full sm:w-80"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-[#c7d2d8] via-[#ffffff] to-[#c7d2d8]">
              <tr className="text-left">
                <th className="p-3">نام</th>
                <th className="p-3">موبایل / ایمیل</th>
                <th className="p-3">نقش</th>
                <th className="p-3">تأیید</th>
                <th className="p-3">مدارک</th>
                <th className="p-3">اطلاعات تسکر</th>
                <th className="p-3">تاریخ عضویت</th>
                <th className="p-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-400 transition bg-gradient-to-r from-[#f6f7f7] via-[#ffffff] to-[#f0f1f1] hover:text-blue-900"
                >
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">
                    <div>{user.mobile}</div>
                    {user.email && <div className="text-xs text-gray-500">{user.email}</div>}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'TASKER' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'SUPPORT' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'ADMIN' ? 'ادمین' :
                       user.role === 'TASKER' ? 'تسکر' :
                       user.role === 'SUPPORT' ? 'پشتیبان' : 'کاربر'}
                    </span>
                  </td>
                  <td className="p-3">{renderVerifyStatus(user.verified)}</td>
                  <td className="p-3">{renderPapers(user)}</td>
                  <td className="p-3">{renderTaskerInfo(user)}</td>
                  <td className="p-3">{new Date(user.createdAt).toLocaleDateString('fa-IR')}</td>
                  <td className="p-3 text-center space-x-3 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-6 text-center text-gray-500">هیچ کاربری یافت نشد</div>
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