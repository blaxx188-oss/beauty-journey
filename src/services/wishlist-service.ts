/**
 * Wishlist Service — Manages user wishlist.
 * Handles adding, removing, and fetching wishlist items.
 */

import { supabaseClient } from "@/lib/supabase";
import type { WishlistItem } from "@/types";

/**
 * Fetch all wishlist items for the current user.
 */
export async function getWishlist(): Promise<WishlistItem[]> {
  const { data, error } = await supabaseClient
    .from("wishlist")
    .select("*, product:products(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    userId: item.user_id,
    productId: item.product_id,
    createdAt: item.created_at,
    product: item.product ? {
      id: item.product.id,
      categoryId: item.product.category_id,
      title: item.product.title,
      slug: item.product.slug,
      description: item.product.description,
      price: item.product.price,
      currency: item.product.currency,
      brandName: item.product.brand_name,
      isActive: item.product.is_active,
      createdAt: item.product.created_at,
    } : undefined,
  }));
}

/**
 * Add a product to the wishlist.
 */
export async function addToWishlist(productId: string): Promise<WishlistItem> {
  const { data, error } = await supabaseClient
    .from("wishlist")
    .insert({ product_id: productId })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    userId: data.user_id,
    productId: data.product_id,
    createdAt: data.created_at,
  };
}

/**
 * Remove a product from the wishlist.
 */
export async function removeFromWishlist(productId: string): Promise<void> {
  const { error } = await supabaseClient
    .from("wishlist")
    .delete()
    .eq("product_id", productId);

  if (error) throw error;
}

/**
 * Check if a product is in the wishlist.
 */
export async function isInWishlist(productId: string): Promise<boolean> {
  const { data, error } = await supabaseClient
    .from("wishlist")
    .select("id")
    .eq("product_id", productId)
    .maybeSingle();

  if (error) return false;
  return !!data;
}
