/**
 * Product Service — Server-side data fetching for products.
 * Uses Supabase client for database queries.
 */

import { supabaseClient } from "@/lib/supabase";

// ============================================
// TYPES
// ============================================

export interface Product {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  brand_name: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ProductWithMedia extends Product {
  media: ProductMedia[];
  category: Category;
}

export interface ProductMedia {
  id: string;
  product_id: string;
  type: "image" | "video";
  url: string;
  is_hero: boolean;
  order_index: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  image_url: string | null;
  description: string | null;
}

export interface ProductFilters {
  categoryId?: string;
  brandName?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price_asc" | "price_desc" | "newest" | "best_seller";
  searchQuery?: string;
  page?: number;
  limit?: number;
}

// ============================================
// FUNCTIONS
// ============================================

/**
 * Fetch all active products with optional filters.
 */
export async function getProducts(filters: ProductFilters = {}) {
  const {
    categoryId,
    brandName,
    minPrice,
    maxPrice,
    sortBy = "newest",
    searchQuery,
    page = 1,
    limit = 20,
  } = filters;

  let query = supabaseClient
    .from("products")
    .select("*, media(*)")
    .eq("is_active", true);

  // Apply filters
  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (brandName) {
    query = query.eq("brand_name", brandName);
  }

  if (minPrice !== undefined) {
    query = query.gte("price", minPrice);
  }

  if (maxPrice !== undefined) {
    query = query.lte("price", maxPrice);
  }

  if (searchQuery) {
    query = query.or(
      `title.ilike.%${searchQuery}%, description.ilike.%${searchQuery}%`
    );
  }

  // Apply sorting
  switch (sortBy) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "best_seller":
      // Placeholder: would join with order_items count in production
      query = query.order("created_at", { ascending: false });
      break;
  }

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

/**
 * Fetch a single product by slug.
 */
export async function getProductBySlug(slug: string) {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*, media(*), category(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch products by category slug.
 */
export async function getProductsByCategory(categorySlug: string) {
  const { data: category } = await supabaseClient
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (!category) return [];

  return getProducts({ categoryId: category.id });
}

/**
 * Fetch search suggestions based on query.
 */
export async function getSearchSuggestions(query: string) {
  if (!query || query.length < 2) return { products: [], categories: [], brands: [] };

  const { data: products } = await supabaseClient
    .from("products")
    .select("id, title, slug, price, media(url)")
    .ilike("title", `%${query}%`)
    .eq("is_active", true)
    .limit(5);

  const { data: categories } = await supabaseClient
    .from("categories")
    .select("id, name, slug")
    .ilike("name", `%${query}%`)
    .limit(3);

  const { data: brands } = await supabaseClient
    .from("brands")
    .select("name, slug")
    .ilike("name", `%${query}%`)
    .limit(3);

  return {
    products: products || [],
    categories: categories || [],
    brands: brands || [],
  };
}

/**
 * Fetch trending products (based on views/sales placeholder).
 */
export async function getTrendingProducts(limit: number = 8) {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*, media(*)")
    .eq("is_active", true)
    .order("created_at", { ascending: false }) // Placeholder for trending
    .limit(limit);

  if (error) throw error;
  return data;
}

/**
 * Fetch best-selling products.
 */
export async function getBestSellers(limit: number = 10) {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*, media(*)")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

/**
 * Fetch related products by category.
 */
export async function getRelatedProducts(productId: string, limit: number = 6) {
  const { data: product } = await supabaseClient
    .from("products")
    .select("category_id")
    .eq("id", productId)
    .single();

  if (!product) return [];

  const { data, error } = await supabaseClient
    .from("products")
    .select("*, media(*)")
    .eq("category_id", product.category_id)
    .eq("is_active", true)
    .neq("id", productId)
    .limit(limit);

  if (error) throw error;
  return data;
}
