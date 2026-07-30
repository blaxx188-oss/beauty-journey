"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Heart, 
  MapPin, 
  Star, 
  Clock, 
  ChevronLeft,
  ShoppingBag,
  Bell
} from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/lib/auth-context";
import { DashboardHeader } from "@/components/account/DashboardHeader";
import { MOCK_ORDERS, MOCK_NOTIFICATIONS } from "@/data/account-mock-data";
import { Button } from "@/components/design-system/core/Button";
import { Badge } from "@/components/design-system/core/Badge";

export default function AccountPage() {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    {
      label: "إجمالي الطلبات",
      value: "12",
      icon: <Package className="w-5 h-5 text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      label: "في قائمة الأمنيات",
      value: "8",
      icon: <Heart className="w-5 h-5 text-red-500" />,
      bgColor: "bg-red-50",
    },
    {
      label: "تقييماتك",
      value: "5",
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      bgColor: "bg-yellow-50",
    },
    {
      label: "العناوين",
      value: "2",
      icon: <MapPin className="w-5 h-5 text-green-500" />,
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-8">
      <DashboardHeader 
        title={`مرحباً، ${user.user_metadata?.full_name || "عزيزتي"}`}
        description="هنا يمكنك متابعة طلباتك وإدارة إعدادات حسابك بكل سهولة."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-primary p-4 rounded-2xl border border-border shadow-sm"
          >
            <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
            <div className="text-xs text-text-secondary">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-accent" />
              أحدث الطلبات
            </h2>
            <Link href="/account/orders" className="text-sm text-accent hover:underline flex items-center gap-1">
              عرض الكل
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {MOCK_ORDERS.slice(0, 3).map((order) => (
              <div 
                key={order.id}
                className="bg-white dark:bg-neutral-primary p-4 rounded-xl border border-border flex items-center justify-between hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-secondary rounded-lg flex items-center justify-center text-text-secondary">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-text-primary">{order.id}</div>
                    <div className="text-xs text-text-secondary">{order.date}</div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-accent text-sm">{order.total} ج.م</div>
                  <Badge 
                    variant={order.status === 'delivered' ? 'success' : 'default'}
                    className="text-[10px] px-2 py-0"
                  >
                    {order.statusText}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Notifications */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              التنبيهات الأخيرة
            </h2>
            <Link href="/account/notifications" className="text-sm text-accent hover:underline flex items-center gap-1">
              عرض الكل
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {MOCK_NOTIFICATIONS.map((notif) => (
              <div 
                key={notif.id}
                className={`p-4 rounded-xl border transition-colors flex gap-4 ${
                  notif.isRead 
                    ? 'bg-white border-border' 
                    : 'bg-accent/5 border-accent/20'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                  notif.type === 'order' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {notif.type === 'order' ? <Package className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-text-primary truncate">{notif.title}</h3>
                    <span className="text-[10px] text-text-secondary whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-1 mt-1">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
