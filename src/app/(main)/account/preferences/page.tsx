"use client";

import React from "react";
import { Settings, Globe, Bell, Moon, Shield, Trash2, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";
import { Switch } from "@/components/design-system/core/Switch";
import { Divider } from "@/components/design-system/core/Divider";

export default function PreferencesPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="إعدادات الحساب" 
        description="تخصيص تجربتك وإدارة تفضيلات الحساب والخصوصية."
      />

      <div className="space-y-6">
        {/* General Settings */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-border bg-neutral-secondary/10">
            <h2 className="font-bold text-text-primary flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              الإعدادات العامة
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-text-primary">اللغة (Language)</h3>
                <p className="text-xs text-text-secondary mt-0.5">اختر لغة واجهة التطبيق المفضلة لديك.</p>
              </div>
              <select className="bg-neutral-secondary/30 border-none rounded-lg text-xs font-bold px-4 py-2 focus:ring-2 focus:ring-accent">
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-text-primary">الوضع الليلي (Dark Mode)</h3>
                <p className="text-xs text-text-secondary mt-0.5">تغيير مظهر التطبيق للوضع الليلي المريح للعين.</p>
              </div>
              <Switch checked={false} />
            </div>
          </div>
        </motion.section>

        {/* Notification Settings */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-border bg-neutral-secondary/10">
            <h2 className="font-bold text-text-primary flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              تفضيلات التنبيهات
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-text-primary">تنبيهات البريد الإلكتروني</h3>
                <p className="text-xs text-text-secondary mt-0.5">استلام تحديثات الطلبات والعروض عبر البريد.</p>
              </div>
              <Switch checked={true} />
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-text-primary">تنبيهات الهاتف (SMS)</h3>
                <p className="text-xs text-text-secondary mt-0.5">استلام رسائل نصية عند شحن الطلب.</p>
              </div>
              <Switch checked={true} />
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-text-primary">العروض والخصومات</h3>
                <p className="text-xs text-text-secondary mt-0.5">الحصول على إشعارات بآخر الصيحات والخصومات.</p>
              </div>
              <Switch checked={false} />
            </div>
          </div>
        </motion.section>

        {/* Danger Zone */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-100 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-red-100 bg-red-100/50">
            <h2 className="font-bold text-red-800 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              منطقة الخطر
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm text-red-900">حذف الحساب نهائياً</h3>
                <p className="text-xs text-red-700 mt-0.5">
                  بمجرد حذف حسابك، سيتم مسح جميع بياناتك وطلباتك ولا يمكن استعادتها.
                </p>
              </div>
              <Link href="/account/delete">
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-100">
                  حذف الحساب
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
