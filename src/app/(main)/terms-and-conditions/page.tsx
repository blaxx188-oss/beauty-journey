import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import { Container } from "@/components/design-system/layout/Container";

export const metadata: Metadata = generatePageMetadata({
  title: "الشروط والأحكام — Beauty Journey",
  description:
    "اطلعي على الشروط والأحكام الخاصة باستخدام موقع Beauty Journey.",
  path: "/terms-and-conditions",
  noIndex: true,
});

export default function TermsAndConditionsPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">
          الشروط والأحكام
        </h1>
        <div className="prose prose-lg text-text-secondary space-y-4">
          <p>
            باستخدامك لموقع Beauty Journey، فإنك توافق على الشروط والأحكام التالية. يرجى قراءتها بعناية.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">استخدام الموقع</h2>
          <p>يُسمح باستخدام الموقع لأغراض شخصية وغير تجارية فقط.</p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">المنتجات والأسعار</h2>
          <p>نحرص على دقة المعلومات المعروضة، لكن نحتفظ بحق تعديل الأسعار بدون إشعار مسبق.</p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">حقوق الملكية</h2>
          <p>جميع المحتويات والتصاميم محمية بموجب حقوق الملكية الفكرية.</p>
        </div>
      </div>
    </Container>
  );
}
