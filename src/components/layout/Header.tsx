"use client";

/**
 * Header — Sticky navigation bar with glassmorphism on scroll.
 * Structure: Categories (right in RTL) | Logo (center) | Search, Wishlist, Cart, Account (left in RTL)
 * Phase 8: Integrated with Zustand cart store for real badge count and MiniCartDrawer.
 */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import MiniCartDrawer from "@/components/cart/MiniCartDrawer";
import SearchOverlay from "@/components/search/SearchOverlay";
import { useSearchStore } from "@/stores/search-store";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openSearch } = useSearchStore();

  // Cart store selectors
  const { items, toggleCart, isOpen } = useCartStore();

  // Real badge count from Zustand
  const badgeCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[20] w-full transition-all duration-300 ${
          isScrolled
            ? "bg-soft-pearl/90 backdrop-blur-[10px] border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button (RTL: right side) */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Categories Link (RTL: right side) */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/products"
                className="text-sm font-medium text-text-primary hover:text-accent transition-colors duration-150"
              >
                الأقسام
              </Link>
            </nav>

            {/* Logo (Center) */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2"
              aria-label="Beauty Journey - Home"
            >
              <span className="text-xl md:text-2xl font-bold tracking-tight text-text-primary" style={{ fontFamily: "var(--font-heading-ar)" }}>
                Beauty Journey
              </span>
            </Link>

            {/* Actions (RTL: left side) */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                className="p-2 md:p-2.5 hover:text-accent transition-colors duration-150"
                onClick={openSearch}
                aria-label="Search"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                className="hidden md:block p-2.5 hover:text-accent transition-colors duration-150"
                onClick={() => {/* Wishlist toggle placeholder */}}
                aria-label="Wishlist"
              >
                <Heart className="w-6 h-6" />
              </button>

              {/* Cart Button with Real Badge Count */}
              <button
                className="p-2 md:p-2.5 hover:text-accent transition-colors duration-150 relative"
                onClick={() => toggleCart()}
                aria-label={`سلة التسوق (${badgeCount} منتجات)`}
                aria-current={isOpen ? "true" : undefined}
              >
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                {badgeCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-accent text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1"
                  >
                    {badgeCount > 99 ? "99+" : badgeCount}
                  </motion.span>
                )}
              </button>

              <Link
                href="/account"
                className="hidden md:block p-2.5 hover:text-accent transition-colors duration-150"
                aria-label="Account"
              >
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mini Cart Drawer */}
      <MiniCartDrawer />

      {/* Search Overlay */}
      <SearchOverlay />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[40] bg-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Mobile menu content */}
            <div className="absolute inset-0 p-6 pt-20" onClick={(e) => e.stopPropagation()}>
              <nav className="flex flex-col gap-6">
                <Link href="/products" className="text-lg font-medium">
                  الأقسام
                </Link>
                <Link href="/cart" className="text-lg font-medium">
                  سلة التسوق
                  {badgeCount > 0 && (
                    <span className="mr-2 text-sm text-accent">
                      ({badgeCount})
                    </span>
                  )}
                </Link>
                <Link href="/account/wishlist" className="text-lg font-medium">
                  المفضلة
                </Link>
                <Link href="/account" className="text-lg font-medium">
                  حسابي
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
