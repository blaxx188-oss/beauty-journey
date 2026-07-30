"use client";

/**
 * BeautyQuizCTA — Call-to-action section for the Beauty Quiz.
 * Features a prominent CTA button with background image and gradient overlay.
 */

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/design-system/core/Button";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { ArrowRight } from "lucide-react";

export default function BeautyQuizCTA() {
  return (
    <Section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/quiz-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/80 to-accent/60" />
      </div>

      {/* Content */}
      <Container className="relative">
        <motion.div
          className="max-w-2xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-sm md:text-base font-semibold uppercase tracking-widest mb-4 text-white/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            اكتشفي ملفك الجمالي
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading-ar)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            هل تعرفين نوع بشرتك حقًا؟
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            أجيبي على بعض الأسئلة البسيطة واحصلي على توصيات منتجات مخصصة تناسب
            احتياجاتك الفريدة تمامًا.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link href="/quiz">
              <Button
                size="lg"
                className="bg-white text-accent hover:bg-white/90 font-semibold inline-flex items-center gap-2"
              >
                ابدئي الاختبار الآن
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="mt-6 text-sm text-white/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            يستغرق الاختبار حوالي 3 دقائق فقط • لا توجد بيانات مخفية
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}
