"use client";

/**
 * SuccessPageContent — Order success confirmation view.
 * Displays order number, email confirmation, and next steps.
 */

import React from "react";
import { useSearchParams } from "next/navigation";
import { CheckoutSuccess } from "@/components/checkout";

export default function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "";

  return (
    <div className="container mx-auto px-4 py-6 lg:py-10 max-w-6xl min-h-[60vh] flex items-center justify-center">
      <CheckoutSuccess
        orderNumber={orderNumber}
        isCOD={false}
        email="your@email.com"
      />
    </div>
  );
}
