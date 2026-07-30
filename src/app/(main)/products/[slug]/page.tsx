import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_PLP_PRODUCTS } from "@/data/plp-mock-data";
import ProductPageContent from "./ProductPageContent";
import { 
  generatePageMetadata, 
  generateProductSchema, 
  generateBreadcrumbSchema 
} from "@/utils/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PLP_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "المنتج غير موجود | Beauty Journey",
    };
  }

  return generatePageMetadata({
    title: `${product.title} | Beauty Journey`,
    description: `اكتشفي ${product.title} من ${product.brand}. منتج عالي الجودة للعناية بجمالك.`,
    path: `/products/${product.slug}`,
    image: product.imageUrl,
    type: "website",
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = MOCK_PLP_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema({
    name: product.title,
    description: `اكتشفي ${product.title} من ${product.brand}. منتج عالي الجودة للعناية بجمالك.`,
    price: product.price,
    currency: product.currency,
    availability: product.availability ? "InStock" : "OutOfStock",
    image: product.imageUrl,
    brand: product.brand,
    ratingValue: product.rating,
    reviewCount: product.reviewCount,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "الرئيسية", item: "/" },
    { name: "المنتجات", item: "/products" },
    { name: product.title, item: `/products/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductPageContent product={product} />
    </>
  );
}
