import React from "react";
import type { Metadata } from "next";
import { 
  generatePageMetadata, 
  generateOrganizationSchema, 
  generateWebsiteSchema 
} from "@/utils/seo";

// Import homepage sections
import HeroSection from "@/components/homepage/HeroSection";
import BeautyJourneyMethod from "@/components/homepage/BeautyJourneyMethod";
import BeautyQuizCTA from "@/components/homepage/BeautyQuizCTA";
import FeaturedCategories from "@/components/homepage/FeaturedCategories";
import PersonalizedRecommendations from "@/components/homepage/PersonalizedRecommendations";
import { TrendingProducts } from "@/components/product/TrendingProducts";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import EducationalContent from "@/components/homepage/EducationalContent";
import Testimonials from "@/components/homepage/Testimonials";
import Newsletter from "@/components/homepage/Newsletter";

/**
 * SEO Metadata for Homepage
 */
export const metadata: Metadata = generatePageMetadata({
  title: "Beauty Journey — رحلتك الجمالية",
  description:
    "اكتشفي منتجات العناية بالبشرة والشعر المختارة بعناية. اختبري جمالك الفريد واحصلي على توصيات مخصصة من خبرائنا.",
  path: "/",
  locale: "ar",
  image: "/images/og-image.jpg",
});

/**
 * JSON-LD Structured Data
 */
const organizationSchema = generateOrganizationSchema();
const websiteSchema = generateWebsiteSchema();

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Beauty Journey Method */}
        <BeautyJourneyMethod />

        {/* Beauty Quiz CTA */}
        <BeautyQuizCTA />

        {/* Featured Categories */}
        <FeaturedCategories />

        {/* Personalized Recommendations */}
        <PersonalizedRecommendations />

        {/* Trending Products */}
        <TrendingProducts />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Educational Content */}
        <EducationalContent />

        {/* Testimonials */}
        <Testimonials />

        {/* Newsletter */}
        <Newsletter />
      </main>
    </>
  );
}
