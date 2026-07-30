# Homepage Development Plan

## 1. Homepage Structure (`src/app/(main)/page.tsx`)

The `page.tsx` file will serve as the main container for all homepage sections. Each section will be a separate React component, imported and rendered in the correct order. This approach promotes modularity, reusability, and maintainability.

```tsx
import React from "react";
import { Metadata } from "next";

// Import all homepage sections
import HeroSection from "@/components/homepage/HeroSection";
import BeautyJourneyMethod from "@/components/homepage/BeautyJourneyMethod";
import BeautyQuizCTA from "@/components/homepage/BeautyQuizCTA";
import FeaturedCategories from "@/components/homepage/FeaturedCategories";
import PersonalizedRecommendations from "@/components/homepage/PersonalizedRecommendations";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import EducationalContent from "@/components/homepage/EducationalContent";
import Testimonials from "@/components/homepage/Testimonials";
import Newsletter from "@/components/homepage/Newsletter";

// Import layout components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

// SEO Metadata (using existing generatePageMetadata utility)
export const metadata: Metadata = {
  // ... will be generated using generatePageMetadata
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BeautyJourneyMethod />
        <BeautyQuizCTA />
        <FeaturedCategories />
        <PersonalizedRecommendations />
        <FeaturedProducts />
        <EducationalContent />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
```

Each section component will be placed in `src/components/homepage/`.

## 2. Mock Data Strategy

Mock data will be created in a dedicated file, `src/data/homepage-mock-data.ts`, to keep the components clean and separate data from presentation. This file will export constants for each section requiring data.

### 2.1. Featured Categories Mock Data

This section will use the `CategoryCard` component. The mock data will be an array of objects conforming to the `CategoryCardProps` type (or a similar structure that can be mapped to it).

```typescript
// src/data/homepage-mock-data.ts
import { CategoryCardProps } from "@/components/design-system/ecommerce/CategoryCard";

export const MOCK_CATEGORIES: CategoryCardProps[] = [
  {
    name: "العناية بالبشرة",
    slug: "skincare",
    imageUrl: "/images/categories/skincare.jpg",
    description: "منتجات مختارة لبشرة صحية ومشرقة.",
    count: 120,
  },
  {
    name: "العناية بالشعر",
    slug: "haircare",
    imageUrl: "/images/categories/haircare.jpg",
    description: "حلول متكاملة لشعر قوي ولامع.",
    count: 85,
  },
  {
    name: "المكياج",
    slug: "makeup",
    imageUrl: "/images/categories/makeup.jpg",
    description: "أحدث صيحات المكياج لجمالك.",
    count: 150,
  },
  {
    name: "العطور",
    slug: "fragrances",
    imageUrl: "/images/categories/fragrances.jpg",
    description: "عطور فاخرة تدوم طويلاً.",
    count: 60,
  },
];
```

### 2.2. Featured Products & Personalized Recommendations Mock Data

These sections will use the `ProductCard` component. The mock data will be an array of objects conforming to the `ProductCardProps` type (or a similar structure).

```typescript
// src/data/homepage-mock-data.ts
import { ProductCardProps } from "@/components/design-system/ecommerce/ProductCard";

export const MOCK_PRODUCTS: ProductCardProps[] = [
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
    badge: "خصم 20%",
    wishlisted: false,
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
    wishlisted: true,
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
    wishlisted: false,
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
    badge: "جديد",
    wishlisted: false,
  },
];
```

### 2.3. Educational Content Mock Data

This section will display articles or blog posts. The mock data will be an array of objects.

```typescript
// src/data/homepage-mock-data.ts
export interface ArticleCardProps {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  category: string;
  readTime: string;
  date: string;
}

export const MOCK_ARTICLES: ArticleCardProps[] = [
  {
    id: "art-001",
    title: "روتين العناية بالبشرة في الشتاء",
    slug: "winter-skincare-routine",
    imageUrl: "/images/articles/winter-skincare.jpg",
    category: "العناية بالبشرة",
    readTime: "5 دقائق",
    date: "2023-10-26",
  },
  {
    id: "art-002",
    title: "أسرار الشعر الصحي اللامع",
    slug: "secrets-healthy-shiny-hair",
    imageUrl: "/images/articles/healthy-hair.jpg",
    category: "العناية بالشعر",
    readTime: "7 دقائق",
    date: "2023-09-15",
  },
  {
    id: "art-003",
    title: "دليل المكياج للمبتدئات",
    slug: "makeup-guide-beginners",
    imageUrl: "/images/articles/makeup-guide.jpg",
    category: "المكياج",
    readTime: "10 دقائق",
    date: "2023-08-01",
  },
];
```

### 2.4. Testimonials Mock Data

This section will display customer testimonials. The mock data will be an array of objects.

```typescript
// src/data/homepage-mock-data.ts
export interface TestimonialProps {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const MOCK_TESTIMONIALS: TestimonialProps[] = [
  {
    id: "test-001",
    quote: "منتجات رائعة وخدمة عملاء ممتازة! بشرتي لم تكن بهذا النضارة من قبل.",
    author: "فاطمة الزهراء",
    location: "القاهرة، مصر",
    rating: 5,
  },
  {
    id: "test-002",
    quote: "أحببت مجموعة العناية بالشعر، لقد غيرت شعري تمامًا. أنصح بها بشدة.",
    author: "ليلى أحمد",
    location: "دبي، الإمارات العربية المتحدة",
    rating: 5,
  },
  {
    id: "test-003",
    quote: "التوصيل سريع والمنتجات أصلية. تجربة تسوق ممتازة.",
    author: "مريم خالد",
    location: "الرياض، المملكة العربية السعودية",
    rating: 4,
  },
];
```

## 3. General Implementation Notes

-   **Responsiveness**: Utilize Tailwind CSS utility classes for responsive design. Ensure components adapt gracefully to different screen sizes.
-   **RTL Support**: The existing project already has RTL configuration. Ensure new components respect `dir="rtl"` where necessary, especially for layout and text alignment.
-   **Accessibility (ARIA)**: Use appropriate ARIA attributes for semantic meaning and improved accessibility, especially for interactive elements and navigation.
-   **SEO Metadata**: The `generatePageMetadata` utility in `src/utils/seo.ts` will be used to create the `metadata` export for `page.tsx`.
-   **Framer Motion Animations**: Incorporate `framer-motion` for subtle, engaging animations as per the project's existing patterns (e.g., hover effects, entrance animations).
-   **Skeleton Loading**: Implement skeleton loaders for sections that might fetch data (even mock data) to provide a better user experience during loading states. The `Skeleton` component from `src/components/design-system/core/Skeleton.tsx` can be used.
-   **Empty States**: Design and implement empty states for sections where there might be no data to display (e.g., if `MOCK_PRODUCTS` was empty). The `EmptyState` component from `src/components/design-system/core/EmptyState.tsx` can be used.
-   **Error States**: Implement basic error states for sections that might encounter issues (e.g., data loading failure). The `ErrorState` component from `src/components/design-system/core/ErrorState.tsx` can be used.
-   **Clean TypeScript**: Adhere to strict TypeScript practices, defining clear interfaces and types for all props and data structures.
-   **Production-ready architecture**: Maintain the existing project's architecture, using reusable components and a clear separation of concerns.
