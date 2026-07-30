"use client";

import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{title}</h1>
          {description && (
            <p className="text-text-secondary mt-1 text-sm md:text-base">{description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="icon" size="sm" className="relative text-text-secondary hover:text-accent">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
          </Button>
          <div className="hidden md:flex relative w-64">
            <Input 
              placeholder="بحث في حسابك..." 
              className="pl-10 bg-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          </div>
        </div>
      </div>
      
      {/* Breadcrumbs could go here if needed */}
    </div>
  );
}
