/**
 * Notification Service — Manages user notifications.
 */

import { supabaseClient } from "@/lib/supabase";
import type { Notification } from "@/types";

/**
 * Fetch notifications for the current user.
 */
export async function getNotifications(): Promise<Notification[]> {
  const { data, error } = await supabaseClient
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    userId: item.user_id,
    title: item.title,
    message: item.message,
    type: item.type,
    isRead: item.is_read,
    link: item.link,
    createdAt: item.created_at,
  }));
}

/**
 * Mark a notification as read.
 */
export async function markAsRead(id: string): Promise<void> {
  const { error } = await supabaseClient
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id);

  if (error) throw error;
}

/**
 * Mark all notifications as read.
 */
export async function markAllAsRead(): Promise<void> {
  const { error } = await supabaseClient
    .from("notifications")
    .update({ is_read: true })
    .eq("is_read", false);

  if (error) throw error;
}

/**
 * Subscribe to realtime notifications.
 */
export function subscribeToNotifications(callback: (notification: Notification) => void) {
  return supabaseClient
    .channel("notifications")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
      },
      (payload) => {
        const item = payload.new as any;
        callback({
          id: item.id,
          userId: item.user_id,
          title: item.title,
          message: item.message,
          type: item.type,
          isRead: item.is_read,
          link: item.link,
          createdAt: item.created_at,
        });
      }
    )
    .subscribe();
}
