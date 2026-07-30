"use client";

/**
 * SearchOverlay — Full-screen on mobile/tablet, modal on desktop.
 * Per spec: recent searches, trending searches, popular categories, live suggestions.
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Clock, ArrowLeft, Loader2, ChevronRight } from "lucide-react";
import { useDebounce } from "@/hooks";
import { getSearchSuggestions } from "@/services/product-service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/stores/search-store";

const trendingSearches = [
  "سيروم فيتامين سي",
  "كريم مرطب",
  "شامبو خالي من السلفات",
  "واقي شمس",
];

const popularCategories = [
  { name: "العناية بالبشرة", slug: "skincare" },
  { name: "العناية بالشعر", slug: "haircare" },
  { name: "المكياج", slug: "makeup" },
  { name: "العطور", slug: "fragrance" },
];

export default function SearchOverlay() {
  const { isOpen, closeSearch } = useSearchStore();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length >= 2) {
        setIsLoading(true);
        try {
          const results = await getSearchSuggestions(debouncedQuery);
          setSuggestions(results);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions(null);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    // Save to recent searches
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] bg-soft-pearl overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-surface/90 backdrop-blur-[10px] border-b border-border px-4 py-3 flex items-center gap-3">
            <button
              onClick={closeSearch}
              className="p-2 hover:bg-neutral-secondary rounded-full transition-colors"
              aria-label="إغلاق البحث"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <form 
              className="flex-1 relative" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحثي عن منتج..."
                className="w-full h-12 px-4 pr-12 text-base bg-neutral-secondary rounded-xl border-none placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                aria-label="بحث"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-placeholder" />
              {isLoading && (
                <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent animate-spin" />
              )}
            </form>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto px-4 py-8">
            {query.length >= 2 && suggestions ? (
              <div className="space-y-8">
                {/* Suggestions List */}
                {suggestions.products.length === 0 && suggestions.categories.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <p className="text-text-secondary">لا توجد نتائج لـ "{query}"</p>
                  </div>
                )}

                {/* Categories & Brands Suggestions */}
                {(suggestions.categories.length > 0 || suggestions.brands.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {suggestions.categories.length > 0 && (
                      <section>
                        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">الأقسام</h3>
                        <div className="space-y-2">
                          {suggestions.categories.map((cat: any) => (
                            <Link 
                              key={cat.id} 
                              href={`/categories/${cat.slug}`}
                              onClick={closeSearch}
                              className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-accent/5 group transition-colors"
                            >
                              <span className="text-sm font-medium">{cat.name}</span>
                              <ChevronRight className="w-4 h-4 text-placeholder group-hover:text-accent transition-colors" />
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}
                    {suggestions.brands.length > 0 && (
                      <section>
                        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">العلامات التجارية</h3>
                        <div className="space-y-2">
                          {suggestions.brands.map((brand: string) => (
                            <button 
                              key={brand}
                              onClick={() => handleSearch(brand)}
                              className="w-full flex items-center justify-between p-3 bg-white rounded-xl hover:bg-accent/5 group transition-colors"
                            >
                              <span className="text-sm font-medium">{brand}</span>
                              <ChevronRight className="w-4 h-4 text-placeholder group-hover:text-accent transition-colors" />
                            </button>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                )}

                {/* Product Results */}
                {suggestions.products.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider">المنتجات</h3>
                      <button 
                        onClick={() => handleSearch(query)}
                        className="text-xs font-bold text-accent hover:underline"
                      >
                        عرض كل النتائج
                      </button>
                    </div>
                    <div className="space-y-3">
                      {suggestions.products.map((product: any) => (
                        <Link 
                          key={product.id} 
                          href={`/products/${product.slug}`}
                          onClick={closeSearch}
                          className="flex items-center gap-4 p-3 bg-white rounded-xl hover:bg-accent/5 transition-colors group"
                        >
                          <div className="w-16 h-16 bg-neutral-secondary rounded-lg overflow-hidden flex-shrink-0">
                            {product.media?.[0]?.url && (
                              <img src={product.media[0].url} alt={product.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-text-primary truncate group-hover:text-accent transition-colors">
                              {product.title}
                            </h4>
                            <p className="text-sm font-black text-accent mt-1">
                              {product.price} {product.currency || "ج.م"}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-placeholder" />
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-text-secondary" />
                          <h3 className="text-base font-bold text-text-primary">عمليات البحث الأخيرة</h3>
                        </div>
                        <button onClick={clearRecent} className="text-xs text-text-secondary hover:text-error transition-colors">مسح</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search) => (
                          <button
                            key={search}
                            className="px-4 py-2 bg-white border border-border rounded-full text-sm hover:border-accent hover:text-accent transition-all"
                            onClick={() => handleSearch(search)}
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Trending Searches */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <h3 className="text-base font-bold text-text-primary">الأكثر بحثًا</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((search) => (
                        <button
                          key={search}
                          className="px-4 py-2 bg-white border border-border rounded-full text-sm hover:border-accent hover:text-accent transition-all"
                          onClick={() => handleSearch(search)}
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  {/* Popular Categories */}
                  <section>
                    <h3 className="text-base font-bold text-text-primary mb-4">الأقسام الشائعة</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {popularCategories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/categories/${category.slug}`}
                          onClick={closeSearch}
                          className="flex items-center justify-between p-4 bg-white border border-border rounded-xl hover:border-accent group transition-all"
                        >
                          <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">{category.name}</span>
                          <ChevronRight className="w-4 h-4 text-placeholder group-hover:text-accent transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
