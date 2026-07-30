"use client";

/**
 * MobileBottomNav — Persistent bottom navigation for mobile.
 * Items: Home, Search, Wishlist, Cart, Account.
 * 48px minimum touch targets per design spec.
 * Phase 8: Added cart item with live badge count.
 */

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { motion } from "framer-motion";
import { useSearchStore } from "@/stores/search-store";

const navItems = [
  { href: "/", label: "الرئيسية", icon: Home },
  { label: "بحث", icon: Search, isSearch: true },
  { href: "/account/wishlist", label: "المفضلة", icon: Heart },
  { href: "/cart", label: "السلة", icon: ShoppingBag, isCart: true },
  { href: "/account", label: "حسابي", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const badgeCount = items.reduce((total, item) => total + item.quantity, 0);
  const { openSearch } = useSearchStore();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[20] bg-surface border-t border-border safe-area-bottom"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : item.href ? pathname.startsWith(item.href) : false;
          const Icon = item.icon;

          if (item.isSearch) {
            return (
              <button
                key="search-nav"
                onClick={openSearch}
                className="relative flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] text-text-secondary hover:text-accent transition-colors duration-150"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`relative flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] transition-colors duration-150 ${
                isActive ? "text-accent" : "text-text-secondary"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              {item.isCart && badgeCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 right-1/2 translate-x-3 min-w-[16px] h-4 bg-accent text-white text-[9px] font-medium rounded-full flex items-center justify-center px-0.5"
                >
                  {badgeCount > 99 ? "99+" : badgeCount}
                </motion.span>
              )}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
