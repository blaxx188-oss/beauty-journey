# Product Listing Page (PLP) Development Plan

## 1. PLP Architecture Overview

The Product Listing Page will be located at `src/app/(main)/products/page.tsx`. This page will act as the orchestrator, fetching and displaying products based on the current filter and sort state. It will integrate several new and existing components to provide a rich user experience.

```tsx
// src/app/(main)/products/page.tsx
import React from "react";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/seo";

// Layout components
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { Breadcrumb } from "@/components/design-system/core/Breadcrumb";

// PLP specific components
import CategoryBanner from "@/components/plp/CategoryBanner";
import ProductToolbar from "@/components/plp/ProductToolbar";
import FiltersSidebar from "@/components/plp/FiltersSidebar";
import MobileFiltersDrawer from "@/components/plp/MobileFiltersDrawer";
import ProductGrid from "@/components/plp/ProductGrid";
import ActiveFilterChips from "@/components/plp/ActiveFilterChips";
import PLPStateProvider from "@/components/plp/PLPStateProvider"; // Zustand provider

export const metadata: Metadata = generatePageMetadata({
  title: "المنتجات — Beauty Journey",
  description: "تصفحي مجموعتنا الواسعة من منتجات العناية بالبشرة والشعر والمكياج.",
  path: "/products",
  locale: "ar",
});

export default function ProductsPage() {
  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/products" },
  ];

  return (
    <PLPStateProvider>
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
                <ProductToolbar />
                <ActiveFilterChips />
                <ProductGrid />
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <MobileFiltersDrawer />
    </PLPStateProvider>
  );
}
```

All new PLP-specific components will be placed in `src/components/plp/`.

## 2. State Management (Zustand)

A Zustand store will be created at `src/stores/plp-store.ts` to manage the state of filters, sorting, and pagination. This store will be wrapped by a `PLPStateProvider` component to ensure client-side rendering and proper context for hooks.

```typescript
// src/stores/plp-store.ts
import { create } from "zustand";

export interface ProductFilters {
  categoryId?: string;
  brandName?: string[];
  minPrice?: number;
  maxPrice?: number;
  skinConcern?: string[];
  skinType?: string[];
  productType?: string[];
  availability?: boolean;
  rating?: number;
  searchQuery?: string;
}

export type SortByOption = "price_asc" | "price_desc" | "newest" | "best_seller" | "relevance";

interface PLPState {
  filters: ProductFilters;
  sortBy: SortByOption;
  page: number;
  limit: number;
  setFilters: (filters: Partial<ProductFilters>) => void;
  setSortBy: (sortBy: SortByOption) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const initialFilters: ProductFilters = {};

export const usePLPStore = create<PLPState>((set) => ({
  filters: initialFilters,
  sortBy: "relevance",
  page: 1,
  limit: 12,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1, // Reset page on filter change
    })),
  setSortBy: (sortBy) => set({ sortBy, page: 1 }), // Reset page on sort change
  setPage: (page) => set({ page }),
  resetFilters: () => set({ filters: initialFilters, page: 1 }),
}));
```

`PLPStateProvider` will be a simple client component to wrap the PLP page.

```tsx
// src/components/plp/PLPStateProvider.tsx
"use client";

import React from "react";
import { usePLPStore } from "@/stores/plp-store";

interface PLPStateProviderProps {
  children: React.ReactNode;
}

export default function PLPStateProvider({ children }: PLPStateProviderProps) {
  // Initialize or use the store. The actual store logic is in plp-store.ts
  // This component just ensures the store is available client-side.
  usePLPStore(); 
  return <>{children}</>;
}
```

## 3. Mock Data Expansion (`src/data/plp-mock-data.ts`)

To support the various filters, the mock product data will be expanded. A new file `src/data/plp-mock-data.ts` will be created to house more comprehensive product data, as well as mock data for brands, skin concerns, skin types, and product types.

