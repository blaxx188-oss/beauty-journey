"use client";

/**
 * ErrorState — Reusable error state with retry action.
 * Per spec: Muted Burgundy for error states.
 */

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "حدث خطأ",
  message = "نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.",
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-error" />
      </div>

      <h3 className="text-lg font-medium text-text-primary mb-2">
        {title}
      </h3>

      <p className="text-sm text-text-secondary max-w-sm mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-hover transition-colors duration-150"
        >
          <RefreshCw className="w-4 h-4" />
          إعادة المحاولة
        </button>
      )}
    </motion.div>
  );
}
