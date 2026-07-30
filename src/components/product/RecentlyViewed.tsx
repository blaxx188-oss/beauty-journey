"use client";

import React, { useEffect, useState } from "react";
import { RecommendationCarousel } from "@/components/design-system/ecommerce/RecommendationCarousel";
import { PLPProduct, MOCK_PLP_PRODUCTS } from "@/data/plp-mock-data";

export function RecentlyViewed() {
  const [products, setProducts] = useState<PLPProduct[]>([]);

  useEffect(() => {
    const savedIds = localStorage.getItem("recentlyViewed");
    if (savedIds) {
      const ids = JSON.parse(savedIds) as string[];
      // Get products from mock data based on saved IDs
      const viewedProducts = ids
        .map(id => MOCK_PLP_PRODUCTS.find(p => p.id === id))
        .filter((p): p is PLPProduct => !!p);
      setProducts(viewedProducts);
    }
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <RecommendationCarousel 
          title="شاهدتِ مؤخرًا" 
          products={products} 
        />
      </div>
    </div>
  );
}

export function trackProductView(productId: string) {
  if (typeof window === "undefined") return;
  
  const savedIds = localStorage.getItem("recentlyViewed");
  let ids = savedIds ? (JSON.parse(savedIds) as string[]) : [];
  
  // Remove if already exists and add to front
  ids = [productId, ...ids.filter(id => id !== productId)].slice(0, 10);
  localStorage.setItem("recentlyViewed", JSON.stringify(ids));
}
