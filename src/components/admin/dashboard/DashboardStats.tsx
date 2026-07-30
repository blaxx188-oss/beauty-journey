"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package 
} from "lucide-react";
import { cn } from "@/utils/cn";

interface StatItemProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
  index: number;
}

const stats: Omit<StatItemProps, "index">[] = [
  {
    title: "إجمالي المبيعات",
    value: "124,500 ج.م",
    change: "+12.5%",
    isPositive: true,
    icon: <DollarSign className="w-6 h-6" />,
    color: "bg-green-500",
  },
  {
    title: "إجمالي الطلبات",
    value: "1,240",
    change: "+8.2%",
    isPositive: true,
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    title: "العملاء الجدد",
    value: "145",
    change: "-3.1%",
    isPositive: false,
    icon: <Users className="w-6 h-6" />,
    color: "bg-purple-500",
  },
  {
    title: "المنتجات النشطة",
    value: "482",
    change: "+2.4%",
    isPositive: true,
    icon: <Package className="w-6 h-6" />,
    color: "bg-orange-500",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-neutral-primary p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={cn("p-3 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform", stat.color)}>
              {stat.icon}
            </div>
            <div className={cn(
              "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
              stat.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            )}>
              {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.change}
            </div>
          </div>
          <div>
            <p className="text-sm text-text-secondary font-bold mb-1">{stat.title}</p>
            <h3 className="text-2xl font-black text-text-primary">{stat.value}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
