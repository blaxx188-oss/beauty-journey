/**
 * Supabase Client Configuration
 * Supports both client-side and server-side instances.
 */

import { createClient } from "@supabase/supabase-js";

// ============================================
// CLIENT-SIDE INSTANCE
// ============================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// SERVER-SIDE INSTANCE (with service role key)
// ============================================

export function createServerSupabaseClient() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ============================================
// TYPES
// ============================================

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone_number: string | null;
          default_address_id: string | null;
          loyalty_tier: "silver" | "gold" | "platinum" | null;
          loyalty_points: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      skin_profiles: {
        Row: {
          id: string;
          user_id: string;
          skin_type: "dry" | "oily" | "combination" | null;
          primary_concerns: string[] | null;
          allergies: string[] | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["skin_profiles"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["skin_profiles"]["Insert"]>;
      };
      hair_profiles: {
        Row: {
          id: string;
          user_id: string;
          hair_type: "straight" | "wavy" | "curly" | null;
          hair_texture: string | null;
          concerns: string[] | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["hair_profiles"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["hair_profiles"]["Insert"]>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          parent_id: string | null;
          image_url: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["categories"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      products: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          subtotal: number;
          tax: number;
          shipping_cost: number;
          total: number;
          payment_method: string | null;
          payment_status: string;
          shipping_address: Record<string, unknown>;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      inventory: {
        Row: {
          id: string;
          product_id: string;
          total_stock: number;
          available_stock: number;
          reserved_stock: number;
        };
        Insert: Omit<Database["public"]["Tables"]["inventory"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["inventory"]["Insert"]>;
      };
      brands: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          description: string | null;
          is_featured: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["brands"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["brands"]["Insert"]>;
      };
      collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["collections"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["collections"]["Insert"]>;
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          phone_number: string;
          governorate: string;
          city: string;
          area: string;
          street: string;
          building_number: string | null;
          floor: string | null;
          apartment: string | null;
          landmark: string | null;
          is_default: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["addresses"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["addresses"]["Insert"]>;
      };
      wishlist: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["wishlist"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["wishlist"]["Insert"]>;
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          comment: string | null;
          is_verified_purchase: boolean;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["reviews"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          discount_type: "percentage" | "fixed_amount";
          discount_value: number;
          min_purchase_amount: number | null;
          max_discount_amount: number | null;
          starts_at: string | null;
          expires_at: string | null;
          usage_limit: number | null;
          usage_count: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["coupons"]["Row"], "id" | "created_at" | "usage_count">;
        Update: Partial<Database["public"]["Tables"]["coupons"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: "order" | "promo" | "system";
          is_read: boolean;
          link: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["notifications"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
      cms_pages: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          meta_title: string | null;
          meta_description: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["cms_pages"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["cms_pages"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
    };
  };
};