```typescript
// src/data/plp-mock-data.ts
import { ProductCardProps } from "@/components/design-system/ecommerce/ProductCard";

export interface PLPProduct extends ProductCardProps {
  brand: string;
  skinConcern: string[];
  skinType: string[];
  productType: string[];
  availability: boolean;
}

export const MOCK_PLP_PRODUCTS: PLPProduct[] = [
  {
    id: "prod-001",
    title: "سيروم فيتامين سي المشرق",
    slug: "brightening-vitamin-c-serum",
    imageUrl: "/images/products/serum-vitc.jpg",
    price: 120.00,
    currency: "EGP",
    originalPrice: 150.00,
    rating: 4.5,
    reviewCount: 75,
    badge: "sale",
    discount: 20,
    isWishlisted: false,
    brand: "Glow Labs",
    skinConcern: ["تفتيح", "مضادات الأكسدة"],
    skinType: ["جميع أنواع البشرة"],
    productType: ["سيروم"],
    availability: true,
  },
  {
    id: "prod-002",
    title: "كريم الليل لتجديد البشرة",
    slug: "skin-renewing-night-cream",
    imageUrl: "/images/products/night-cream.jpg",
    price: 200.00,
    currency: "EGP",
    rating: 4.8,
    reviewCount: 120,
    isWishlisted: true,
    brand: "DermaCare",
    skinConcern: ["مكافحة الشيخوخة", "ترطيب"],
    skinType: ["بشرة جافة", "بشرة عادية"],
    productType: ["كريم ليلي"],
    availability: true,
  },
  {
    id: "prod-003",
    title: "ماسك الطين المنقي",
    slug: "purifying-clay-mask",
    imageUrl: "/images/products/clay-mask.jpg",
    price: 80.00,
    currency: "EGP",
    rating: 4.2,
    reviewCount: 50,
    isWishlisted: false,
    brand: "Pure Earth",
    skinConcern: ["تنقية", "حب الشباب"],
    skinType: ["بشرة دهنية", "بشرة مختلطة"],
    productType: ["ماسك"],
    availability: true,
  },
  {
    id: "prod-004",
    title: "زيت الأرغان للشعر",
    slug: "argan-hair-oil",
    imageUrl: "/images/products/argan-oil.jpg",
    price: 95.00,
    currency: "EGP",
    originalPrice: 110.00,
    rating: 4.7,
    reviewCount: 90,
    badge: "new",
    isWishlisted: false,
    brand: "Hair Elixir",
    skinConcern: ["تغذية الشعر", "لمعان"],
    skinType: ["جميع أنواع الشعر"],
    productType: ["زيت شعر"],
    availability: true,
  },
  {
    id: "prod-005",
    title: "واقي الشمس بعامل حماية 50",
    slug: "sunscreen-spf50",
    imageUrl: "/images/products/sunscreen.jpg",
    price: 180.00,
    currency: "EGP",
    rating: 4.9,
    reviewCount: 150,
    isWishlisted: false,
    brand: "SunGuard",
    skinConcern: ["حماية من الشمس", "مضادات الأكسدة"],
    skinType: ["جميع أنواع البشرة"],
    productType: ["واقي شمس"],
    availability: true,
  },
  {
    id: "prod-006",
    title: "غسول الوجه اللطيف",
    slug: "gentle-face-wash",
    imageUrl: "/images/products/face-wash.jpg",
    price: 70.00,
    currency: "EGP",
    rating: 4.3,
    reviewCount: 60,
    isWishlisted: false,
    brand: "Cleanse Co.",
    skinConcern: ["تنظيف", "ترطيب"],
    skinType: ["بشرة حساسة", "بشرة عادية"],
    productType: ["غسول وجه"],
    availability: true,
  },
  {
    id: "prod-007",
    title: "ماسك الشعر المرطب",
    slug: "hydrating-hair-mask",
    imageUrl: "/images/products/hair-mask.jpg",
    price: 130.00,
    currency: "EGP",
    rating: 4.6,
    reviewCount: 80,
    isWishlisted: false,
    brand: "Hair Elixir",
    skinConcern: ["ترطيب الشعر", "إصلاح"],
    skinType: ["شعر جاف", "شعر تالف"],
    productType: ["ماسك شعر"],
    availability: true,
  },
  {
    id: "prod-008",
    title: "كريم العين لمكافحة الهالات السوداء",
    slug: "dark-circle-eye-cream",
    imageUrl: "/images/products/eye-cream.jpg",
    price: 250.00,
    currency: "EGP",
    rating: 4.7,
    reviewCount: 95,
    isWishlisted: false,
    brand: "DermaCare",
    skinConcern: ["الهالات السوداء", "مكافحة الشيخوخة"],
    skinType: ["جميع أنواع البشرة"],
    productType: ["كريم عين"],
    availability: true,
  },
];

export const MOCK_BRANDS = [
  "Glow Labs",
  "DermaCare",
  "Pure Earth",
  "Hair Elixir",
  "SunGuard",
  "Cleanse Co.",
];

export const MOCK_SKIN_CONCERNS = [
  "تفتيح",
  "مضادات الأكسدة",
  "مكافحة الشيخوخة",
  "ترطيب",
  "تنقية",
  "حب الشباب",
  "حماية من الشمس",
  "تنظيف",
  "الهالات السوداء",
];

export const MOCK_SKIN_TYPES = [
  "جميع أنواع البشرة",
  "بشرة جافة",
  "بشرة دهنية",
  "بشرة مختلطة",
  "بشرة عادية",
  "بشرة حساسة",
];

export const MOCK_PRODUCT_TYPES = [
  "سيروم",
  "كريم ليلي",
  "ماسك",
  "زيت شعر",
  "واقي شمس",
  "غسول وجه",
  "ماسك شعر",
  "كريم عين",
];

export const MOCK_CATEGORIES_PLP = [
  { id: "skincare", name: "العناية بالبشرة" },
  { id: "haircare", name: "العناية بالشعر" },
  { id: "makeup", name: "المكياج" },
  { id: "fragrances", name: "العطور" },
];

export const MOCK_SORT_OPTIONS = [
  { value: "relevance", label: "الأكثر صلة" },
  { value: "newest", label: "الأحدث" },
  { value: "price_asc", label: "السعر: من الأقل للأعلى" },
  { value: "price_desc", label: "السعر: من الأعلى للأقل" },
  { value: "best_seller", label: "الأكثر مبيعًا" },
];

```

