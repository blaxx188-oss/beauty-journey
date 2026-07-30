import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";
import { Container } from "@/components/design-system/layout/Container";

export const metadata: Metadata = generatePageMetadata({
  title: "من نحن — Beauty Journey",
  description:
    "تعرفي على Beauty Journey — وجهتك الفاخرة للعناية بالبشرة والشعر في مصر. اكتشفي قصتنا ورؤيتنا.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
          من نحن
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed mb-8">
          Beauty Journey هي وجهتك الفاخرة للعناية بالبشرة والشعر في مصر. نؤمن بأن كل امرأة تستحق منتجات عالية الجودة ونصائح مخصصة تناسب بشرتها وشعرها الفريد.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed mb-8">
          نختار منتجاتنا بعناية فائقة من أفضل العلامات التجارية العالمية والمحلية، ونقدم استشارات خبراء الجمال لمساعدتك في بناء روتين عناية مثالي.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          مهمتنا هي أن نجعل رحلة الجمال تجربة ممتعة ومخصصة لكل امرأة.
        </p>
      </div>
    </Container>
  );
}
