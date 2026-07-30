"use client";

/**
 * Auth Success Page — Confirmation of successful action.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, User } from "lucide-react";

import { Button } from "@/components/design-system/core/Button";

export default function AuthSuccessPage() {
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
        className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
        variants={itemVariants}
      >
        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
      </motion.div>

      <motion.h1 
        className="text-3xl font-bold text-text-primary mb-4"
        variants={itemVariants}
      >
        تم بنجاح!
      </motion.h1>

      <motion.p 
        className="text-text-secondary mb-10 text-lg"
        variants={itemVariants}
      >
        لقد تمت العملية بنجاح. أنتِ الآن جاهزة لاستكشاف عالم بيوتي جورني.
      </motion.p>

      <motion.div className="flex flex-col gap-4" variants={itemVariants}>
        <Link href="/products" className="w-full">
          <Button className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90 text-white">
            <ShoppingBag className="w-5 h-5 ml-2" />
            ابدئي التسوق
          </Button>
        </Link>

        <Link href="/account" className="w-full">
          <Button variant="outline" className="w-full h-12 border-border hover:bg-neutral-secondary">
            <User className="w-5 h-5 ml-2" />
            حسابي الشخصي
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
