/**
 * CMS Service — Manages static pages and content.
 */

import { supabaseClient } from "@/lib/supabase";
import type { CMSPage } from "@/types";

/**
 * Fetch a CMS page by its slug.
 */
export async function getPageBySlug(slug: string): Promise<CMSPage | null> {
  const { data, error } = await supabaseClient
    .from("cms_pages")
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
    title: data.title,
    slug: data.slug,
    content: data.content,
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Fetch all active CMS pages.
 */
export async function getActivePages(): Promise<CMSPage[]> {
  const { data, error } = await supabaseClient
    .from("cms_pages")
    .select("*")
    .eq("is_active", true)
    .order("title", { ascending: true });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    content: item.content,
    metaTitle: item.meta_title,
    metaDescription: item.meta_description,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
}
