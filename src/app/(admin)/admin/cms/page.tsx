"use client";

import React from "react";
import { Plus, Edit2, Trash2, FileText, Layout, Image as ImageIcon } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_PAGES } from "@/data/admin-mock-data";
import { Button } from "@/components/design-system/core/Button";

export default function AdminCMSPage() {
  const columns = [
    {
      header: "الصفحة",
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">{item.title}</span>
            <span className="text-[10px] text-text-secondary">/{item.slug}</span>
          </div>
        </div>
      ),
    },
    { header: "آخر تعديل", accessor: "lastModified" as const },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader 
        title="إدارة المحتوى (CMS)"
        breadcrumbs={[{ label: "المحتوى" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="p-8 bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm hover:border-accent hover:shadow-md transition-all text-right group">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
            <Layout className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-text-primary">أقسام الصفحة الرئيسية</h3>
          <p className="text-xs text-text-secondary mt-1">تعديل ترتيب ومحتوى الصفحة الرئيسية.</p>
        </button>
        
        <button className="p-8 bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm hover:border-accent hover:shadow-md transition-all text-right group">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-text-primary">البانرات الإعلانية</h3>
          <p className="text-xs text-text-secondary mt-1">إدارة الصور والروابط في السلايدر العلوي.</p>
        </button>

        <button className="p-8 bg-white dark:bg-neutral-primary rounded-3xl border border-border shadow-sm hover:border-accent hover:shadow-md transition-all text-right group">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-text-primary">إضافة صفحة جديدة</h3>
          <p className="text-xs text-text-secondary mt-1">إنشاء صفحة ثابتة جديدة (مثل الأسئلة الشائعة).</p>
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-black text-text-primary">الصفحات الثابتة</h2>
        <AdminDataTable 
          data={ADMIN_MOCK_PAGES}
          columns={columns}
          actions={(item) => (
            <div className="flex items-center gap-2">
              <Button variant="icon" size="sm" className="text-text-secondary hover:text-accent">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="icon" size="sm" className="text-text-secondary hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
