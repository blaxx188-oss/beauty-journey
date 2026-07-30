"use client";

/**
 * ProductGallery — Image gallery with thumbnails and main image display.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface ProductGalleryProps {
  images: GalleryImage[];
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function ProductGallery({ images, className }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={cn("flex gap-4", className)}>
      {/* Thumbnails (vertical on desktop, horizontal on mobile) */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 order-2 md:order-1 md:flex-col flex-row overflow-x-auto md:overflow-y-auto md:w-16">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all duration-150",
                index === activeIndex
                  ? "border-accent"
                  : "border-border hover:border-accent/50"
              )}
              aria-label={`صورة ${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative flex-1 order-1 md:order-2 aspect-[3/4] rounded-sm overflow-hidden bg-neutral-secondary">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[activeIndex]?.id}
            src={images[activeIndex]?.src}
            alt={images[activeIndex]?.alt}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute start-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-surface/80 rounded-full shadow-md hover:bg-surface transition-colors"
              aria-label="الصورة السابقة"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute end-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-surface/80 rounded-full shadow-md hover:bg-surface transition-colors"
              aria-label="الصورة التالية"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 end-4 px-2.5 py-1 bg-midnight-onyx/60 rounded-sm text-xs text-white">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Zoom hint */}
        <div className="absolute top-4 end-4 w-8 h-8 flex items-center justify-center bg-surface/80 rounded-full opacity-0 hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4 text-text-primary" />
        </div>
      </div>
    </div>
  );
}

ProductGallery.displayName = "ProductGallery";

export { ProductGallery };
export default ProductGallery;
