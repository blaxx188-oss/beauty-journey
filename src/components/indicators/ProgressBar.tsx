"use client";

/**
 * ProgressBar — Elegant Rose Gold progress indicator for Beauty Quiz.
 */

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Background Track */}
      <div className="w-full h-1 bg-neutral-secondary rounded-full overflow-hidden">
        {/* Progress Fill */}
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.8, 0.5, 1] }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index < current ? "bg-accent" : "bg-neutral-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
