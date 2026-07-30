"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProductCard, ProductCardProps } from "./ProductCard";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface RecommendationCarouselProps {
  title: string;
  products: ProductCardProps[];
  onAddToCart?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
}

export function RecommendationCarousel({
  title,
  products,
  onAddToCart,
  onWishlistToggle,
}: RecommendationCarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all"
            aria-label="السابق"
          >
            <ChevronRight className="w-5 h-5" /> {/* RTL: Right arrow is "previous" */}
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all"
            aria-label="التالي"
          >
            <ChevronLeft className="w-5 h-5" /> {/* RTL: Left arrow is "next" */}
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] snap-start">
            <ProductCard
              {...product}
              onAddToCart={onAddToCart}
              onWishlistToggle={onWishlistToggle}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
