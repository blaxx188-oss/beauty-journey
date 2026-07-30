"use client";

/**
 * FailedPageContent — Order failure view with retry and navigation options.
 */

import React from "react";
import { useRouter } from "next/navigation";
import { CheckoutFailed } from "@/components/checkout";

export default function FailedPageContent() {
  const router = useRouter();

  const handleRetry = () => {
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-6 lg:py-10 max-w-6xl min-h-[60vh] flex items-center justify-center">
      <CheckoutFailed
        error="حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى."
        onRetry={handleRetry}
      />
    </div>
  );
}
