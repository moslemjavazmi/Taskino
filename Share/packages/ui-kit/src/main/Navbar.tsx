// shared/packages/ui-kit/src/components/Navbar.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export interface NavItem {
  title: string;
  link?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

interface NavbarProps {
  menuItems: NavItem[];
  logoText: string;
  bgColor?: string;
  textColor?: string;
  activeColor?: string;
  rightContent?: React.ReactNode;
}

export default function Navbar({
  menuItems,
  logoText,
  bgColor = 'bg-gradient-to-bl from-gray-100 to-blue-200',
  textColor = 'text-gray-800',
  activeColor = 'text-green-500',
  rightContent,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  // بستن dropdown با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // رندر آیتم منو (برای دسکتاپ)
  const renderDesktopItem = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;
    if (hasChildren) {
      return (
        <div key={item.title} className="relative" ref={dropdownRef}>
          <button
            onClick={() => toggleDropdown(item.title)}
            className={`flex items-center gap-1 ${textColor} hover:${activeColor} transition`}
          >
            {item.icon && <span className="ml-1">{item.icon}</span>}
            {item.title}
            <FiChevronDown
              className={`text-sm transition-transform ${openDropdown === item.title ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {openDropdown === item.title && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20"
              >
                {item.children!.map((child) => (
                  <Link
                    key={child.title}
                    href={child.link || '#'}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 transition"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {child.icon && <span className="ml-2">{child.icon}</span>}
                    {child.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
    return (
      <Link
        key={item.title}
        href={item.link || '#'}
        className={`flex items-center gap-1 ${textColor} hover:${activeColor} transition`}
      >
        {item.icon && <span>{item.icon}</span>}
        {item.title}
      </Link>
    );
  };

  // رندر آیتم منو برای موبایل (همه زیرمنوها به صورت لیست تودرتو باز می‌شوند)
  const renderMobileItem = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const [isOpen, setIsOpen] = useState(false);
    if (hasChildren) {
      return (
        <div key={item.title} className="border-b border-gray-200 py-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-between w-full ${textColor}`}
          >
            <span className="flex items-center gap-2">
              {item.icon && <span>{item.icon}</span>}
              {item.title}
            </span>
            <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="pr-6 mt-2 space-y-2">
              {item.children!.map((child) => (
                <Link
                  key={child.title}
                  href={child.link || '#'}
                  className={`block py-1 ${textColor} hover:${activeColor}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {child.icon && <span className="ml-2">{child.icon}</span>}
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <Link
        key={item.title}
        href={item.link || '#'}
        className={`block py-2 border-b border-gray-200 ${textColor} hover:${activeColor}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.icon && <span className="ml-2">{item.icon}</span>}
        {item.title}
      </Link>
    );
  };

  return (
    <nav className={`w-full ${bgColor} sticky top-0 z-50 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className={`text-xl font-bold ${textColor}`}>
              {logoText}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {menuItems.map((item) => renderDesktopItem(item))}
          </div>

          {/* Right Section */}
          <div className="hidden md:block">{rightContent}</div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${textColor} focus:outline-none`}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md px-4 py-4 shadow-lg"
          >
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => renderMobileItem(item))}
              {rightContent && <div className="pt-4 border-t border-gray-200 mt-2">{rightContent}</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}