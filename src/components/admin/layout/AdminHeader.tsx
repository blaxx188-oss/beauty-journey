"use client";

import React from "react";
import { 
  Search, 
  Bell, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  Globe,
  Maximize2,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/design-system/core/Button";
import { Input } from "@/components/design-system/core/Input";
import { useAuth } from "@/lib/auth-context";
import { Avatar } from "@/components/design-system/core/Avatar";

export function AdminHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border bg-white/80 dark:bg-neutral-primary/80 backdrop-blur-md px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 text-text-secondary hover:bg-neutral-secondary rounded-xl lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex relative w-80">
          <Input 
            placeholder="البحث عن منتج، طلب، أو عميل..." 
            className="pl-10 bg-neutral-secondary/30 border-none focus:ring-2 focus:ring-accent/20"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Quick Actions */}
        <div className="hidden sm:flex items-center gap-1 border-l border-border pl-4">
          <Button variant="ghost" size="sm" className="text-text-secondary hover:text-accent p-2">
            <Globe className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-text-secondary hover:text-accent p-2">
            <Maximize2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="relative text-text-secondary hover:text-accent p-2">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pr-2">
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-bold text-text-primary leading-none">
              {user?.user_metadata?.full_name || "المسؤول"}
            </span>
            <span className="text-[10px] text-accent font-bold uppercase mt-1">Super Admin</span>
          </div>
          <Avatar 
            size="md" 
            alt={user?.user_metadata?.full_name}
            className="border-2 border-accent/20"
          />
        </div>
      </div>
    </header>
  );
}
