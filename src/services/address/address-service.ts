/**
 * Address Service — Manages shipping addresses.
 * Handles saved addresses, validation, and default address management.
 */

import { supabaseClient } from "@/lib/supabase";
import type { ShippingAddress, SavedAddress } from "@/types";

// ============================================
// TYPES
// ============================================

export interface CreateAddressInput {
  address: ShippingAddress;
  label: string;
  isDefault: boolean;
}

export interface UpdateAddressInput {
  id: string;
  address: Partial<ShippingAddress>;
  label?: string;
  isDefault?: boolean;
}

// ============================================
// FUNCTIONS
// ============================================

/**
 * Fetch all saved addresses for the current user.
 */
export async function getSavedAddresses(): Promise<SavedAddress[]> {
  const { data, error } = await supabaseClient
    .from("addresses")
    .select("*")
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    address: {
      fullName: item.full_name,
      phoneNumber: item.phone_number,
      governorate: item.governorate,
      city: item.city,
      area: item.area,
      street: item.street,
      buildingNumber: item.building_number,
      floor: item.floor,
      apartment: item.apartment,
      landmark: item.landmark,
    },
    label: item.label,
    isDefault: item.is_default,
  }));
}

/**
 * Save a new address.
 */
export async function saveAddress(input: CreateAddressInput): Promise<SavedAddress> {
  const { data, error } = await supabaseClient
    .from("addresses")
    .insert({
      full_name: input.address.fullName,
      phone_number: input.address.phoneNumber,
      governorate: input.address.governorate,
      city: input.address.city,
      area: input.address.area,
      street: input.address.street,
      building_number: input.address.buildingNumber,
      floor: input.address.floor,
      apartment: input.address.apartment,
      landmark: input.address.landmark,
      label: input.label,
      is_default: input.isDefault,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    address: {
      fullName: data.full_name,
      phoneNumber: data.phone_number,
      governorate: data.governorate,
      city: data.city,
      area: data.area,
      street: data.street,
      buildingNumber: data.building_number,
      floor: data.floor,
      apartment: data.apartment,
      landmark: data.landmark,
    },
    label: data.label,
    isDefault: data.is_default,
  };
}

/**
 * Update an existing address.
 */
export async function updateAddress(input: UpdateAddressInput): Promise<SavedAddress> {
  const updateData: Record<string, unknown> = {};

  if (input.address) {
    if (input.address.fullName) updateData.full_name = input.address.fullName;
    if (input.address.phoneNumber) updateData.phone_number = input.address.phoneNumber;
    if (input.address.governorate) updateData.governorate = input.address.governorate;
    if (input.address.city) updateData.city = input.address.city;
    if (input.address.area) updateData.area = input.address.area;
    if (input.address.street) updateData.street = input.address.street;
    if (input.address.buildingNumber !== undefined) updateData.building_number = input.address.buildingNumber;
    if (input.address.floor !== undefined) updateData.floor = input.address.floor;
    if (input.address.apartment !== undefined) updateData.apartment = input.address.apartment;
    if (input.address.landmark !== undefined) updateData.landmark = input.address.landmark;
  }

  if (input.label !== undefined) updateData.label = input.label;
  if (input.isDefault !== undefined) updateData.is_default = input.isDefault;

  const { data, error } = await supabaseClient
    .from("addresses")
    .update(updateData)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    address: {
      fullName: data.full_name,
      phoneNumber: data.phone_number,
      governorate: data.governorate,
      city: data.city,
      area: data.area,
      street: data.street,
      buildingNumber: data.building_number,
      floor: data.floor,
      apartment: data.apartment,
      landmark: data.landmark,
    },
    label: data.label,
    isDefault: data.is_default,
  };
}

/**
 * Delete an address.
 */
export async function deleteAddress(id: string): Promise<void> {
  const { error } = await supabaseClient
    .from("addresses")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/**
 * Set an address as the default.
 */
export async function setDefaultAddress(id: string): Promise<void> {
  // First, unset all other defaults
  await supabaseClient
    .from("addresses")
    .update({ is_default: false })
    .eq("is_default", true);

  // Then set the new default
  const { error } = await supabaseClient
    .from("addresses")
    .update({ is_default: true })
    .eq("id", id);

  if (error) throw error;
}

/**
 * Get the default address.
 */
export async function getDefaultAddress(): Promise<SavedAddress | null> {
  const { data, error } = await supabaseClient
    .from("addresses")
    .select("*")
    .eq("is_default", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // No default found
    throw error;
  }

  return {
    id: data.id,
    address: {
      fullName: data.full_name,
      phoneNumber: data.phone_number,
      governorate: data.governorate,
      city: data.city,
      area: data.area,
      street: data.street,
      buildingNumber: data.building_number,
      floor: data.floor,
      apartment: data.apartment,
      landmark: data.landmark,
    },
    label: data.label,
    isDefault: data.is_default,
  };
}

/**
 * Format address as a readable string.
 */
export function formatAddress(address: ShippingAddress): string {
  const parts = [
    address.street,
    address.buildingNumber && `مبنى ${address.buildingNumber}`,
    address.floor && `دور ${address.floor}`,
    address.apartment && `شقة ${address.apartment}`,
    address.landmark && `بجوار ${address.landmark}`,
    address.area,
    address.city,
    address.governorate,
  ].filter(Boolean);

  return parts.join("، ");
}
