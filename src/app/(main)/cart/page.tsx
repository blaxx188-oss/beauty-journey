import React from "react";
import CartPageContent from "./CartPageContent";

import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "سلة التسوق — Beauty Journey",
  description: "راجعي سلة التسوق الخاصة بك في Beauty Journey",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartPageContent />;
}
