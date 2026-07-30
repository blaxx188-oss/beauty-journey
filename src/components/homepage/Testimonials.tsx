"use client";

/**
 * Testimonials — Customer testimonials carousel/grid section.
 * Displays customer reviews with ratings and locations.
 */

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { Grid } from "@/components/design-system/layout/Grid";
import { Rating } from "@/components/design-system/ecommerce/Rating";
import { MOCK_TESTIMONIALS } from "@/data/homepage-mock-data";
import { Quote } from "lucide-react";

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
    y: -4,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 },
  },
};

export default function Testimonials() {
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
            ماذا تقول عملاؤنا
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            اقرئي تجارب العملاء الحقيقية وانضمي إلى آلاف النساء الراضيات.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid columns={3} gap="md" className="md:gap-lg">
            {MOCK_TESTIMONIALS.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-lg p-6 md:p-8 border border-border shadow-sm"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-accent/30" />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <Rating value={testimonial.rating} size="sm" />
                </div>

                {/* Quote */}
                <p className="text-text-primary mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-text-primary mb-1">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 md:mt-20 grid grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div>
            <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
              10K+
            </p>
            <p className="text-text-secondary">عميلة راضية</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
              4.8★
            </p>
            <p className="text-text-secondary">متوسط التقييم</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
              98%
            </p>
            <p className="text-text-secondary">معدل الرضا</p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
