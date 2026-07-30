import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import { Container } from "@/components/design-system/layout/Container";

export const metadata: Metadata = generatePageMetadata({
  title: "الأقسام — Beauty Journey",
  description:
    "تصفحي جميع أقسام Beauty Journey: العناية بالبشرة، العناية بالشعر، المكياج، والعطور.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
          الأقسام
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          تصفحي مجموعتنا الشاملة من منتجات العناية بالبشرة والشعر والمكياج والعطور. اختاري القسم المناسب لاحتياجاتك.
        </p>
      </div>
    </Container>
  );
}
