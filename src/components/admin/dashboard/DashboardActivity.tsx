"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Package, 
  UserPlus, 
  CreditCard, 
  AlertCircle,
  ChevronLeft,
  ArrowUpRight,
  Tag,
  FileText
} from "lucide-react";
import { Button } from "@/components/design-system/core/Button";
import { Avatar } from "@/components/design-system/core/Avatar";

const activities = [
  {
    id: 1,
    type: "order",
    title: "طلب جديد #ORD-9921",
    user: "سارة أحمد",
    time: "منذ 5 دقائق",
    amount: "1,250 ج.م",
    icon: <CreditCard className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    type: "customer",
    title: "عميل جديد سجل في المتجر",
    user: "نورا علي",
    time: "منذ 15 دقيقة",
    icon: <UserPlus className="w-4 h-4" />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    type: "inventory",
    title: "نفاذ كمية منتج",
    user: "سيروم فيتامين سي",
    time: "منذ ساعة",
    icon: <AlertCircle className="w-4 h-4" />,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 4,
    type: "order",
    title: "تم شحن الطلب #ORD-9915",
    user: "منى محمود",
    time: "منذ ساعتين",
    icon: <Package className="w-4 h-4" />,
    color: "bg-purple-100 text-purple-600",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden h-full">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="font-bold text-text-primary">أحدث النشاطات</h3>
        <Button variant="ghost" size="sm" className="text-accent text-xs">
          عرض الكل
        </Button>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 hover:bg-neutral-secondary/20 transition-colors flex items-center gap-4 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${activity.color}`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-text-primary truncate">{activity.title}</h4>
                {activity.amount && <span className="text-xs font-black text-accent">{activity.amount}</span>}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-text-secondary">{activity.user}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-[10px] text-text-secondary">{activity.time}</span>
              </div>
            </div>
            <button className="p-2 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const quickActions = [
  { title: "إضافة منتج", icon: <Plus className="w-5 h-5" />, color: "bg-accent", href: "/admin/products/add" },
  { title: "إنشاء كوبون", icon: <Tag className="w-5 h-5" />, color: "bg-purple-500", href: "/admin/coupons" },
  { title: "إدارة المحتوى", icon: <FileText className="w-5 h-5" />, color: "bg-blue-500", href: "/admin/cms" },
];



export function QuickActions() {
  return (
    <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm p-6 h-full">
      <h3 className="font-bold text-text-primary mb-6">إجراءات سريعة</h3>
      <div className="grid grid-cols-1 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.title}
            className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-accent hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${action.color}`}>
                {action.icon}
              </div>
              <span className="font-bold text-sm text-text-primary">{action.title}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
