"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  ChevronLeft,
  LogOut,
  Bell,
  Star,
  FileText,
  Tag,
  Menu,
  X,
  Sparkles,
  Layout,
  Mail
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuth } from "@/lib/auth-context";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "لوحة التحكم",
    href: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "المنتجات",
    href: "/admin/products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    title: "الأقسام",
    href: "/admin/categories",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    title: "العلامات التجارية",
    href: "/admin/brands",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "الطلبات",
    href: "/admin/orders",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    title: "العملاء",
    href: "/admin/customers",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "التقارير والإحصائيات",
    href: "/admin/reports",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "رسائل العملاء",
    href: "/admin/messages",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    title: "المشتركين",
    href: "/admin/newsletter",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    title: "سجل العمليات",
    href: "/admin/audit-logs",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "المحتوى (CMS)",
    href: "/admin/cms",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "الكوبونات",
    href: "/admin/coupons",
    icon: <Tag className="w-5 h-5" />,
  },
  {
    title: "الإعدادات",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export function AdminSidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 right-0 z-50 w-72 bg-white dark:bg-neutral-primary border-l border-border transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-text-primary leading-none">Beauty Journey</span>
                <span className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">Admin Panel</span>
              </div>
            </Link>
            <button onClick={toggle} className="lg:hidden p-2 text-text-secondary">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl transition-all group relative",
                    isActive
                      ? "bg-accent text-white shadow-lg shadow-accent/20"
                      : "text-text-secondary hover:bg-neutral-secondary hover:text-text-primary"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "transition-colors",
                      isActive ? "text-white" : "text-text-secondary group-hover:text-accent"
                    )}>
                      {item.icon}
                    </span>
                    <span className="font-bold text-sm">{item.title}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute right-0 w-1.5 h-6 bg-white rounded-l-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors group"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
