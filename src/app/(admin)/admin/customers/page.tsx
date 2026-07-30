"use client";

import React from "react";
import { Eye, UserPlus, MoreHorizontal, Mail, Phone } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_CUSTOMERS } from "@/data/admin-mock-data";
import { Badge } from "@/components/design-system/core/Badge";
import { Button } from "@/components/design-system/core/Button";
import { formatDate } from "@/utils/format";
import Link from "next/link";

export default function AdminCustomersPage() {
  const columns = [
    {
      header: "العميل",
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
            {item.fullName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">{item.fullName}</span>
            <span className="text-[10px] text-text-secondary">{item.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "رقم الهاتف",
      accessor: (item: any) => (
        <span className="text-sm">{item.phoneNumber}</span>
      ),
    },
    {
      header: "المستوى",
      accessor: (item: any) => (
        <Badge variant={item.loyaltyTier === "gold" ? "success" : item.loyaltyTier === "platinum" ? "info" : "default"}>
          {item.loyaltyTier === "gold" ? "ذهبي" : item.loyaltyTier === "platinum" ? "بلاتيني" : "فضي"}
        </Badge>
      ),
    },
    {
      header: "عدد الطلبات",
      accessor: (item: any) => (
        <span className="font-bold">{item.ordersCount} طلبات</span>
      ),
    },
    {
      header: "إجمالي الإنفاق",
      accessor: (item: any) => (
        <span className="font-black text-accent">{item.totalSpent} ج.م</span>
      ),
    },
    {
      header: "الحالة",
      accessor: (item: any) => (
        <Badge variant={item.status === "active" ? "success" : "error"}>
          {item.status === "active" ? "نشط" : "محظور"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="العملاء"
        breadcrumbs={[{ label: "العملاء" }]}
        action={
          <Button className="gap-2 bg-accent text-white">
            <UserPlus className="w-4 h-4" />
            إضافة عميل جديد
          </Button>
        }
      />

      <AdminDataTable 
        data={ADMIN_MOCK_CUSTOMERS} 
        columns={columns}
        actions={(item) => (
          <div className="flex items-center gap-2">
            <Link href={`/admin/customers/${item.id}`}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="w-4 h-4 text-text-secondary" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Mail className="w-4 h-4 text-text-secondary" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4 text-text-secondary" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
