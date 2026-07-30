"use client";

import React from "react";
import { Plus, Edit2, Trash2, Tag, Ticket } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_COUPONS } from "@/data/admin-mock-data";
import { Badge } from "@/components/design-system/core/Badge";
import { Button } from "@/components/design-system/core/Button";

export default function AdminCouponsPage() {
  const columns = [
    {
      header: "الكوبون",
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
            <Ticket className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-widest">{item.code}</span>
            <span className="text-[10px] text-text-secondary">{item.type === "percentage" ? "خصم مئوي" : "خصم ثابت"}</span>
          </div>
        </div>
      ),
    },
    { 
      header: "قيمة الخصم", 
      accessor: (item: any) => <span className="font-black text-accent">{item.discount}</span> 
    },
    { header: "الاستخدام", accessor: "usage" as const },
    {
      header: "الحالة",
      accessor: (item: any) => (
        <Badge variant={item.status === "active" ? "success" : "error"}>
          {item.status === "active" ? "نشط" : "منتهي"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="كوبونات الخصم"
        breadcrumbs={[{ label: "الكوبونات" }]}
        action={{
          label: "إنشاء كوبون جديد",
          icon: <Plus className="w-4 h-4" />,
          onClick: () => { /* Add Coupon */ }
        }}
      />

      <AdminDataTable 
        data={ADMIN_MOCK_COUPONS}
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
