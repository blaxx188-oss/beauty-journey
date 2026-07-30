"use client";

import React from "react";
import { Shield, Search, Filter, History } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_AUDIT_LOGS } from "@/data/admin-mock-data";
import { formatDate } from "@/utils/format";

export default function AdminAuditLogsPage() {
  const columns = [
    {
      header: "المسؤول",
      accessor: (item: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm">{item.adminName}</span>
          <span className="text-[10px] text-text-secondary">ID: {item.adminId}</span>
        </div>
      ),
    },
    { header: "العملية", accessor: "action" as const },
    {
      header: "الهدف",
      accessor: (item: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold">{item.targetType}</span>
          <span className="text-[10px] text-text-secondary">ID: {item.targetId}</span>
        </div>
      ),
    },
    {
      header: "التفاصيل",
      accessor: (item: any) => (
        <span className="text-sm text-text-secondary">{item.details}</span>
      ),
    },
    {
      header: "التاريخ",
      accessor: (item: any) => (
        <span className="text-sm">{formatDate(item.createdAt)}</span>
      ),
    },
    { header: "عنوان IP", accessor: "ipAddress" as const },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="سجل العمليات (Audit Logs)"
        breadcrumbs={[{ label: "سجل العمليات" }]}
      />

      <AdminDataTable 
        data={ADMIN_MOCK_AUDIT_LOGS} 
        columns={columns}
        selectable={false}
      />
    </div>
  );
}
