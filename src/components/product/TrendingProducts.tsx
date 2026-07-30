"use client";

import React from "react";
import { RecommendationCarousel } from "@/components/design-system/ecommerce/RecommendationCarousel";
import { MOCK_PLP_PRODUCTS } from "@/data/plp-mock-data";

export function TrendingProducts() {
  // Simulate trending by taking products with high rating/reviews
  const trending = [...MOCK_PLP_PRODUCTS]
    .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 8);

  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <RecommendationCarousel 
          title="الأكثر رواجًا الآن" 
          products={trending} 
        />
      </div>
    </div>
  );
}
