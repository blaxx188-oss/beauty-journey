"use client";

import React from "react";
import { Star, MessageSquare, Edit2, Trash2, Package } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { Button } from "@/components/design-system/core/Button";

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      productName: "سيروم فيتامين سي للوجه",
      image: "/images/placeholders/product.svg",
      rating: 5,
      date: "20 مارس 2024",
      comment: "منتج رائع جداً، لاحظت فرق كبير في نضارة بشرتي بعد أسبوعين فقط من الاستخدام. أنصح به بشدة!",
      isVerified: true
    },
    {
      id: 2,
      productName: "كريم مرطب ليلي",
      image: "/images/placeholders/product.svg",
      rating: 4,
      date: "10 مارس 2024",
      comment: "الترطيب ممتاز ولكن القوام ثقيل قليلاً على بشرتي المختلطة. يناسب البشرة الجافة أكثر.",
      isVerified: true
    }
  ];

  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="تقييماتي" 
        description="استعرضي التقييمات التي قمتِ بكتابتها للمنتجات."
      />

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-primary rounded-2xl border border-border shadow-sm p-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-20 h-20 bg-neutral-secondary rounded-xl overflow-hidden flex-shrink-0">
                <img src={review.image} alt={review.productName} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-text-primary hover:text-accent transition-colors">
                      <Link href={`/products/${review.id}`}>{review.productName}</Link>
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-secondary'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-text-secondary">{review.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs gap-1 text-text-secondary hover:text-accent">
                      <Edit2 className="w-3.5 h-3.5" />
                      تعديل
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs gap-1 text-text-secondary hover:text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                      حذف
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary bg-neutral-secondary/20 p-4 rounded-xl italic">
                  "{review.comment}"
                </p>
                
                {review.isVerified && (
                  <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-bold">
                    <Package className="w-3 h-3" />
                    تم شراء هذا المنتج
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Pending Reviews Section */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-text-primary">منتجات بانتظار تقييمك</h2>
          <div className="bg-accent/5 border border-dashed border-accent/30 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <MessageSquare className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary">شاركينا رأيك!</h3>
            <p className="text-sm text-text-secondary mt-1">لا توجد منتجات بانتظار التقييم حالياً. تقييماتك تساعد الآخرين في اختيار المنتجات الأنسب لهم.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
