"use client";

/**
 * Popover — Click-triggered floating panel with click-outside dismiss.
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export type PopoverPosition = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: PopoverPosition;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
}

// ============================================
// POSITION CLASSES
// ============================================

const positionClasses: Record<PopoverPosition, string> = {
  top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  left: "right-full me-2 top-1/2 -translate-y-1/2",
  right: "left-full ms-2 top-1/2 -translate-y-1/2",
};

// ============================================
// COMPONENT
// ============================================

function Popover({
  trigger,
  children,
  position = "bottom",
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalOpen(open);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <div onClick={() => setOpen(!isOpen)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "absolute z-dropdown",
              positionClasses[position],
              contentClassName
            )}
            initial={{ opacity: 0, scale: 0.95, y: position === "bottom" ? -4 : position === "top" ? 4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Popover.displayName = "Popover";

export { Popover };
export default Popover;
