"use client";

/**
 * CartEmptyState — Empty cart state with icon, message, and CTA.
 * Reuses the existing Design System EmptyState component.
 */

import React from "react";
import Link from "next/link";
import { EmptyState } from "@/components/design-system/core/EmptyState";
import { ShoppingBag } from "lucide-react";

export default function CartEmptyState() {
  return (
    <EmptyState
      icon={<ShoppingBag className="w-8 h-8" />}
      title="سلة التسوق فارغة"
      description="اكتشفي منتجاتنا وأضيفيها إلى سلتك لتستمتعي بأفضل تجربة تسوق مع شحن مجاني للطلبات فوق 500 ج.م"
      action={
        <Link
          href="/products"
          className="inline-flex px-8 py-3 text-sm font-medium bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-150"
        >
          تصفحي المنتجات
        </Link>
      }
    />
  );
}
