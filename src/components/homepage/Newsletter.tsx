"use client";

/**
 * Newsletter — Email subscription section with form and benefits.
 * Features input validation and Framer Motion animations.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  const benefits = [
    "عروض حصرية وخصومات خاصة",
    "نصائح جمال أسبوعية",
    "إطلاقات منتجات جديدة",
  ];

  return (
    <Section className="py-16 md:py-24 bg-gradient-to-r from-accent/10 to-accent/5">
      <Container>
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4"
              style={{ fontFamily: "var(--font-heading-ar)" }}
            >
              ابقي على اتصال
            </h2>
            <p className="text-lg text-text-secondary">
              اشتركي في نشرتنا الإخبارية واحصلي على عروض حصرية وأحدث النصائح.
            </p>
          </div>

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary rtl:right-auto rtl:left-4" />
                  <Input
                    type="email"
                    placeholder="أدخلي بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 rtl:pl-4 rtl:pr-12"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white"
                >
                  {isLoading ? "جاري الإرسال..." : "اشترك الآن"}
                </Button>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-text-secondary text-center">
                نحن نحترم خصوصيتك. لن نرسل لك رسائل بريد عشوائية.
              </p>
            </form>
          ) : (
            /* Success Message */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6 md:p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                شكرًا لك!
              </h3>
              <p className="text-green-700">
                تم تأكيد اشتراكك بنجاح. تحقق من بريدك الإلكتروني للحصول على عرض
                خاص.
              </p>
            </motion.div>
          )}

          {/* Benefits */}
          <motion.div
            className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <p className="text-text-secondary">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
