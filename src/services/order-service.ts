/**
 * Order Service — Server-side data fetching for orders.
 */

import { supabaseClient } from "@/lib/supabase";

// ============================================
// TYPES
// ============================================

export interface Order {
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
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface CreateOrderInput {
  items: { productId: string; quantity: number; unitPrice: number }[];
  shippingAddress: Record<string, unknown>;
  paymentMethod: string;
}

// ============================================
// FUNCTIONS
// ============================================

/**
 * Create a new order via Edge Function.
 */
export async function createOrder(input: CreateOrderInput) {
  const { data, error } = await supabaseClient.functions.invoke(
    "create-order",
    {
      body: input,
    }
  );

  if (error) throw error;
  return data;
}

/**
 * Fetch user's orders.
 */
export async function getUserOrders(): Promise<Order[]> {
  const { data, error } = await supabaseClient
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch a single order by ID.
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  const { data, error } = await supabaseClient
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch order items.
 */
export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  const { data, error } = await supabaseClient
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  if (error) throw error;
  return data;
}

/**
 * Track order status.
 */
export async function getTrackingTimeline(orderId: string) {
  const order = await getOrderById(orderId);
  if (!order) return null;

  // Map status to timeline steps
  const steps = [
    { label: "تم الطلب", status: "pending", completed: true },
    {
      label: "قيد التجهيز",
      status: "processing",
      completed:
        order.status === "processing" ||
        order.status === "shipped" ||
        order.status === "delivered",
    },
    {
      label: "تم الشحن",
      status: "shipped",
      completed:
        order.status === "shipped" || order.status === "delivered",
    },
    {
      label: "تم التوصيل",
      status: "delivered",
      completed: order.status === "delivered",
    },
  ];

  return steps;
}

/**
 * Subscribe to order status updates.
 */
export function subscribeToOrderStatus(
  orderId: string,
  callback: (status: string) => void
) {
  return supabaseClient
    .channel(`order-${orderId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "orders",
        filter: `id=eq.${orderId}`,
      },
      (payload) => {
        callback(payload.new.status);
      }
    )
    .subscribe();
}

/**
 * Subscribe to inventory updates for a product.
 */
export function subscribeToInventory(
  productId: string,
  callback: (stock: number) => void
) {
  return supabaseClient
    .channel(`inventory-${productId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "inventory",
        filter: `product_id=eq.${productId}`,
      },
      (payload) => {
        callback(payload.new.available_stock);
      }
    )
    .subscribe();
}
