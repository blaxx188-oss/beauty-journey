"use client";

/**
 * CallbackPageContent — Processes Paymob payment callback.
 * Determines success/failure and redirects to the appropriate page.
 */

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckoutLoading } from "@/components/checkout";

export default function CallbackPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("order");
    const success = searchParams.get("success");

    // Small delay to ensure state is ready
    const timer = setTimeout(() => {
      if (success === "true" && orderId) {
        router.push(`/checkout/success?order=${orderId}`);
      } else {
        router.push("/checkout/failed");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <CheckoutLoading stage="processing" />
    </div>
  );
}
