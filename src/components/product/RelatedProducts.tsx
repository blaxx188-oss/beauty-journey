"use client";

import React from "react";
import { RecommendationCarousel } from "@/components/design-system/ecommerce/RecommendationCarousel";
import { PLPProduct, MOCK_PLP_PRODUCTS } from "@/data/plp-mock-data";

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  // Find related products based on category
  const related = MOCK_PLP_PRODUCTS
    .filter(p => p.id !== currentProductId && (category ? p.productType.includes(category) || p.brand === category : true))
    .slice(0, 8);

  if (related.length === 0) return null;

  return (
    <div className="bg-soft-pearl">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <RecommendationCarousel 
          title="منتجات ذات صلة" 
          products={related} 
        />
      </div>
    </div>
  );
}
