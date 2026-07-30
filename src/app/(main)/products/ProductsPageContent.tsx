"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { Breadcrumb } from "@/components/design-system/core/Breadcrumb";
import CategoryBanner from "@/components/plp/CategoryBanner";
import ProductToolbar from "@/components/plp/ProductToolbar";
import FiltersSidebar from "@/components/plp/FiltersSidebar";
import MobileFiltersDrawer from "@/components/plp/MobileFiltersDrawer";
import ProductGrid from "@/components/plp/ProductGrid";
import ActiveFilterChips from "@/components/plp/ActiveFilterChips";
import PLPStateProvider from "@/components/plp/PLPStateProvider";
import { usePLPStore } from "@/stores/plp-store";
import { MOCK_PLP_PRODUCTS } from "@/data/plp-mock-data";

function ProductsPageInner() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { filters, sortBy } = usePLPStore();

  // Calculate filtered product count
  const filteredProductCount = useMemo(() => {
    let products = [...MOCK_PLP_PRODUCTS];

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

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    return products.length;
  }, [filters]);

  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/products" },
  ];

  return (
    <main>
      <Section className="py-6 md:py-8">
        <Container>
          <Breadcrumb items={breadcrumbItems} className="mb-4" />
          <CategoryBanner />
        </Container>
      </Section>

      <Section className="pb-16 md:pb-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar (Desktop) */}
            <div className="hidden lg:block w-full lg:w-1/4 xl:w-1/5">
              <FiltersSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <ProductToolbar
                onMobileFiltersOpen={() => setMobileFiltersOpen(true)}
                filteredProductCount={filteredProductCount}
              />
              <ActiveFilterChips />
              <ProductGrid />
            </div>
          </div>
        </Container>
      </Section>

      {/* Mobile Filters Drawer */}
      <MobileFiltersDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      />
    </main>
  );
}

export default function ProductsPageContent() {
  return (
    <PLPStateProvider>
      <ProductsPageInner />
    </PLPStateProvider>
  );
}
