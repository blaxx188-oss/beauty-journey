"use client";

import React from "react";
import { Mail, Download, Trash2, Send } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { ADMIN_MOCK_SUBSCRIBERS } from "@/data/admin-mock-data";
import { Badge } from "@/components/design-system/core/Badge";
import { Button } from "@/components/design-system/core/Button";
import { formatDate } from "@/utils/format";

export default function AdminNewsletterPage() {
  const columns = [
    {
      header: "البريد الإلكتروني",
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-text-secondary" />
          <span className="font-bold text-sm">{item.email}</span>
        </div>
      ),
    },
    {
      header: "تاريخ الاشتراك",
      accessor: (item: any) => (
        <span className="text-sm">{formatDate(item.subscribedAt)}</span>
      ),
    },
    {
      header: "الحالة",
      accessor: (item: any) => (
        <Badge variant={item.status === "subscribed" ? "success" : "default"}>
          {item.status === "subscribed" ? "مشترك" : "ملغي"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="المشتركين في القائمة البريدية"
        breadcrumbs={[{ label: "المشتركين" }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              تصدير القائمة
            </Button>
            <Button className="gap-2 bg-accent text-white">
              <Send className="w-4 h-4" />
              إرسال حملة بريدية
            </Button>
          </div>
        }
      />

      <AdminDataTable 
        data={ADMIN_MOCK_SUBSCRIBERS} 
        columns={columns}
        actions={(item) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
