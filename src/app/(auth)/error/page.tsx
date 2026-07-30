"use client";

/**
 * Auth Error Page — Display authentication failures.
 */

import React, { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/design-system/core/Button";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "حدث خطأ غير متوقع أثناء عملية التحقق";

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-white dark:bg-neutral-primary p-10 rounded-2xl shadow-xl border border-border text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
        variants={itemVariants}
      >
        <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
      </motion.div>

      <motion.h1 
        className="text-3xl font-bold text-text-primary mb-4"
        variants={itemVariants}
      >
        عذراً، حدث خطأ
      </motion.h1>

      <motion.p 
        className="text-text-secondary mb-10 text-lg leading-relaxed"
        variants={itemVariants}
      >
        {error}
      </motion.p>

      <motion.div className="flex flex-col gap-4" variants={itemVariants}>
        <Link href="/auth/login" className="w-full">
          <Button className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90 text-white">
            <RefreshCw className="w-5 h-5 ml-2" />
            المحاولة مرة أخرى
          </Button>
        </Link>

        <Link href="/contact" className="w-full">
          <Button variant="outline" className="w-full h-12 border-border hover:bg-neutral-secondary">
            التواصل مع الدعم
          </Button>
        </Link>
      </motion.div>

      <motion.div 
        className="mt-10 pt-6 border-t border-border"
        variants={itemVariants}
      >
        <Link
          href="/"
          className="text-text-secondary hover:text-accent font-medium flex items-center justify-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للرئيسية
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">جاري التحميل...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
