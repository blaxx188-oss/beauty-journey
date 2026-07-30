"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Download, 
  Calendar, 
  Filter,
  ArrowRight
} from "lucide-react";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { AnalyticsOverview } from "@/components/admin/dashboard/AnalyticsOverview";
import { RecentActivity, QuickActions } from "@/components/admin/dashboard/DashboardActivity";
import { Button } from "@/components/design-system/core/Button";
import { useAuth } from "@/lib/auth-context";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 text-accent mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-widest">لوحة التحكم</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-text-primary">
            مرحباً، {user?.user_metadata?.full_name?.split(" ")[0] || "أدمن"} 👋
          </h1>
          <p className="text-text-secondary mt-2">إليك ملخص سريع لأداء متجرك اليوم.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Button variant="outline" className="gap-2 text-xs">
            <Download className="w-4 h-4" />
            تصدير التقارير
          </Button>
          <Button className="bg-accent text-white gap-2 text-xs shadow-lg shadow-accent/20">
            <Calendar className="w-4 h-4" />
            تخصيص العرض
          </Button>
        </motion.div>
      </div>

      {/* Statistics Grid */}
      <DashboardStats />

      {/* Analytics & Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <AnalyticsOverview />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivity />
        
        {/* Notifications Panel Placeholder */}
        <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-text-primary">تنبيهات النظام</h3>
            <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-1 rounded-full">3 تنبيهات جديدة</span>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "تحديث النظام متاح", desc: "نسخة جديدة من لوحة التحكم متاحة للتثبيت.", type: "info" },
              { title: "خطأ في بوابة الدفع", desc: "فشل الاتصال ببوابة Paymob منذ 10 دقائق.", type: "error" },
              { title: "مراجعة منتجات جديدة", desc: "هناك 5 منتجات جديدة بانتظار الموافقة.", type: "warning" }
            ].map((notif, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-neutral-secondary/20 border border-border/50">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  notif.type === 'error' ? 'bg-red-500' : notif.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">{notif.title}</h4>
                  <p className="text-xs text-text-secondary mt-1">{notif.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-6 text-accent text-xs gap-2">
            مشاهدة جميع التنبيهات
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
