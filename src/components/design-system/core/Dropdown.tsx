"use client";

/**
 * Dropdown — Trigger-based dropdown menu with keyboard navigation.
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: "start" | "end";
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function Dropdown({ trigger, items, position = "end", className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const focusableItems = items.filter((item) => !item.disabled && !item.separator);
      const currentIndex = focusableItems.findIndex((item) =>
        document.activeElement === itemRefs.current.get(item.id)
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableItems.length;
        itemRefs.current.get(focusableItems[nextIndex].id)?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? focusableItems.length - 1 : currentIndex - 1;
        itemRefs.current.get(focusableItems[prevIndex].id)?.focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    },
    [items]
  );

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            className={cn(
              "absolute top-full mt-1 min-w-[200px] bg-surface border border-border rounded-sm shadow-md py-1 z-dropdown",
              position === "end" ? "end-0" : "start-0"
            )}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onKeyDown={handleKeyDown}
          >
            {items.map((item) =>
              item.separator ? (
                <div key={`sep-${item.id}`} className="my-1 h-px bg-border" role="separator" />
              ) : (
                <button
                  key={item.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(item.id, el);
                    else itemRefs.current.delete(item.id);
                  }}
                  role="menuitem"
                  disabled={item.disabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150",
                    "hover:bg-neutral-secondary",
                    "focus:outline-none focus:bg-neutral-secondary",
                    item.destructive ? "text-error hover:bg-error/10" : "text-text-primary",
                    item.disabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => handleItemClick(item)}
                >
                  {item.icon && <span className="w-4 h-4 flex-shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Dropdown.displayName = "Dropdown";

export { Dropdown };
export default Dropdown;
