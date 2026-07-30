"use client";

/**
 * HeroSection — Full-width hero banner with background image, gradient overlay,
 * and CTA button. Features Framer Motion entrance animation.
 */

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/design-system/core/Button";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <Section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Beauty Journey Hero"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 rtl:from-black/40 rtl:to-black/60" />
      </div>

      {/* Content */}
      <Container className="relative h-full flex items-center">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-accent text-sm md:text-base font-semibold uppercase tracking-widest mb-4 md:mb-6"
          >
            اكتشفي جمالك الحقيقي
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading-ar)" }}
          >
            رحلتك الجمالية تبدأ هنا
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-xl leading-relaxed"
          >
            اكتشفي منتجات العناية بالبشرة والشعر المختارة بعناية، والمصممة خصيصًا
            لاحتياجاتك الفريدة. ابدئي رحلتك نحو جمال طبيعي وصحي اليوم.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/quiz">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white"
              >
                ابدئي الاختبار الآن
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                استكشفي المنتجات
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator (Desktop only) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white/70 text-sm">اسحبي للأسفل</span>
        <svg
          className="w-5 h-5 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </Section>
  );
}
