import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import { Container } from "@/components/design-system/layout/Container";

export const metadata: Metadata = generatePageMetadata({
  title: "المجلة — Beauty Journey",
  description:
    "اقرئي أحدث المقالات والنصائح في العناية بالبشرة والشعر والمكياج من خبراء Beauty Journey.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
          مجلة Beauty Journey
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          اكتشفي أحدث النصائح والمقالات في عالم الجمال والعناية بالبشرة والشعر. مقالات حصرية من خبراء الجمال تساعدك في بناء روتينك المثالي.
        </p>
      </div>
    </Container>
  );
}
