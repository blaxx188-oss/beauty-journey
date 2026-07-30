"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight,
  Calendar,
  Download
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { Button } from "@/components/design-system/core/Button";
import { ADMIN_MOCK_REVENUE_DATA } from "@/data/admin-mock-data";
import { motion } from "framer-motion";

export default function AdminReportsPage() {
  const stats = [
    { title: "إجمالي المبيعات", value: "125,450 ج.م", trend: "+12.5%", positive: true, icon: <DollarSign className="w-6 h-6" /> },
    { title: "إجمالي الطلبات", value: "452", trend: "+8.2%", positive: true, icon: <ShoppingBag className="w-6 h-6" /> },
    { title: "عملاء جدد", value: "84", trend: "-2.4%", positive: false, icon: <Users className="w-6 h-6" /> },
    { title: "متوسط قيمة الطلب", value: "278 ج.م", trend: "+5.1%", positive: true, icon: <TrendingUp className="w-6 h-6" /> },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title="التقارير والإحصائيات"
        breadcrumbs={[{ label: "التقارير" }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              آخر 30 يوم
            </Button>
            <Button className="gap-2 bg-accent text-white">
              <Download className="w-4 h-4" />
              تصدير التقرير
            </Button>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-neutral-primary p-6 rounded-3xl border border-border shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                stat.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              }`}>
                {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary font-bold">{stat.title}</p>
              <p className="text-2xl font-black text-text-primary mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-neutral-primary p-8 rounded-3xl border border-border shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">مخطط المبيعات</h3>
            <Button variant="ghost" size="sm" className="text-accent text-xs font-bold">عرض التفاصيل</Button>
          </div>
          <div className="h-64 w-full bg-neutral-secondary/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-border">
            <p className="text-text-secondary text-sm font-bold">مخطط بياني للمبيعات اليومية</p>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-primary p-8 rounded-3xl border border-border shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">أفضل الفئات مبيعاً</h3>
            <Button variant="ghost" size="sm" className="text-accent text-xs font-bold">عرض التفاصيل</Button>
          </div>
          <div className="space-y-4">
            {[
              { name: "العناية بالبشرة", value: 65, color: "bg-accent" },
              { name: "العناية بالشعر", value: 25, color: "bg-blue-500" },
              { name: "المكياج", value: 10, color: "bg-purple-500" },
            ].map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">{cat.name}</span>
                  <span className="text-text-secondary">{cat.value}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-secondary/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    className={`h-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-neutral-secondary/10 flex justify-between items-center">
          <h3 className="font-bold text-text-primary">أكثر المنتجات مبيعاً</h3>
          <Button variant="ghost" size="sm" className="text-accent font-bold">عرض الكل</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="text-sm text-text-secondary border-b border-border">
                <th className="p-6 font-bold">المنتج</th>
                <th className="p-6 font-bold">المبيعات</th>
                <th className="p-6 font-bold text-left">الإيرادات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: "سيروم فيتامين سي", sales: 145, revenue: "65,250 ج.م" },
                { name: "كريم مرطب ليلي", sales: 92, revenue: "55,200 ج.م" },
                { name: "شامبو للشعر المصبوغ", sales: 78, revenue: "27,300 ج.م" },
              ].map((prod, i) => (
                <tr key={i} className="text-sm hover:bg-neutral-secondary/10 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-secondary/50" />
                      <span className="font-bold">{prod.name}</span>
                    </div>
                  </td>
                  <td className="p-6 font-bold">{prod.sales} قطعة</td>
                  <td className="p-6 text-left font-black text-accent">{prod.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
