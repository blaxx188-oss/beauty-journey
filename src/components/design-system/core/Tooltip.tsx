"use client";

/**
 * Tooltip — Hover/focus tooltip with custom positioning.
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

const positionClasses: Record<TooltipPosition, string> = {
  top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  left: "right-full me-2 top-1/2 -translate-y-1/2",
  right: "left-full ms-2 top-1/2 -translate-y-1/2",
};

function Tooltip({
  content,
  children,
  position = "top",
  delay = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="tooltip"
            className={cn(
              "absolute z-tooltip px-3 py-2 text-xs text-white bg-midnight-onyx rounded-sm whitespace-nowrap shadow-md",
              positionClasses[position],
              className
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Tooltip.displayName = "Tooltip";

export { Tooltip };
export default Tooltip;
