"use client";

/**
 * ActiveFilterChips — Display active filters as removable chips.
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chip } from "@/components/design-system/core/Chip";
import { Button } from "@/components/design-system/core/Button";
import { usePLPStore } from "@/stores/plp-store";
import { X } from "lucide-react";

export default function ActiveFilterChips() {
  const { filters, setFilters, resetFilters } = usePLPStore();

  // Build an array of active filters for display
  const activeFilters: Array<{ key: string; label: string }> = [];

  if (filters.brandName && filters.brandName.length > 0) {
    filters.brandName.forEach((brand) => {
      activeFilters.push({ key: `brand-${brand}`, label: `العلامة: ${brand}` });
    });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const minPrice = filters.minPrice || 0;
    const maxPrice = filters.maxPrice || 1000;
    activeFilters.push({ key: "price", label: `السعر: ${minPrice} - ${maxPrice} ج.م` });
  }

  if (filters.skinConcern && filters.skinConcern.length > 0) {
    filters.skinConcern.forEach((concern) => {
      activeFilters.push({ key: `concern-${concern}`, label: concern });
    });
  }

  if (filters.skinType && filters.skinType.length > 0) {
    filters.skinType.forEach((type) => {
      activeFilters.push({ key: `type-${type}`, label: type });
    });
  }

  if (filters.productType && filters.productType.length > 0) {
    filters.productType.forEach((type) => {
      activeFilters.push({ key: `product-${type}`, label: type });
    });
  }

  if (filters.rating) {
    activeFilters.push({ key: "rating", label: `التقييم: ${filters.rating}+ نجوم` });
  }

  if (filters.discount) {
    activeFilters.push({ key: "discount", label: `خصم: ${filters.discount}% وأكثر` });
  }

  if (filters.availability !== undefined) {
    activeFilters.push({ key: "availability", label: "المنتجات المتاحة فقط" });
  }

  if (filters.searchQuery) {
    activeFilters.push({ key: "search", label: `البحث: "${filters.searchQuery}"` });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  const handleRemoveFilter = (key: string) => {
    if (key === "price") {
      setFilters({ minPrice: undefined, maxPrice: undefined });
    } else if (key === "rating") {
      setFilters({ rating: undefined });
    } else if (key === "availability") {
      setFilters({ availability: undefined });
    } else if (key === "discount") {
      setFilters({ discount: undefined });
    } else if (key === "search") {
      setFilters({ searchQuery: undefined });
    } else if (key.startsWith("brand-")) {
      const brand = key.replace("brand-", "");
      setFilters({
        brandName: filters.brandName?.filter((b) => b !== brand),
      });
    } else if (key.startsWith("concern-")) {
      const concern = key.replace("concern-", "");
      setFilters({
        skinConcern: filters.skinConcern?.filter((c) => c !== concern),
      });
    } else if (key.startsWith("type-")) {
      const type = key.replace("type-", "");
      setFilters({
        skinType: filters.skinType?.filter((t) => t !== type),
      });
    } else if (key.startsWith("product-")) {
      const type = key.replace("product-", "");
      setFilters({
        productType: filters.productType?.filter((t) => t !== type),
      });
    }
  };

  return (
    <motion.div
      className="mb-6 pb-6 border-b border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-sm font-medium text-text-secondary" role="status" aria-live="polite">
          الفلاتر النشطة:
        </span>
        <AnimatePresence mode="popLayout">
          {activeFilters.map((filter) => (
            <motion.div
              key={filter.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              role="listitem"
            >
              <Chip
                variant="selected"
                onClose={() => handleRemoveFilter(filter.key)}
                aria-label={`إزالة فلتر: ${filter.label}`}
              >
                {filter.label}
              </Chip>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Clear All Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={resetFilters}
        className="text-accent hover:text-accent/80 text-xs"
      >
        <X className="w-3 h-3 mr-1" />
        مسح جميع الفلاتر
      </Button>
    </motion.div>
  );
}
