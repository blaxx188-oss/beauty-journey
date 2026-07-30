"use client";

/**
 * Tabs — Tabbed content area with animated indicator.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: "underline" | "pills";
  onTabChange?: (tabId: string) => void;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function Tabs({
  tabs,
  defaultTab,
  variant = "underline",
  onTabChange,
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tab: Tab) => {
    if (tab.disabled) return;
    setActiveTab(tab.id);
    onTabChange?.(tab.id);
  };

  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab List */}
      <div
        role="tablist"
        className={cn(
          "flex gap-1",
          variant === "underline"
            ? "border-b border-border"
            : "bg-neutral-secondary p-1 rounded-sm"
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
                variant === "underline"
                  ? isActive
                    ? "text-accent border-b-2 border-accent"
                    : "text-text-secondary hover:text-text-primary"
                  : isActive
                  ? "text-white bg-accent rounded-sm"
                  : "text-text-secondary hover:text-text-primary",
                tab.disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleTabClick(tab)}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-medium rounded-full",
                    isActive && variant === "pills"
                      ? "bg-white/20 text-white"
                      : "bg-neutral-secondary text-text-secondary"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      <div role="tabpanel" id={`tabpanel-${activeTab}`}>
        {activeTabData?.content}
      </div>
    </div>
  );
}

Tabs.displayName = "Tabs";

export { Tabs };
export default Tabs;
