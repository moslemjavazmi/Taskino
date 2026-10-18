
// frontend/app/tasker-app/src/app/layout.tsx
'use client';
import './globals.css';
import { AuthProvider } from '../lib/Provider';
import Navbar from '../components/main/Navbar';
import Footer from '../components/main/Footer';
import { FaHome, FaClipboardList, FaUser, FaChartLine, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

// منوی تسکرها
const taskerMenuItems = [
  { title: 'داشبورد', link: '/dashboard', icon: <FaHome /> },
  { title: 'تسک‌های من', link: '/dashboard/tasks', icon: <FaClipboardList /> },
  {
    title: 'حساب کاربری',
    icon: <FaUser />,
    children: [
      { title: 'پروفایل', link: '/profile' },
      { title: 'گزارش درآمد', link: '/earnings', icon: <FaChartLine /> },
    ],
  },
];

const rightContent = (
  <Link
    href="/login"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
  >
    <FaSignInAlt /> ورود به پنل تسکر
  </Link>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar
            menuItems={taskerMenuItems}
            logoText="تسکی‌نو | تسکر"
            bgColor="bg-gradient-to-bl from-gray-100 to-blue-200"
            textColor="text-gray-800"
            activeColor="text-green-500"
            rightContent={rightContent}
          />
          <main className="flex-grow">{children}</main>
          <Footer
            logoText="تسکی‌نو"
            links={[
              { title: 'راهنمای تسکرها', link: '/help/tasker' },
              { title: 'قوانین', link: '/rules' },
              { title: 'تماس با پشتیبانی', link: '/support' },
            ]}
            copyrightText="© 2026 تسکی‌نو. تمامی حقوق محفوظ است."
          />
        </AuthProvider>
      </body>
    </html>
  );
}