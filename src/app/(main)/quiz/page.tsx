import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import { Container } from "@/components/design-system/layout/Container";
import Image from "next/image";

export const metadata: Metadata = generatePageMetadata({
  title: "اختبري جمالك — Beauty Quiz",
  description:
    "اكتشفي روتين العناية المثالي لك مع اختبار الجمال المخصص من Beauty Journey.",
  path: "/quiz",
});

export default function QuizPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8">
          <Image
            src="/images/quiz-bg.jpg"
            alt="اختبار الجمال"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
          اختبار الجمال
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          اكتشفي روتين العناية المثالي لك من خلال اختبار قصير وممتع. أجيبي على بعض الأسئلة البسيطة وسنقدم لك توصيات مخصصة تناسب نوع بشرتك وشعرك.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed mt-4">
          قريباً جداً — جاري العمل على هذه الميزة!
        </p>
      </div>
    </Container>
  );
}
