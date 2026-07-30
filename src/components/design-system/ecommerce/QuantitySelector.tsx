"use client";

/**
 * QuantitySelector — Increment/decrement quantity control.
 */

import React, { useState, useCallback } from "react";
import { cn } from "@/utils/cn";
import { Minus, Plus } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface QuantitySelectorProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function QuantitySelector({
  value: controlledValue,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const setValue = useCallback(
    (newValue: number) => {
      const clamped = Math.min(max, Math.max(min, newValue));
      if (controlledValue === undefined) {
        setInternalValue(clamped);
      }
      onChange?.(clamped);
    },
    [controlledValue, max, min, onChange]
  );

  const decrement = () => {
    if (value > min && !disabled) setValue(value - 1);
  };

  const increment = () => {
    if (value < max && !disabled) setValue(value + 1);
  };

  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border border-border rounded-sm bg-surface",
        className
      )}
      role="group"
      aria-label="الكمية"
    >
      {/* Decrement */}
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className={cn(
          "flex items-center justify-center transition-colors duration-150",
          "hover:bg-neutral-secondary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px]",
          (disabled || value <= min) && "opacity-30 cursor-not-allowed",
          sizeClasses[size]
        )}
        aria-label="تقليل الكمية"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      {/* Value */}
      <span
        className={cn(
          "text-center font-medium min-w-[32px] text-text-primary",
          sizeClasses[size],
          "px-1"
        )}
        aria-live="polite"
      >
        {value}
      </span>

      {/* Increment */}
      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        className={cn(
          "flex items-center justify-center transition-colors duration-150",
          "hover:bg-neutral-secondary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px]",
          (disabled || value >= max) && "opacity-30 cursor-not-allowed",
          sizeClasses[size]
        )}
        aria-label="زيادة الكمية"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

QuantitySelector.displayName = "QuantitySelector";

export { QuantitySelector };
export default QuantitySelector;
