/**
 * Review Service — Manages product reviews.
 */

import { supabaseClient } from "@/lib/supabase";
import type { Review } from "@/types";

/**
 * Fetch reviews for a specific product.
 */
export async function getProductReviews(productId: string): Promise<Review[]> {
  const { data, error } = await supabaseClient
    .from("reviews")
    .select("*, user:profiles(full_name)")
    .eq("product_id", productId)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    productId: item.product_id,
    userId: item.user_id,
    rating: item.rating,
    comment: item.comment,
    isVerifiedPurchase: item.is_verified_purchase,
    isPublished: item.is_published,
    createdAt: item.created_at,
    user: item.user ? {
      fullName: item.user.full_name,
    } : undefined,
  }));
}

/**
 * Submit a new review.
 */
export async function submitReview(input: {
  productId: string;
  rating: number;
  comment: string;
}): Promise<Review> {
  const { data, error } = await supabaseClient
    .from("reviews")
    .insert({
      product_id: input.productId,
      rating: input.rating,
      comment: input.comment,
      is_published: false, // Default to false until moderated
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    productId: data.product_id,
    userId: data.user_id,
    rating: data.rating,
    comment: data.comment,
    isVerifiedPurchase: data.is_verified_purchase,
    isPublished: data.is_published,
    createdAt: data.created_at,
  };
}
