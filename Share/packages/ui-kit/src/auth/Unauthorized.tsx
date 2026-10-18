// shared/packages/ui-kit/src/auth/Unauthorized.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';

export default function UnauthorizedPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
          <FaLock className="text-red-500 text-4xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">دسترسی غیرمجاز</h1>
        <p className="text-gray-500 mb-6">
          شما مجوز دسترسی به این صفحه را ندارید.
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
        >
          بازگشت
        </button>
      </div>
    </div>
  );
}