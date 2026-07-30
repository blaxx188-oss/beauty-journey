"use client";

/**
 * FeaturedCategories — Grid of featured product categories using CategoryCard component.
 * Responsive grid with Framer Motion animations.
 */

import React from "react";
import { motion } from "framer-motion";
import { CategoryCard } from "@/components/design-system/ecommerce/CategoryCard";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { Grid } from "@/components/design-system/layout/Grid";
import { MOCK_CATEGORIES } from "@/data/homepage-mock-data";

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
    transition: { duration: 0.6 },
  },
};

export default function FeaturedCategories() {
  return (
    <Section className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4"
            style={{ fontFamily: "var(--font-heading-ar)" }}
          >
            الأقسام المميزة
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            استكشفي مجموعاتنا المختارة من منتجات العناية والجمال.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid columns={4} gap="md" className="md:gap-lg">
            {MOCK_CATEGORIES.map((category) => (
              <motion.div key={category.slug} variants={itemVariants}>
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        {/* View All Link */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a
            href="/categories"
            className="inline-block text-accent font-semibold hover:text-accent/80 transition-colors duration-150"
          >
            عرض جميع الأقسام →
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
