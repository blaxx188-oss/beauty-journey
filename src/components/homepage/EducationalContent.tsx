"use client";

/**
 * EducationalContent — Blog/article section featuring educational content.
 * Displays featured articles with images, categories, and read time.
 */

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { Grid } from "@/components/design-system/layout/Grid";
import { MOCK_ARTICLES } from "@/data/homepage-mock-data";
import { Clock, ArrowRight } from "lucide-react";

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
    transition: { duration: 0.3 },
  },
};

export default function EducationalContent() {
  return (
    <Section className="py-16 md:py-24 bg-soft-pearl">
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
            نصائح وإرشادات
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            اقرئي أحدث مقالاتنا التعليمية لاكتشاف أسرار الجمال والعناية.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid columns={3} gap="md" className="md:gap-lg">
            {MOCK_ARTICLES.map((article) => (
              <motion.div
                key={article.id}
                variants={cardVariants}
                whileHover="hover"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="group cursor-pointer h-full">
                    {/* Article Image */}
                    <div className="relative h-48 md:h-56 rounded-lg overflow-hidden mb-4 bg-gray-200">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                        <span className="inline-block bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-150 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Meta Information */}
                      <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <span>{article.date}</span>
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all duration-150">
                        <span>اقرأ المزيد</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
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
            href="/blog"
            className="inline-block text-accent font-semibold hover:text-accent/80 transition-colors duration-150"
          >
            عرض جميع المقالات →
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
