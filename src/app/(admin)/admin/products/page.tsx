"use client";

import React from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Package
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_PRODUCTS } from "@/data/admin-mock-data";
import { Badge } from "@/components/design-system/core/Badge";
import { Button } from "@/components/design-system/core/Button";
import { Dropdown } from "@/components/design-system/core/Dropdown";

export default function AdminProductsPage() {
  const columns = [
    {
      header: "المنتج",
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-secondary/50 overflow-hidden flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">{item.name}</span>
            <span className="text-[10px] text-text-secondary">{item.sku}</span>
          </div>
        </div>
      ),
    },
    { header: "القسم", accessor: "category" as const },
    { header: "العلامة التجارية", accessor: "brand" as const },
    { 
      header: "السعر", 
      accessor: (item: any) => <span className="font-black text-accent">{item.price} ج.م</span> 
    },
    { 
      header: "المخزون", 
      accessor: (item: any) => (
        <span className={item.inventory === 0 ? "text-red-500 font-bold" : ""}>
          {item.inventory} قطعة
        </span>
      )
    },
    {
      header: "الحالة",
      accessor: (item: any) => (
        <Badge variant={item.status === "active" ? "success" : "warning"}>
          {item.status === "active" ? "نشط" : "غير متوفر"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="المنتجات"
        breadcrumbs={[{ label: "المنتجات" }]}
        action={{
          label: "إضافة منتج جديد",
          icon: <Plus className="w-4 h-4" />,
          href: "/admin/products/add"
        }}
      />

      <AdminDataTable 
        data={ADMIN_MOCK_PRODUCTS}
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
