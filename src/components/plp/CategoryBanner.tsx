"use client";

/**
 * CategoryBanner — Hero banner for the products listing page.
 * Displays category title, description, and optional background image.
 */

import React from "react";
import { motion } from "framer-motion";

export default function CategoryBanner() {
  return (
    <motion.div
      className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-r from-accent/20 to-accent/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Image (optional) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/categories/skincare.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 rtl:from-black/40 rtl:to-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-start justify-center px-6 md:px-10 text-white">
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4"
          style={{ fontFamily: "var(--font-heading-ar)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          المنتجات
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-white/90 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          استكشفي مجموعتنا الواسعة من منتجات العناية بالبشرة والشعر والمكياج المختارة بعناية.
        </motion.p>
      </div>
    </motion.div>
  );
}
