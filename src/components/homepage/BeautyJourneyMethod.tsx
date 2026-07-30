"use client";

/**
 * BeautyJourneyMethod — Explains the Beauty Journey methodology in 4 steps.
 * Uses cards with icons and Framer Motion animations.
 */

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { Grid } from "@/components/design-system/layout/Grid";

interface MethodStep {
  id: string;
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const methodSteps: MethodStep[] = [
  {
    id: "step-1",
    number: 1,
    icon: <Sparkles className="w-8 h-8" />,
    title: "اكتشفي احتياجاتك",
    description:
      "ابدئي باختبار شامل يساعدك على فهم احتياجات بشرتك وشعرك الفريدة.",
  },
  {
    id: "step-2",
    number: 2,
    icon: <Zap className="w-8 h-8" />,
    title: "احصلي على توصيات مخصصة",
    description:
      "نحصل على منتجات موصى بها خصيصًا لك بناءً على ملفك الشخصي.",
  },
  {
    id: "step-3",
    number: 3,
    icon: <Heart className="w-8 h-8" />,
    title: "جربي وقيمي",
    description:
      "استخدمي المنتجات وشاركي تقييماتك لمساعدة الآخرين في رحلتهم.",
  },
  {
    id: "step-4",
    number: 4,
    icon: <TrendingUp className="w-8 h-8" />,
    title: "شاهدي النتائج",
    description:
      "تابعي تقدمك وشاهدي كيف يتحسن جمالك الطبيعي مع الوقت.",
  },
];

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
  hover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

export default function BeautyJourneyMethod() {
  return (
    <Section className="py-16 md:py-24 bg-soft-pearl">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4"
            style={{ fontFamily: "var(--font-heading-ar)" }}
          >
            طريقة جمالك
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            اتبعي خطواتنا البسيطة والفعالة لاكتشاف المنتجات المثالية لك.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid columns={4} gap="md" className="md:gap-lg">
            {methodSteps.map((step) => (
              <motion.div
                key={step.id}
                variants={cardVariants}
                whileHover="hover"
                className="flex flex-col items-center text-center"
              >
                {/* Step Number Badge */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="text-accent mb-4">{step.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>

                {/* Connector Line (hidden on last item) */}
                {step.number < 4 && (
                  <div className="hidden lg:block absolute top-8 -right-1/2 w-1/2 h-0.5 bg-gradient-to-r from-accent/50 to-transparent rtl:from-transparent rtl:to-accent/50" />
                )}
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a
            href="/quiz"
            className="inline-block text-accent font-semibold hover:text-accent/80 transition-colors duration-150"
          >
            ابدئي الاختبار الآن →
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
