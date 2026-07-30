/**
 * SEO utilities for the Beauty Journey platform.
 */

import type { Metadata } from "next";

interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
  locale?: "ar" | "en";
  type?: "website" | "article" | "product";
  keywords?: string[];
  noIndex?: boolean;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://beauty-journey.com";

export function generatePageMetadata(config: SeoConfig): Metadata {
  const { 
    title, 
    description, 
    path = "", 
    image = "/images/og-image.jpg", 
    locale = "ar",
    type = "website",
    keywords = [],
    noIndex = false
  } = config;

  const fullUrl = `${APP_URL}${path}`;

  return {
    title,
    description,
    keywords: [
      "Beauty Journey",
      "skincare",
      "haircare",
      "Egypt",
      "مستحضرات تجميل",
      "عناية بالبشرة",
      "عناية بالشعر",
      ...keywords
    ],
    alternates: {
      canonical: fullUrl,
      languages: {
        ar: fullUrl,
        en: `${APP_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: type as any,
      siteName: "Beauty Journey",
      images: [
        {
          url: image.startsWith("http") ? image : `${APP_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${APP_URL}${image}`],
      creator: "@beautyjourney",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * JSON-LD structured data for products.
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  price: number;
  currency?: string;
  availability: "InStock" | "OutOfStock";
  image: string;
  brand: string;
  sku?: string;
  category?: string;
  ratingValue?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image.startsWith("http") ? product.image : `${APP_URL}${product.image}`,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: typeof window !== "undefined" ? window.location.href : "",
      price: product.price,
      priceCurrency: product.currency || "EGP",
      availability: `https://schema.org/${product.availability}`,
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Beauty Journey",
      },
    },
    aggregateRating: product.ratingValue ? {
      "@type": "AggregateRating",
      ratingValue: product.ratingValue,
      reviewCount: product.reviewCount || 0,
    } : undefined,
  };
}

/**
 * JSON-LD structured data for the organization.
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${APP_URL}/#organization`,
    name: "Beauty Journey",
    url: APP_URL,
    logo: `${APP_URL}/images/logo.png`,
    description: "وجهتك الفاخرة للعناية بالبشرة والشعر في مصر",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Maadi",
      addressLocality: "Cairo",
      addressRegion: "Cairo",
      postalCode: "11728",
      addressCountry: "EG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+201000000000",
      contactType: "customer service",
      areaServed: "EG",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: [
      "https://www.instagram.com/beautyjourney",
      "https://www.facebook.com/beautyjourney",
      "https://twitter.com/beautyjourney",
    ],
  };
}

/**
 * JSON-LD structured data for the website.
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${APP_URL}/#website`,
    url: APP_URL,
    name: "Beauty Journey",
    description: "وجهتك الفاخرة للعناية بالبشرة والشعر في مصر",
    publisher: {
      "@id": `${APP_URL}/#organization`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${APP_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: "ar-EG"
  };
}

/**
 * JSON-LD structured data for breadcrumbs.
 */
export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http") ? item.item : `${APP_URL}${item.item}`,
    })),
  };
}
