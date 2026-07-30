/**
 * Checkout Layout — Wraps checkout pages with the CheckoutProvider.
 */

import React from "react";
import { CheckoutProvider } from "@/components/checkout";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
