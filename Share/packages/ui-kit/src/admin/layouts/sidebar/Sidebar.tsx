
// components/admin/Sidebar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserCog,
  FaTasks,
  FaListAlt,
  FaGavel,
  FaCreditCard,
  FaPercent,
  FaBell,
  FaHistory,
  FaCogs,
  FaTimes,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type SubItem = { title: string; link: string; icon: React.ElementType };
type MenuItem = {
  title: string;
  icon: React.ElementType;
  link?: string;
  children?: SubItem[];
};

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: FaTachometerAlt, link: "/admin/dashboard" },
  {
    title: "Users",
    icon: FaUsers,
    children: [
      { title: "Regular Users", link: "/admin/users", icon: FaUsers },
      { title: "Taskers", link: "/admin/taskers", icon: FaUserCog },
      { title: "Verifications", icon: FaCheckCircle, link: "/admin/verifications" },
    ],
  },
  {
    title: "Tasks",
    icon: FaTasks,
    children: [
      { title: "All Tasks", link: "/admin/tasks", icon: FaTasks },
      { title: "Categories", link: "/admin/categories", icon: FaListAlt },
    ],
  },
  {
    title: "Finance",
    icon: FaCreditCard,
    children: [
      { title: "Payments", link: "/admin/payments", icon: FaCreditCard },
      { title: "Commission", link: "/admin/commission", icon: FaPercent },
    ],
  },
  {
    title: "System",
    icon: FaCogs,
    children: [
      { title: "Notifications", link: "/admin/notifications", icon: FaBell },
      { title: "Logs", link: "/admin/logs", icon: FaHistory },
      { title: "Settings", link: "/admin/settings", icon: FaCogs },
    ],
  },
  { title: "Disputes", icon: FaGavel, link: "/admin/disputes" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSubmenu = (idx: number) => {
    setOpenMenus((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const isActive = (link: string) => pathname === link;
  const isChildActive = (children: SubItem[]) => children.some((child) => pathname === child.link);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg hover:scale-110 transition"
        onClick={() => setIsMobileOpen(true)}
      >
        <AiOutlineMenuUnfold size={20} />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
           top-0 left-0 h-screen flex flex-col justify-between
          bg-gradient-to-b from-[#c7d2d8] via-white to-[#c7d2d8]
          text-gray-900 shadow-2xl transition-all duration-300 z-50
          ${isOpen ? "w-64" : "w-16"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        dir="ltr"
      >
        {/* Mobile close */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Logo */}
        <div className={`p-5 border-b border-gray-300 ${!isOpen && "text-center"}`}>
          {isOpen ? (
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-green-600">Task</span>Yar
            </h2>
          ) : (
            <span className="text-green-600 text-2xl">T</span>
          )}
          <p className={`text-xs text-gray-500 mt-1 ${isOpen ? "block" : "hidden"}`}>
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 ">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const hasChildren = !!item.children?.length;
            const isSubmenuOpen = openMenus.includes(idx);
            const activeSelf = item.link ? isActive(item.link) : false;
            const activeChild = hasChildren && isChildActive(item.children!);

            return (
              <div key={idx} >
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(idx)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 
                        ${activeChild ? "bg-green-100 text-green-700" : "hover:bg-gray-300/50 text-gray-700"}
                        ${!isOpen && "justify-center"}
                      `}
                    >
                      <Icon className={`text-lg ${activeChild ? "text-green-600" : "text-gray-600"}`} />
                      {isOpen && (
                        <>
                          <span className="flex-1 text-left text-sm font-medium ">
                            {item.title}
                          </span>
                          <span className="text-xs ">{isSubmenuOpen ? "▲" : "▼"}</span>
                        </>
                      )}
                    </button>
                    <AnimatePresence>
                      {isSubmenuOpen && isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 space-y-1 overflow-hidden "
                        >
                          {item.children!.map((sub, subIdx) => {
                            const SubIcon = sub.icon;
                            const activeSub = isActive(sub.link);
                            return (
                              <li key={subIdx}>
                                <Link
                                  href={sub.link}
                                  className={`
                                    flex items-center gap-2 px-3 py-1 text-sm rounded-lg transition
                                    ${activeSub ? "bg-green-200 text-green-800" : "text-gray-700 hover:bg-gray-300/50"}
                                  `}
                                >
                                  <SubIcon className="text-xs" />
                                  <span>{sub.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href={item.link!}>
                    <div
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 
                        ${activeSelf ? "bg-green-100 text-green-700" : "hover:bg-gray-300/50 text-gray-700"}
                        ${!isOpen && "justify-center"}
                      `}
                    >
                      <Icon className={`text-lg ${activeSelf ? "text-green-600" : "text-gray-600"}`} />
                      {isOpen && <span className="text-sm font-medium">{item.title}</span>}
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Collapse button */}
        <div className="hidden md:flex p-4 justify-end border-t border-gray-300">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 mb-8 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition "
          >
            {isOpen ? <FaArrowAltCircleLeft size={20} /> : <FaArrowAltCircleRight size={20} />}
          </button>
        </div>
      </aside>
    </>
  );
}