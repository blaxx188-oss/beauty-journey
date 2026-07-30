"use client";

/**
 * ProductGrid — Responsive grid of products with pagination.
 * Includes loading skeletons, empty states, and error states.
 */

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/design-system/ecommerce/ProductCard";
import { Pagination } from "@/components/design-system/core/Pagination";
import { Skeleton } from "@/components/design-system/core/Skeleton";
import { EmptyState } from "@/components/design-system/core/EmptyState";
import { Grid } from "@/components/design-system/layout/Grid";
import { usePLPStore } from "@/stores/plp-store";
import { MOCK_PLP_PRODUCTS } from "@/data/plp-mock-data";
import { Package, Search } from "lucide-react";
import { Button } from "@/components/design-system/core/Button";

interface ProductGridProps {
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export default function ProductGrid({
  isLoading = false,
  isError = false,
  onRetry,
}: ProductGridProps) {
  const { page, setPage, limit, filters, sortBy, resetFilters } = usePLPStore();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...MOCK_PLP_PRODUCTS];

    // Apply filters
    if (filters.brandName && filters.brandName.length > 0) {
      products = products.filter((p) => filters.brandName?.includes(p.brand));
    }

    if (filters.minPrice !== undefined) {
      products = products.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      products = products.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.skinConcern && filters.skinConcern.length > 0) {
      products = products.filter((p) =>
        filters.skinConcern?.some((concern) => p.skinConcern.includes(concern))
      );
    }

    if (filters.skinType && filters.skinType.length > 0) {
      products = products.filter((p) =>
        filters.skinType?.some((type) => p.skinType.includes(type))
      );
    }

    if (filters.productType && filters.productType.length > 0) {
      products = products.filter((p) =>
        filters.productType?.some((type) => p.productType.includes(type))
      );
    }

    if (filters.availability !== undefined) {
      products = products.filter((p) => p.availability === filters.availability);
    }

    if (filters.rating !== undefined) {
      products = products.filter((p) => (p.rating || 0) >= filters.rating!);
    }

    if (filters.discount !== undefined) {
      products = products.filter((p) => (p.discount || 0) >= filters.discount!);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.productType.some(t => t.toLowerCase().includes(query)) ||
          p.skinConcern.some(c => c.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price_asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // Assuming products with badge "new" are newer
        products.sort((a, b) => {
          if (a.badge === "new" && b.badge !== "new") return -1;
          if (a.badge !== "new" && b.badge === "new") return 1;
          return 0;
        });
        break;
      case "best_seller":
        // Sort by review count as proxy for best seller
        products.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case "relevance":
      default:
        // Keep original order
        break;
    }

    return products;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  // Error State
  if (isError) {
    return (
      <EmptyState
        icon={<Package className="w-8 h-8" />}
        title="حدث خطأ"
        description="عذرًا، حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى."
        action={
          <button
            onClick={onRetry}
            className="px-6 py-2.5 text-sm font-medium bg-accent text-white rounded-sm hover:bg-accent/90 transition-colors"
          >
            إعادة المحاولة
          </button>
        }
      />
    );
  }

  // Empty State
  if (!isLoading && filteredProducts.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="w-20 h-20 bg-neutral-secondary rounded-full flex items-center justify-center mb-6">
          <Search className="w-8 h-8 text-placeholder" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">
          لم نجد أي نتائج
        </h3>
        <p className="text-text-secondary mb-8 max-w-xs mx-auto">
          {filters.searchQuery 
            ? `عذرًا، لم نجد أي منتجات تطابق بحثك عن "${filters.searchQuery}". جربي كلمات أخرى.`
            : "لا توجد منتجات تطابق الفلاتر المختارة حاليًا."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={resetFilters}
            variant="outline"
            className="px-8"
          >
            إعادة ضبط الفلاتر
          </Button>
          <Button
            onClick={() => window.location.href = "/products"}
            className="bg-accent text-white px-8"
          >
            تصفح كل المنتجات
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Product Grid */}
      {isLoading ? (
        <Grid columns={4} gap="md" className="md:gap-lg">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton shape="rect" height={300} className="rounded-lg" />
              <Skeleton shape="text" height={20} className="w-3/4" />
              <Skeleton shape="text" height={16} className="w-1/2" />
            </div>
          ))}
        </Grid>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid columns={4} gap="md" className="md:gap-lg">
            {paginatedProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard
                  {...product}
                  onAddToCart={() => {}}
                  onWishlistToggle={() =>
                    {}
                  }
                />
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <motion.div
          className="flex justify-center pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            siblingCount={1}
          />
        </motion.div>
      )}
    </div>
  );
}
