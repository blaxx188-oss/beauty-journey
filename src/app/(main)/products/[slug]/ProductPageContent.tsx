"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { Breadcrumb } from "@/components/design-system/core/Breadcrumb";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RecentlyViewed, trackProductView } from "@/components/product/RecentlyViewed";
import { Button } from "@/components/design-system/core/Button";
import { Heart, ShoppingBag, Share2 } from "lucide-react";
import { PLPProduct } from "@/data/plp-mock-data";
import { useCartStore } from "@/stores/cart-store";
import Image from "next/image";

interface ProductPageContentProps {
  product: PLPProduct;
}

export default function ProductPageContent({ product }: ProductPageContentProps) {
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    if (product) {
      trackProductView(product.id);
    }
  }, [product]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      imageUrl: product.imageUrl,
      currency: product.currency || "EGP",
      maxQuantity: 10,
    });
    openCart();
  };

  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/products" },
    { label: product.title },
  ];

  return (
    <main>
      <Section className="py-6 md:py-12">
        <Container>
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-secondary">
              <Image 
                src={product.imageUrl} 
                alt={product.title} 
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="text-accent font-bold text-sm uppercase tracking-wider">{product.brand}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">{product.title}</h1>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <span className="text-warning">★</span>
                    <span className="text-sm font-bold">{product.rating}</span>
                    <span className="text-xs text-text-secondary">({product.reviewCount} تقييم)</span>
                  </div>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <span className="text-sm text-success font-medium">متوفر في المخزون</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-accent">{product.price} {product.currency}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-placeholder line-through">{product.originalPrice} {product.currency}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-text-secondary leading-relaxed">
                  هذا المنتج هو الحل المثالي لاحتياجاتك الجمالية. تم اختياره بعناية لضمان أفضل النتائج لبشرتك.
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.skinConcern.map(c => (
                    <span key={c} className="px-3 py-1 bg-neutral-secondary rounded-full text-xs font-medium">{c}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button 
                  className="flex-1 h-14 bg-accent text-white text-lg font-bold gap-3"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5" />
                  إضافة إلى السلة
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-14 h-14 p-0">
                    <Heart className="w-6 h-6" />
                  </Button>
                  <Button variant="outline" className="w-14 h-14 p-0">
                    <Share2 className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Recommendations */}
      <RelatedProducts currentProductId={product.id} category={product.brand} />
      <RecentlyViewed />
    </main>
  );
}
