"use client";

/**
 * CategoryCard — Editorial-style category card with dark gradient overlay.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { ArrowLeft } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface CategoryCardProps {
  name: string;
  slug: string;
  imageUrl: string;
  count?: number;
  description?: string;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function CategoryCard({
  name,
  slug,
  imageUrl,
  count,
  description,
  className,
}: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative overflow-hidden rounded-sm aspect-[4/5] cursor-pointer",
          className
        )}
      >
        {/* Background Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-onyx/80 via-midnight-onyx/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 start-0 end-0 p-6">
          <h3 className="text-xl font-bold text-white font-heading mb-1 group-hover:text-accent transition-colors duration-300">
            {name}
          </h3>

          {description && (
            <p className="text-sm text-white/70 line-clamp-2 mb-2">{description}</p>
          )}

          <div className="flex items-center gap-2">
            {count !== undefined && (
              <span className="text-xs text-white/60">
                {count} منتج
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              استكشاف
              <ArrowLeft className="w-3 h-3 rtl:rotate-180" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

CategoryCard.displayName = "CategoryCard";

export { CategoryCard };
export default CategoryCard;
