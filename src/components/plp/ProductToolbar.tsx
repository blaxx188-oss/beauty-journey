"use client";

/**
 * ProductToolbar — Toolbar with sort dropdown, products counter, and mobile filter toggle.
 */

import React from "react";
import { motion } from "framer-motion";
import { Select } from "@/components/design-system/core/Select";
import { Button } from "@/components/design-system/core/Button";
import { usePLPStore, type SortByOption } from "@/stores/plp-store";
import { MOCK_PLP_PRODUCTS, MOCK_SORT_OPTIONS } from "@/data/plp-mock-data";
import { Filter } from "lucide-react";

interface ProductToolbarProps {
  onMobileFiltersOpen?: () => void;
  filteredProductCount?: number;
}

export default function ProductToolbar({
  onMobileFiltersOpen,
  filteredProductCount,
}: ProductToolbarProps) {
  const { sortBy, setSortBy, filters } = usePLPStore();

  // Calculate filtered count based on active filters
  const totalProducts =
    filteredProductCount !== undefined ? filteredProductCount : MOCK_PLP_PRODUCTS.length;

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof typeof filters] !== undefined
  );

  const handleSortChange = (value: string) => {
    setSortBy(value as SortByOption);
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Products Counter */}
      <motion.div
        className="text-sm md:text-base text-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <span className="font-semibold text-text-primary">{totalProducts}</span>
        {hasActiveFilters && ` من ${MOCK_PLP_PRODUCTS.length}`} منتج
      </motion.div>

      {/* Sort and Mobile Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        {/* Sort Dropdown */}
        <motion.div
          className="w-full sm:w-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Select
            options={MOCK_SORT_OPTIONS}
            value={sortBy}
            onValueChange={handleSortChange}
            placeholder="ترتيب حسب..."
            size="md"
          />
        </motion.div>

        {/* Mobile Filter Button */}
        <motion.div
          className="lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Button
            variant="outline"
            size="md"
            onClick={onMobileFiltersOpen}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
            aria-label="فتح الفلاتر"
          >
            <Filter className="w-4 h-4" />
            الفلاتر
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
