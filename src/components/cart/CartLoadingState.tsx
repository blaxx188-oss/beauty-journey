"use client";

/**
 * CartLoadingState — Loading state for the cart page.
 * Reuses the existing Design System LoadingState component.
 */

import React from "react";
import { LoadingState } from "@/components/design-system/core/LoadingState";

export default function CartLoadingState() {
  return (
    <LoadingState
      message="جاري تحميل سلة التسوق..."
      fullPage
    />
  );
}
