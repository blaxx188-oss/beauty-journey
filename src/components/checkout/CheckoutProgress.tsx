"use client";

/**
 * CheckoutProgress — Multi-step progress indicator for the checkout flow.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React from "react";
import { motion } from "framer-motion";
import { Check, ChevronLeft } from "lucide-react";
import type { CheckoutStep } from "@/types";

// ============================================
// TYPES
// ============================================

interface CheckoutStepItem {
  id: CheckoutStep;
  label: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface CheckoutProgressProps {
  steps: CheckoutStepItem[];
  onStepClick?: (step: CheckoutStep) => void;
}

// ============================================
// STEP ICONS
// ============================================

const STEP_ICONS: Record<CheckoutStep, string> = {
  shipping: "📍",
  delivery: "🚚",
  payment: "💳",
  review: "📋",
};

// ============================================
// COMPONENT
// ============================================

export default function CheckoutProgress({
  steps,
  onStepClick,
}: CheckoutProgressProps) {
  return (
    <nav aria-label="خطوات إتمام الطلب" className="w-full mb-8">
      {/* Mobile: Horizontal scrollable pills */}
      <div className="lg:hidden">
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={step.completed || step.current}
                className={`
                  flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-medium transition-all duration-200
                  ${
                    step.current
                      ? "bg-accent text-white shadow-sm"
                      : step.completed
                      ? "bg-success/10 text-success"
                      : "bg-surface text-text-secondary border border-border"
                  }
                `}
                aria-current={step.current ? "step" : undefined}
                aria-label={`${step.label}${step.completed ? " — مكتمل" : ""}${step.current ? " — الحالي" : ""}`}
              >
                <span className="text-base">{STEP_ICONS[step.id]}</span>
                <span className="whitespace-nowrap">{step.label}</span>
              </button>
              {index < steps.length - 1 && (
                <ChevronLeft
                  className={`w-3 h-3 flex-shrink-0 ${
                    step.completed ? "text-success" : "text-disabled"
                  }`}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Desktop: Full step indicator with progress bar */}
      <div className="hidden lg:block">
        <div className="relative flex items-center justify-between">
          {/* Progress line background */}
          <div
            className="absolute top-6 right-0 left-0 h-0.5 bg-border"
            aria-hidden="true"
          />
          {/* Progress line fill */}
          <motion.div
            className="absolute top-6 right-0 h-0.5 bg-accent"
            initial={{ width: 0 }}
            animate={{
              width: `${((steps.filter((s) => s.completed).length) / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center">
              {/* Step circle */}
              <motion.button
                onClick={() => onStepClick?.(step.id)}
                disabled={!step.completed}
                className={`
                  relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${
                    step.current
                      ? "border-accent bg-accent text-white scale-110 shadow-md"
                      : step.completed
                      ? "border-success bg-success text-white"
                      : "border-border bg-surface text-disabled"
                  }
                `}
                whileHover={step.completed ? { scale: 1.05 } : {}}
                whileTap={step.completed ? { scale: 0.95 } : {}}
                aria-current={step.current ? "step" : undefined}
                aria-label={`الخطوة ${index + 1}: ${step.label}${step.completed ? " (مكتملة)" : ""}${step.current ? " (الحالية)" : ""}`}
              >
                {step.completed ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-lg">{STEP_ICONS[step.id]}</span>
                )}
              </motion.button>

              {/* Step label */}
              <div className="mt-3 text-center">
                <p
                  className={`text-sm font-medium transition-colors duration-200 ${
                    step.current
                      ? "text-accent"
                      : step.completed
                      ? "text-success"
                      : "text-text-secondary"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-text-secondary mt-0.5 opacity-70">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
