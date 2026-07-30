"use client";

/**
 * Breadcrumb — Navigation breadcrumb trail.
 */

import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { ChevronLeft } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function Breadcrumb({
  items,
  separator,
  className,
}: BreadcrumbProps) {
  const defaultSeparator = (
    <ChevronLeft className="w-3.5 h-3.5 text-text-secondary rtl:rotate-180" />
  );

  return (
    <nav aria-label="مسار التنقل" className={cn("flex items-center gap-2 text-sm", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="flex-shrink-0" aria-hidden="true">
                {separator || defaultSeparator}
              </span>
            )}

            {isLast ? (
              <span className="text-text-primary font-medium" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-accent transition-colors duration-150"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-secondary">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
export default Breadcrumb;
