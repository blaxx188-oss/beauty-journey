"use client";

/**
 * CartErrorState — Error state for the cart page.
 * Reuses the existing Design System ErrorState component.
 */

import React from "react";
import { ErrorState } from "@/components/design-system/core/ErrorState";
import { useCartStore } from "@/stores/cart-store";

export default function CartErrorState() {
  const error = useCartStore((state) => state.error);

  return (
    <ErrorState
      title="حدث خطأ في سلة التسوق"
      message={error || "عذرًا، حدث خطأ أثناء تحميل سلة التسوق. يرجى المحاولة مرة أخرى."}
      onRetry={() => {
        useCartStore.getState().setError(null);
        window.location.reload();
      }}
    />
  );
}
