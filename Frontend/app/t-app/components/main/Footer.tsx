
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