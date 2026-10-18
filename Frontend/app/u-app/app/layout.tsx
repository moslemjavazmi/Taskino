
// frontend/app/user-app/src/app/layout.tsx
'use client';
import './globals.css';
import { AuthProvider } from '../lib/Provider';
import Navbar from '../components/main/Navbar';
import Footer from '../components/main/Footer';
import { FaHome, FaUser, FaBriefcase, FaQuestionCircle, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

// منوی کاربر عادی
const userMenuItems = [
  { title: 'خانه', link: '/', icon: <FaHome /> },
  { title: 'تسکرها', link: '/taskers', icon: <FaBriefcase /> },
  {
    title: 'حساب کاربری',
    icon: <FaUser />,
    children: [
      { title: 'پروفایل', link: '/profile' },
      { title: 'سفارشات من', link: '/orders' },
    ],
  },
  { title: 'راهنما', link: '/help', icon: <FaQuestionCircle /> },
];

// محتوای سمت راست (قبل از لاگین)
const rightContent = (
  <Link
    href="/login"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
  >
    <FaSignInAlt /> ورود / ثبت‌نام
  </Link>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar
            menuItems={userMenuItems}
            logoText="تسکی‌نو"
            bgColor="bg-gradient-to-bl from-gray-100 to-blue-200"
            textColor="text-gray-800"
            activeColor="text-green-500"
            rightContent={rightContent}
          />
          <main className="flex-grow">{children}</main>
          <Footer
            logoText="تسکی‌نو"
            links={[
              { title: 'درباره ما', link: '/about' },
              { title: 'قوانین', link: '/rules' },
              { title: 'حریم خصوصی', link: '/privacy' },
              { title: 'تماس با ما', link: '/contact' },
            ]}
            copyrightText="© 2026 تسکی‌نو. تمامی حقوق محفوظ است."
          />
        </AuthProvider>
      </body>
    </html>
  );
}