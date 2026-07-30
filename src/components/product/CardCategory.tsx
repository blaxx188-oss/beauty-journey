"use client";

/**
 * CardCategory — Editorial image with Playfair Display overlay and dark gradient.
 * Per spec: BEM naming CardCategory.
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CardCategoryProps {
  name: string;
  slug: string;
  imageUrl: string;
  productCount?: number;
}

export default function CardCategory({
  name,
  slug,
  imageUrl,
  productCount,
}: CardCategoryProps) {
  return (
    <Link href={`/categories/${slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-[4/5] overflow-hidden rounded-sm"
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 right-0 left-0 p-6">
          <h3
            className="text-white text-xl md:text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--font-heading-ar)" }}
          >
            {name}
          </h3>
          {productCount !== undefined && (
            <p className="text-white/70 text-sm">
              {productCount} منتج
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
