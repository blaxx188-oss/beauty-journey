"use client";

import React from "react";
import { Eye, Download, Filter, MoreHorizontal } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_ORDERS } from "@/data/admin-mock-data";
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge";
import { Button } from "@/components/design-system/core/Button";
import { formatDate } from "@/utils/format";
import Link from "next/link";

export default function AdminOrdersPage() {
  const columns = [
    {
      header: "رقم الطلب",
      accessor: (item: any) => (
        <span className="font-bold text-accent">#{item.id}</span>
      ),
    },
    {
      header: "العميل",
      accessor: (item: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm">{item.customerName}</span>
          <span className="text-[10px] text-text-secondary">{item.customerEmail}</span>
        </div>
      ),
    },
    {
      header: "التاريخ",
      accessor: (item: any) => (
        <span className="text-sm">{formatDate(item.createdAt)}</span>
      ),
    },
    {
      header: "الإجمالي",
      accessor: (item: any) => (
        <span className="font-black">{item.total} ج.م</span>
      ),
    },
    {
      header: "حالة الطلب",
      accessor: (item: any) => (
        <OrderStatusBadge status={item.status} type="order" />
      ),
    },
    {
      header: "حالة الدفع",
      accessor: (item: any) => (
        <OrderStatusBadge status={item.paymentStatus} type="payment" />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="الطلبات"
        breadcrumbs={[{ label: "الطلبات" }]}
        action={
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير CSV
          </Button>
        }
      />

      <AdminDataTable 
        data={ADMIN_MOCK_ORDERS} 
        columns={columns}
        actions={(item) => (
          <div className="flex items-center gap-2">
            <Link href={`/admin/orders/${item.id}`}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="w-4 h-4 text-text-secondary" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4 text-text-secondary" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
