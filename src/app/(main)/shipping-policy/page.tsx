import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import { Container } from "@/components/design-system/layout/Container";

export const metadata: Metadata = generatePageMetadata({
  title: "سياسة الشحن — Beauty Journey",
  description:
    "اطلعي على سياسة الشحن والتوصيل الخاصة بـ Beauty Journey.",
  path: "/shipping-policy",
  noIndex: true,
});

export default function ShippingPolicyPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">
          سياسة الشحن
        </h1>
        <div className="prose prose-lg text-text-secondary space-y-4">
          <p>
            نوفر شحن سريع وآمن لجميع محافظات مصر. التوصيل مجاني للطلبات التي تزيد عن 500 جنيه مصري.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">مدة التوصيل</h2>
          <p>القاهرة والجيزة: 1-2 يوم عمل. باقي المحافظات: 3-5 أيام عمل.</p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">تكلفة الشحن</h2>
          <p>60 جنيه مصري للطلبات أقل من 500 جنيه. مجاني للطلبات 500 جنيه فأكثر.</p>
        </div>
      </div>
    </Container>
  );
}
