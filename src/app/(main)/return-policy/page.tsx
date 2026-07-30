import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import { Container } from "@/components/design-system/layout/Container";

export const metadata: Metadata = generatePageMetadata({
  title: "سياسة الإرجاع — Beauty Journey",
  description:
    "اطلعي على سياسة الإرجاع والاستبدال الخاصة بـ Beauty Journey.",
  path: "/return-policy",
  noIndex: true,
});

export default function ReturnPolicyPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">
          سياسة الإرجاع
        </h1>
        <div className="prose prose-lg text-text-secondary space-y-4">
          <p>
            نحرص في Beauty Journey على رضاك التام. إذا لم تكوني راضية عن منتجك، يمكنك إرجاعه خلال 14 يوماً من تاريخ الاستلام.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">شروط الإرجاع</h2>
          <p>يجب أن يكون المنتج غير مفتوح وبحالته الأصلية مع عبوته الكاملة.</p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">طريقة الإرجاع</h2>
          <p>تواصلي مع خدمة العملاء لترتيب عملية الإرجاع. سنقوم برد المبلغ خلال 7-10 أيام عمل.</p>
        </div>
      </div>
    </Container>
  );
}
