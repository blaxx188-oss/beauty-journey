"use client";

import React from "react";
import { 
  ChevronRight, 
  MoveVertical, 
  Plus, 
  Settings, 
  Trash2, 
  Eye,
  Layout,
  Image as ImageIcon,
  Sparkles,
  ShoppingBag,
  MessageSquare
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { Button } from "@/components/design-system/core/Button";
import { motion } from "framer-motion";

export default function AdminHomepageCMSPage() {
  const sections = [
    { id: "hero", title: "البانر الرئيسي (Hero)", icon: <ImageIcon className="w-5 h-5" />, status: "نشط" },
    { id: "categories", title: "الأقسام المميزة", icon: <Layout className="w-5 h-5" />, status: "نشط" },
    { id: "bestsellers", title: "الأكثر مبيعاً", icon: <ShoppingBag className="w-5 h-5" />, status: "نشط" },
    { id: "method", title: "منهج بيوتي جيرني", icon: <Sparkles className="w-5 h-5" />, status: "نشط" },
    { id: "testimonials", title: "آراء العميلات", icon: <MessageSquare className="w-5 h-5" />, status: "نشط" },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title="تنسيق الصفحة الرئيسية"
        breadcrumbs={[
          { label: "المحتوى", href: "/admin/cms" },
          { label: "الصفحة الرئيسية" }
        ]}
        action={{
          label: "معاينة المتجر",
          icon: <Eye className="w-4 h-4" />,
          href: "/"
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-text-primary">ترتيب الأقسام</h3>
              <p className="text-xs text-text-secondary">اسحبي الأقسام لتغيير ترتيب ظهورها</p>
            </div>
            <div className="p-6 space-y-3">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-neutral-secondary/20 border border-border rounded-2xl group hover:border-accent transition-all cursor-move"
                >
                  <div className="flex items-center gap-4">
                    <MoveVertical className="w-5 h-5 text-text-secondary group-hover:text-accent" />
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-text-secondary shadow-sm">
                      {section.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-text-primary">{section.title}</h4>
                      <span className="text-[10px] text-green-600 font-bold">{section.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="icon" size="sm" className="text-text-secondary hover:text-accent">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="icon" size="sm" className="text-text-secondary hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              
              <button className="w-full p-4 border-2 border-dashed border-border rounded-2xl text-text-secondary font-bold text-sm hover:border-accent hover:text-accent hover:bg-accent/5 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة قسم جديد
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-text-primary">إعدادات عامة</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-primary">لون الخلفية الأساسي</label>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-secondary border border-border cursor-pointer ring-2 ring-accent ring-offset-2" />
                  <div className="w-8 h-8 rounded-full bg-white border border-border cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 cursor-pointer" />
                </div>
              </div>
              <Button className="w-full bg-accent text-white">حفظ التعديلات</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
