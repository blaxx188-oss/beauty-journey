"use client";

/**
 * FeaturedProducts — Grid of featured products using ProductCard component.
 * Displays all mock products with responsive grid and animations.
 */

import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/design-system/ecommerce/ProductCard";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { Grid } from "@/components/design-system/layout/Grid";
import { MOCK_PRODUCTS } from "@/data/homepage-mock-data";
import Link from "next/link";

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

export default function FeaturedProducts() {
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
            المنتجات المميزة
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            اكتشفي أفضل منتجاتنا المختارة بعناية من قبل خبرائنا.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid columns={4} gap="md" className="md:gap-lg">
            {MOCK_PRODUCTS.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard
                  {...product}
                  onAddToCart={() => {}}
                  onWishlistToggle={() =>
                    {}
                  }
                />
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
<Link
            href="/products"
            className="inline-block text-accent font-semibold hover:text-accent/80 transition-colors duration-150"
          >
            عرض جميع المنتجات ←
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
