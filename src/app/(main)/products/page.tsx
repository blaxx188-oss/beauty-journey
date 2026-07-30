import React from "react";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import ProductsPageContent from "./ProductsPageContent";

export const metadata: Metadata = generatePageMetadata({
  title: "المنتجات — Beauty Journey",
  description: "تصفحي مجموعتنا الواسعة من منتجات العناية بالبشرة والشعر والمكياج.",
  path: "/products",
  locale: "ar",
});

export default function ProductsPage() {
  return <ProductsPageContent />;
}
