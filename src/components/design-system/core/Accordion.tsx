"use client";

/**
 * Accordion — Collapsible sections with animated open/close.
 */

import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultOpen)
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);

        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
              className={cn(
                "w-full flex items-center justify-between py-4 px-1 text-start transition-colors duration-150",
                "hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
                item.disabled && "opacity-50 cursor-not-allowed",
                isOpen ? "text-accent" : "text-text-primary"
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
            >
              <span className="text-sm font-medium">{item.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-sm text-text-secondary leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

Accordion.displayName = "Accordion";

export { Accordion };
export default Accordion;
