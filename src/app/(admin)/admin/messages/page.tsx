"use client";

import React from "react";
import { Mail, Eye, Trash2, CheckCircle, Reply } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_MESSAGES } from "@/data/admin-mock-data";
import { Badge } from "@/components/design-system/core/Badge";
import { Button } from "@/components/design-system/core/Button";
import { formatDate } from "@/utils/format";

export default function AdminMessagesPage() {
  const columns = [
    {
      header: "المرسل",
      accessor: (item: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm">{item.name}</span>
          <span className="text-[10px] text-text-secondary">{item.email}</span>
        </div>
      ),
    },
    { header: "الموضوع", accessor: "subject" as const },
    {
      header: "الرسالة",
      accessor: (item: any) => (
        <span className="text-sm line-clamp-1 max-w-xs">{item.message}</span>
      ),
    },
    {
      header: "التاريخ",
      accessor: (item: any) => (
        <span className="text-sm">{formatDate(item.createdAt)}</span>
      ),
    },
    {
      header: "الحالة",
      accessor: (item: any) => (
        <Badge variant={item.status === "new" ? "error" : item.status === "read" ? "info" : "success"}>
          {item.status === "new" ? "جديد" : item.status === "read" ? "مقروء" : "تم الرد"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="رسائل العملاء"
        breadcrumbs={[{ label: "الرسائل" }]}
      />

      <AdminDataTable 
        data={ADMIN_MOCK_MESSAGES} 
        columns={columns}
        actions={(item) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="w-4 h-4 text-text-secondary" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Reply className="w-4 h-4 text-text-secondary" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
