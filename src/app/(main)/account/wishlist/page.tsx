"use client";

import React from "react";
import { Heart, ShoppingCart, Trash2, Star, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";
import { ProductCard } from "@/components/design-system/ecommerce/ProductCard";

export default function WishlistPage() {
  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = React.useState([
    {
      id: "prod-1",
      name: "سيروم الهيالورونيك أسيد",
      brand: "The Ordinary",
      price: 350,
      oldPrice: 450,
      rating: 4.8,
      reviews: 124,
      image: "/images/placeholders/product.svg",
      category: "Skincare",
      slug: "hyaluronic-acid-serum"
    },
    {
      id: "prod-2",
      name: "منظف لطيف للبشرة",
      brand: "CeraVe",
      price: 550,
      rating: 4.9,
      reviews: 89,
      image: "/images/placeholders/product.svg",
      category: "Skincare",
      slug: "gentle-skin-cleanser"
    },
    {
      id: "prod-3",
      name: "كريم واقي من الشمس 50+",
      brand: "La Roche-Posay",
      price: 850,
      oldPrice: 950,
      rating: 4.7,
      reviews: 210,
      image: "/images/placeholders/product.svg",
      category: "Skincare",
      slug: "anthelios-sunscreen"
    }
  ]);

  const removeItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="قائمة الأمنيات" 
        description="المنتجات التي قمتِ بحفظها لاكتشافها وشرائها لاحقاً."
      />

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              <div className="relative aspect-square bg-neutral-secondary/30 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {item.oldPrice && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    وفر {item.oldPrice - item.price} ج.م
                  </div>
                )}
              </div>
              
              <div className="p-4 space-y-2">
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{item.brand}</p>
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-bold text-text-primary text-sm line-clamp-1 hover:text-accent transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-text-primary">{item.rating}</span>
                  <span className="text-[10px] text-text-secondary">({item.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-accent">{item.price} ج.م</span>
                    {item.oldPrice && (
                      <span className="text-[10px] text-text-secondary line-through">{item.oldPrice} ج.م</span>
                    )}
                  </div>
                  <Button size="sm" className="bg-accent text-white gap-2 text-xs h-8">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    أضيفي للسلة
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-red-300" />
          </div>
          <h3 className="font-bold text-text-primary">قائمة الأمنيات فارغة</h3>
          <p className="text-sm text-text-secondary mt-1">ابدئي بإضافة المنتجات التي تحبينها للعودة إليها لاحقاً.</p>
          <Link href="/shop" className="inline-block mt-6">
            <Button className="bg-accent text-white">اكتشفي المنتجات</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
