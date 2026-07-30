/**
 * Storage Service — Manages file uploads to Supabase Storage.
 * Handles product images, user avatars, and CMS media.
 */

import { supabaseClient } from "@/lib/supabase";

/**
 * Upload a file to a specific bucket.
 */
export async function uploadFile(
  bucket: "product-images" | "avatars" | "cms-media",
  path: string,
  file: File | Blob
): Promise<string> {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
      cacheControl: "3600",
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Upload a user avatar.
 */
export async function uploadAvatar(userId: string, file: File | Blob): Promise<string> {
  const extension = file instanceof File ? file.name.split(".").pop() : "jpg";
  const path = `${userId}/avatar.${extension}`;
  return uploadFile("avatars", path, file);
}

/**
 * Delete a file from a bucket.
 */
export async function deleteFile(
  bucket: "product-images" | "avatars" | "cms-media",
  path: string
): Promise<void> {
  const { error } = await supabaseClient.storage.from(bucket).remove([path]);
  if (error) throw error;
}
