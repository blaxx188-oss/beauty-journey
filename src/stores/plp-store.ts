import { create } from "zustand";

export interface ProductFilters {
  categoryId?: string;
  brandName?: string[];
  minPrice?: number;
  maxPrice?: number;
  skinConcern?: string[];
  skinType?: string[];
  productType?: string[];
  availability?: boolean;
  rating?: number;
  discount?: number;
  searchQuery?: string;
}

export type SortByOption = "price_asc" | "price_desc" | "newest" | "best_seller" | "relevance";

interface PLPState {
  filters: ProductFilters;
  sortBy: SortByOption;
  page: number;
  limit: number;
  setFilters: (filters: Partial<ProductFilters>) => void;
  setSortBy: (sortBy: SortByOption) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const initialFilters: ProductFilters = {};

export const usePLPStore = create<PLPState>((set) => ({
  filters: initialFilters,
  sortBy: "relevance",
  page: 1,
  limit: 12,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1, // Reset page on filter change
    })),
  setSortBy: (sortBy) => set({ sortBy, page: 1 }), // Reset page on sort change
  setPage: (page) => set({ page }),
  resetFilters: () => set({ filters: initialFilters, page: 1 }),
}));
