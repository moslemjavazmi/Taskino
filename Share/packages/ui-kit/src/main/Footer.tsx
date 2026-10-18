// import React from 'react'

// function Footer() {
//   return (
//     <>
//       {/* فوتر */}
//       <footer className="bg-gradient-to-bl from-gray-100 to-blue-200  text-black mt-12 px-4 py-6 border-t border-gray-800">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             <span className="text-xl font-bold">
//               TASKINO<span className="text-green-400">.IR</span>
//             </span>
//           </div>
//           <div className="flex flex-wrap justify-center gap-6 text-gray-900 text-sm">
//             <a href="#" className="hover:text-gray-900 transition">
//               مرکز کمک
//             </a>
//             <a href="#" className="hover:text-blue-500 transition">
//               قوانین شهر
//             </a>
//             <a href="#" className="hover:text-blue-500 transition">
//               ایمنی
//             </a>
//             <a href="#" className="hover:text-blue-500 transition">
//               وبلاگ
//             </a>
//             <a href="#" className="hover:text-blue-500 transition">
//               درباره ما
//             </a>
//           </div>
//           <div className="mt-4 md:mt-0 text-gray-400 text-sm">
//             © 2026 Taskino Technologies Inc.
//           </div>
//         </div>
//       </footer>
//     </>
//   )
// }

// export default Footer
// shared/packages/ui-kit/src/components/Footer.tsx
'use client';

import Link from 'next/link';

interface FooterLink {
  title: string;
  link: string;
}

interface FooterProps {
  logoText: string;
  links: FooterLink[];
  copyrightText: string;
  bgColor?: string;
  textColor?: string;
}

export default function Footer({
  logoText,
  links,
  copyrightText,
  bgColor = 'bg-gradient-to-bl from-gray-100 to-blue-200',
  textColor = 'text-gray-700',
}: FooterProps) {
  return (
    <footer className={`${bgColor} border-t border-gray-200 mt-auto py-6 px-4`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className={`text-xl font-bold ${textColor}`}>
          {logoText}
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.link}
              className={`${textColor} hover:text-green-500 transition`}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className={`text-xs ${textColor} opacity-75`}>
          {copyrightText}
        </div>
      </div>
    </footer>
  );
}