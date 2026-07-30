"use client";

import React from "react";
import { Plus, Edit2, Trash2, Folder } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_CATEGORIES } from "@/data/admin-mock-data";
import { Badge } from "@/components/design-system/core/Badge";
import { Button } from "@/components/design-system/core/Button";

export default function AdminCategoriesPage() {
  const columns = [
    {
      header: "القسم",
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <Folder className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">{item.name}</span>
            <span className="text-[10px] text-text-secondary">/{item.slug}</span>
          </div>
        </div>
      ),
    },
    { 
      header: "عدد المنتجات", 
      accessor: (item: any) => <span className="font-bold">{item.productCount} منتج</span> 
    },
    {
      header: "الحالة",
      accessor: (item: any) => (
        <Badge variant={item.status === "active" ? "success" : "default"}>
          {item.status === "active" ? "نشط" : "مسودة"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="الأقسام"
        breadcrumbs={[{ label: "الأقسام" }]}
        action={{
          label: "إضافة قسم جديد",
          icon: <Plus className="w-4 h-4" />,
          onClick: () => console.log("Add Category")
        }}
      />

      <AdminDataTable 
        data={ADMIN_MOCK_CATEGORIES}
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
  );
}