## 4. General Implementation Notes

-   **Responsiveness**: All components will be built with a mobile-first approach using Tailwind CSS, ensuring optimal display across devices.
-   **RTL Support**: All new components will inherently support RTL due to the project's existing Tailwind CSS configuration and Arabic content.
-   **Accessibility (ARIA) & Keyboard Navigation**: Appropriate ARIA attributes and keyboard event handlers will be implemented for interactive elements (e.g., filters, sort dropdown, pagination) to ensure full accessibility.
-   **Framer Motion Animations**: Subtle animations will be used for filter drawer transitions, product grid entrance, product hover effects, and pagination transitions to enhance user experience.
-   **Reuse Existing Design System Components**: Prioritize the use of `ProductCard`, `Breadcrumb`, `Pagination`, `Select`, `Drawer`, `Chip`, `Skeleton`, `EmptyState`, and `ErrorState` from the existing design system.
-   **Production-ready TypeScript**: Strict TypeScript typing will be maintained for all new components and state management.
-   **Clean Folder Structure**: New PLP components will reside in `src/components/plp/`.
-   **Modular Architecture**: Each PLP feature (e.g., filters, toolbar, grid) will be a self-contained component.
-   **Mock Data Only**: All data will be sourced from `src/data/plp-mock-data.ts`.
-   **Infinite Scroll Architecture (Optional)**: Initially, standard pagination will be implemented. The architecture will be designed to allow for a smooth transition to infinite scroll if required in a future phase, likely by modifying the `ProductGrid` and `usePLPStore` to handle loading more items.
