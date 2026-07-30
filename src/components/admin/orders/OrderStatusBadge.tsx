import React from "react";
import { Badge } from "@/components/design-system/core/Badge";
import { OrderStatus, PaymentStatus } from "@/types";

interface OrderStatusBadgeProps {
  status: OrderStatus | PaymentStatus;
  type?: "order" | "payment";
}

export function OrderStatusBadge({ status, type = "order" }: OrderStatusBadgeProps) {
  const getStatusConfig = () => {
    if (type === "order") {
      switch (status) {
        case "pending":
          return { label: "قيد الانتظار", variant: "warning" as const };
        case "processing":
          return { label: "جاري التجهيز", variant: "info" as const };
        case "shipped":
          return { label: "تم الشحن", variant: "info" as const };
        case "delivered":
          return { label: "تم التوصيل", variant: "success" as const };
        case "cancelled":
          return { label: "ملغي", variant: "error" as const };
        default:
          return { label: status, variant: "default" as const };
      }
    } else {
      switch (status) {
        case "pending":
          return { label: "في انتظار الدفع", variant: "warning" as const };
        case "paid":
          return { label: "مدفوع", variant: "success" as const };
        case "failed":
          return { label: "فشل الدفع", variant: "error" as const };
        case "refunded":
          return { label: "تم الاسترجاع", variant: "default" as const };
        case "pending_cod":
          return { label: "دفع عند الاستلام", variant: "info" as const };
        default:
          return { label: status, variant: "default" as const };
      }
    }
  };

  const { label, variant } = getStatusConfig();

  return <Badge variant={variant}>{label}</Badge>;
}
