import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import { Container } from "@/components/design-system/layout/Container";

export const metadata: Metadata = generatePageMetadata({
  title: "سياسة الخصوصية — Beauty Journey",
  description:
    "اطلعي على سياسة الخصوصية الخاصة بـ Beauty Journey وكيفية حماية بياناتك.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">
          سياسة الخصوصية
        </h1>
        <div className="prose prose-lg text-text-secondary space-y-4">
          <p>آخر تحديث: يناير 2024</p>
          <p>
            نلتزم في Beauty Journey بحماية خصوصيتك وبياناتك الشخصية. هذه السياسة تشرح كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">جمع البيانات</h2>
          <p>نقوم بجمع البيانات التي تقدمها لنا طوعاً عند التسجيل أو الشراء، مثل الاسم والبريد الإلكتروني وعنوان التوصيل.</p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">استخدام البيانات</h2>
          <p>تُستخدم بياناتك لمعالجة الطلبات، تحسين خدماتنا، وإرسال تحديثات ذات صلة إذا وافقت على ذلك.</p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">حماية البيانات</h2>
          <p>نستخدم تقنيات تشفير متقدمة لحماية بياناتك من الوصول غير المصرح به.</p>
        </div>
      </div>
    </Container>
  );
}
