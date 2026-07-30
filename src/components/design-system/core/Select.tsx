"use client";

/**
 * Select — Custom dropdown select with floating label.
 * Keyboard accessible, RTL-aware, with custom dropdown UI.
 */

import React, { useId, useState, useRef, useEffect, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { ChevronDown, Check } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

// ============================================
// VARIANTS
// ============================================

const selectVariants = cva("", {
  variants: {
    size: {
      sm: "h-9 text-xs",
      md: "h-12 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================
// COMPONENT
// ============================================

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      size,
      options,
      value,
      onValueChange,
      label,
      placeholder = "اختر...",
      error,
      hint,
      disabled = false,
      className,
    },
    ref
  ) => {
    const autoId = useId();
    const id = `select-${autoId}`;
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          listboxRef.current &&
          !listboxRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (isOpen) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setIsOpen(true);
        }
      },
      [isOpen]
    );

    const handleOptionSelect = (optionValue: string) => {
      onValueChange?.(optionValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    return (
      <div className="w-full">
        {/* Trigger */}
        <div className="relative">
          <button
            ref={(node) => {
              (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            }}
            id={id}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={`${id}-listbox`}
            aria-label={label || placeholder}
            aria-invalid={!!error}
            disabled={disabled}
            className={cn(
              selectVariants({ size }),
              "w-full flex items-center justify-between px-4 bg-transparent border rounded-sm transition-colors duration-150",
              "focus:outline-none focus:ring-0",
              error
                ? "border-error text-error"
                : isOpen
                ? "border-accent text-text-primary"
                : "border-border text-text-primary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
          >
            <span className={cn(!selectedOption && "text-placeholder")}>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-150",
                isOpen && "rotate-180"
              )}
            />
          </button>

          {/* Floating Label */}
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "absolute right-4 transition-all duration-150 pointer-events-none",
                isOpen || selectedOption ? "top-1 text-xs" : "top-3.5 text-base",
                error
                  ? "text-error"
                  : isOpen
                  ? "text-accent"
                  : "text-placeholder"
              )}
            >
              {label}
            </label>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            ref={listboxRef}
            id={`${id}-listbox`}
            role="listbox"
            aria-labelledby={id}
            className={cn(
              "absolute z-dropdown mt-1 w-full bg-surface border border-border rounded-sm shadow-md",
              "max-h-48 overflow-y-auto",
              "animate-in fade-in-0 slide-in-from-top-1"
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                disabled={option.disabled}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors duration-150",
                  "hover:bg-neutral-secondary",
                  option.value === value && "bg-neutral-secondary text-accent",
                  option.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() =>
                  !option.disabled && handleOptionSelect(option.value)
                }
              >
                <span>{option.label}</span>
                {option.value === value && <Check className="w-4 h-4 text-accent" />}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-1 text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="mt-1 text-sm text-text-secondary">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
export default Select;
