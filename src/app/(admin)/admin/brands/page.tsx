"use client";

import React from "react";
import { Plus, Edit2, Trash2, Award } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_BRANDS } from "@/data/admin-mock-data";
import { Button } from "@/components/design-system/core/Button";

export default function AdminBrandsPage() {
  const columns = [
    {
      header: "العلامة التجارية",
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-neutral-secondary/50 overflow-hidden flex items-center justify-center">
            <img src={item.logo} alt={item.name} className="w-8 h-8 object-contain" />
          </div>
          <span className="font-bold text-sm">{item.name}</span>
        </div>
      ),
    },
    { 
      header: "عدد المنتجات", 
      accessor: (item: any) => <span className="font-bold">{item.productCount} منتج</span> 
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="العلامات التجارية"
        breadcrumbs={[{ label: "العلامات التجارية" }]}
        action={{
          label: "إضافة علامة تجارية",
          icon: <Plus className="w-4 h-4" />,
          onClick: () => console.log("Add Brand")
        }}
      />

      <AdminDataTable 
        data={ADMIN_MOCK_BRANDS}
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
