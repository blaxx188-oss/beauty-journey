import { MetadataRoute } from "next";
import { MOCK_PLP_PRODUCTS, MOCK_CATEGORIES_PLP } from "@/data/plp-mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://beauty-journey.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-and-conditions",
    "/return-policy",
    "/shipping-policy",
    "/products",
    "/categories",
    "/blog",
    "/quiz",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Product routes
  const productRoutes = MOCK_PLP_PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  // Category routes
  const categoryRoutes = MOCK_CATEGORIES_PLP.map((category) => ({
    url: `${baseUrl}/categories/${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
