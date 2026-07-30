"use client";

import React from "react";
import { Shield, Key, Smartphone, LogOut, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";
import { Switch } from "@/components/design-system/core/Switch";

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="الأمان والخصوصية" 
        description="إدارة كلمة المرور وإعدادات الأمان الخاصة بحسابك."
      />

      <div className="grid grid-cols-1 gap-6">
        {/* Password Change Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary">كلمة المرور</h3>
                <p className="text-sm text-text-secondary mt-1">
                  آخر تغيير منذ 3 أشهر. ننصح بتغييرها دورياً للأمان.
                </p>
              </div>
            </div>
            <Link href="/account/security/change-password">
              <Button variant="outline" className="text-xs border-accent text-accent hover:bg-accent hover:text-white">
                تغيير كلمة المرور
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* 2FA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary">التحقق بخطوتين (2FA)</h3>
                <p className="text-sm text-text-secondary mt-1">
                  إضافة طبقة حماية إضافية لحسابك باستخدام هاتفك المحمول.
                </p>
              </div>
            </div>
            <Switch checked={false} />
          </div>
        </motion.div>

        {/* Active Sessions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h3 className="font-bold text-text-primary">الأجهزة المتصلة</h3>
            <p className="text-sm text-text-secondary">الأجهزة التي قامت بتسجيل الدخول إلى حسابك حالياً.</p>
          </div>
          
          <div className="divide-y divide-border">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-secondary flex items-center justify-center text-text-secondary">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-text-primary">iPhone 13 - القاهرة، مصر</div>
                  <div className="text-xs text-green-600 font-medium">نشط الآن</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px]">هذا الجهاز</Badge>
            </div>
            
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-secondary flex items-center justify-center text-text-secondary">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-text-primary">Chrome on Windows - الجيزة، مصر</div>
                  <div className="text-xs text-text-secondary">آخر نشاط: منذ يومين</div>
                </div>
              </div>
              <button className="text-xs text-red-500 hover:underline">تسجيل الخروج</button>
            </div>
          </div>
          
          <div className="p-4 bg-neutral-secondary/20 text-center">
            <button className="text-sm text-accent font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
              <LogOut className="w-4 h-4" />
              تسجيل الخروج من جميع الأجهزة الأخرى
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Badge({ children, variant = "secondary", className = "" }: { children: React.ReactNode, variant?: "secondary" | "success", className?: string }) {
  const variants = {
    secondary: "bg-neutral-secondary text-text-secondary",
    success: "bg-green-100 text-green-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
