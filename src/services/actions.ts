"use server";

/**
 * Server Actions — Next.js 15 mutations for backend operations.
 */

import { revalidatePath } from "next/cache";
import * as wishlistService from "./wishlist-service";
import * as reviewService from "./review-service";
import * as addressService from "./address/address-service";
import * as notificationService from "./notification-service";

// ============================================
// WISHLIST ACTIONS
// ============================================

export async function toggleWishlistAction(productId: string, isInWishlist: boolean) {
  try {
    if (isInWishlist) {
      await wishlistService.removeFromWishlist(productId);
    } else {
      await wishlistService.addToWishlist(productId);
    }
    revalidatePath("/wishlist");
    revalidatePath(`/product/${productId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ============================================
// REVIEW ACTIONS
// ============================================

export async function submitReviewAction(input: {
  productId: string;
  rating: number;
  comment: string;
}) {
  try {
    await reviewService.submitReview(input);
    revalidatePath(`/product/${input.productId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ============================================
// ADDRESS ACTIONS
// ============================================

export async function saveAddressAction(input: any) {
  try {
    await addressService.saveAddress(input);
    revalidatePath("/account/addresses");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteAddressAction(id: string) {
  try {
    await addressService.deleteAddress(id);
    revalidatePath("/account/addresses");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function setDefaultAddressAction(id: string) {
  try {
    await addressService.setDefaultAddress(id);
    revalidatePath("/account/addresses");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ============================================
// NOTIFICATION ACTIONS
// ============================================

export async function markNotificationReadAction(id: string) {
  try {
    await notificationService.markAsRead(id);
    revalidatePath("/notifications");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
