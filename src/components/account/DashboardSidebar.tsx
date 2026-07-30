"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  Bell,
  Settings,
  Shield,
  LogOut,
  LayoutDashboard,
  Star,
  Trash2,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/design-system/core/Button";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "لوحة التحكم",
    href: "/account",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "الملف الشخصي",
    href: "/account/profile",
    icon: <User className="w-5 h-5" />,
  },
  {
    title: "طلباتي",
    href: "/account/orders",
    icon: <Package className="w-5 h-5" />,
  },
  {
    title: "قائمة الأمنيات",
    href: "/account/wishlist",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    title: "عناوين التوصيل",
    href: "/account/addresses",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    title: "تقييماتي",
    href: "/account/reviews",
    icon: <Star className="w-5 h-5" />,
  },
  {
    title: "التنبيهات",
    href: "/account/notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    title: "الأمان",
    href: "/account/security",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "الإعدادات",
    href: "/account/preferences",
    icon: <Settings className="w-5 h-5" />,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuth();

  return (
    <aside className="w-full lg:w-64 flex flex-col gap-2">
      <div className="bg-white dark:bg-neutral-primary rounded-2xl border border-border overflow-hidden shadow-sm">
        {/* User Brief Info */}
        <div className="p-6 border-b border-border bg-neutral-secondary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user?.user_metadata?.full_name?.[0] || user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-text-primary truncate">
                {user?.user_metadata?.full_name || "عزيزتي"}
              </h3>
              <p className="text-xs text-text-secondary truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                  isActive
                    ? "bg-accent text-white shadow-md shadow-accent/20"
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
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-2 mt-2 border-t border-border">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Quick Actions or Help */}
      <div className="bg-accent/5 rounded-2xl border border-accent/10 p-4 mt-2">
        <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">تحتاجين مساعدة؟</h4>
        <p className="text-xs text-text-secondary mb-3">فريقنا متاح دائماً للإجابة على استفساراتك.</p>
        <Button variant="outline" size="sm" className="w-full text-xs border-accent text-accent hover:bg-accent hover:text-white">
          تحدثي معنا
        </Button>
      </div>
    </aside>
  );
}
