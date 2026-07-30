"use client";

/**
 * EmptyState — Reusable empty state for wishlist, cart, search results.
 * Per spec: consistent across all empty states with branded illustration area.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      {/* Icon Placeholder */}
      {icon && (
        <div className="w-20 h-20 rounded-full bg-neutral-secondary flex items-center justify-center mb-6 text-placeholder">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-medium text-text-primary mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-text-secondary max-w-sm mb-6">
          {description}
        </p>
      )}

      {action && (
        <Link
          href={action.href}
          className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-sm hover:bg-accent-hover transition-colors duration-150"
        >
          {action.label}
        </Link>
      )}
    </motion.div>
  );
}
