/**
 * Catalog Service — Manages Brands and Collections.
 */

import { supabaseClient } from "@/lib/supabase";
import type { Brand, Collection } from "@/types";

/**
 * Fetch all active brands.
 */
export async function getBrands(): Promise<Brand[]> {
  const { data, error } = await supabaseClient
    .from("brands")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    logoUrl: item.logo_url,
    description: item.description,
    isFeatured: item.is_featured,
    createdAt: item.created_at,
  }));
}

/**
 * Fetch featured brands.
 */
export async function getFeaturedBrands(): Promise<Brand[]> {
  const { data, error } = await supabaseClient
    .from("brands")
    .select("*")
    .eq("is_featured", true)
    .limit(10);

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    logoUrl: item.logo_url,
    description: item.description,
    isFeatured: item.is_featured,
    createdAt: item.created_at,
  }));
}

/**
 * Fetch all active collections.
 */
export async function getCollections(): Promise<Collection[]> {
  const { data, error } = await supabaseClient
    .from("collections")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description,
    imageUrl: item.image_url,
    isActive: item.is_active,
    createdAt: item.created_at,
  }));
}

/**
 * Fetch a single collection by slug.
 */
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const { data, error } = await supabaseClient
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    imageUrl: data.image_url,
    isActive: data.is_active,
    createdAt: data.created_at,
  };
}
