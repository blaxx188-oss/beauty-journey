"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/design-system/core/Button";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AdminPageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  action?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
  } | React.ReactNode;
}

export function AdminPageHeader({ title, breadcrumbs, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <nav className="flex items-center gap-2 text-xs text-text-secondary mb-2">
          <Link href="/admin" className="hover:text-accent">الرئيسية</Link>
          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3" />
              {bc.href ? (
                <Link href={bc.href} className="hover:text-accent">{bc.label}</Link>
              ) : (
                <span className="text-text-primary font-bold">{bc.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h1 className="text-2xl md:text-3xl font-black text-text-primary">{title}</h1>
      </div>

      {action && (
        React.isValidElement(action) ? (
          action
        ) : (
          (action as any).href ? (
            <Link href={(action as any).href}>
              <Button className="bg-accent text-white gap-2 shadow-lg shadow-accent/20">
                {(action as any).icon}
                {(action as any).label}
              </Button>
            </Link>
          ) : (
            <Button 
              onClick={(action as any).onClick}
              className="bg-accent text-white gap-2 shadow-lg shadow-accent/20"
            >
              {(action as any).icon}
              {(action as any).label}
            </Button>
          )
        )
      )}
    </div>
  );
}
