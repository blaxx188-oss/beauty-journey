import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import { Container } from "@/components/design-system/layout/Container";

export const metadata: Metadata = generatePageMetadata({
  title: "الأسئلة الشائعة — Beauty Journey",
  description:
    "إجابات لأهم الأسئلة حول التوصيل، الدفع، الإرجاع، ومنتجات Beauty Journey.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
          الأسئلة الشائعة
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          تجدين هنا إجابات لأهم الأسئلة حول التوصيل، الدفع، الإرجاع، وغيرها. إذا لم تجدي إجابة، لا تترددي في التواصل معنا.
        </p>
      </div>
    </Container>
  );
}
