"use client";

import React from "react";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/design-system/core/Button";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";

export default function UnauthorizedPage() {
  return (
    <Section className="min-h-screen flex items-center justify-center bg-neutral-secondary/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center space-y-8 bg-white dark:bg-neutral-primary p-12 rounded-3xl border border-border shadow-xl"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
            <Lock className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-text-primary">غير مصرح بالدخول</h1>
            <p className="text-text-secondary">يرجى تسجيل الدخول أولاً للوصول إلى هذه الصفحة.</p>
          </div>

          <div className="flex flex-col gap-4">
            <Link href="/auth/login">
              <Button className="w-full bg-accent hover:bg-accent/90 text-white gap-2">
                تسجيل الدخول
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full">
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
