/**
 * Beauty Journey — TypeScript Type Definitions
 * Central type definitions for the entire application.
 */

// ============================================
// USER & AUTH
// ============================================

export type LoyaltyTier = "silver" | "gold" | "platinum";

export interface UserProfile {
  id: string;
  fullName: string;
  phoneNumber: string | null;
  defaultAddressId: string | null;
  loyaltyTier: LoyaltyTier | null;
  loyaltyPoints: number;
  createdAt: string;
}

export interface SkinProfile {
  id: string;
  userId: string;
  skinType: "dry" | "oily" | "combination" | "normal" | "sensitive";
  primaryConcerns: string[];
  allergies: string[];
}

export interface HairProfile {
  id: string;
  userId: string;
  hairType: "straight" | "wavy" | "curly" | "coily";
  hairTexture: string | null;
  concerns: string[];
}

// ============================================
// PRODUCTS & CATALOG
// ============================================

export interface Product {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  brandName: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface ProductMedia {
  id: string;
  productId: string;
  type: "image" | "video";
  url: string;
  isHero: boolean;
  orderIndex: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  imageUrl: string | null;
  description: string | null;
}

export interface Ingredient {
  id: string;
  name: string;
  benefits: string[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string | null;
  isFeatured: boolean;
  createdAt: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

// ============================================
// ORDERS & INVENTORY
// ============================================

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "pending_cod";

export type PaymentMethod = "card" | "fawry" | "cod";

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  paymentMethod: PaymentMethod | null;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  governorate: string;
  city: string;
  area: string;
  street: string;
  buildingNumber?: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  totalStock: number;
  availableStock: number;
  reservedStock: number;
}

// ============================================
// BEAUTY QUIZ & ROUTINES
// ============================================

export interface BeautyQuiz {
  id: string;
  userId: string;
  currentStep: number;
  completed: boolean;
  createdAt: string;
}

export interface QuizAnswer {
  id: string;
  quizId: string;
  questionKey: string;
  answerValue: string;
}

export interface Recommendation {
  id: string;
  quizId: string;
  productId: string;
  score: number;
  createdAt: string;
}

export interface Routine {
  id: string;
  userId: string;
  name: string;
  routineType: "AM" | "PM";
}

export interface RoutineItem {
  id: string;
  routineId: string;
  productId: string;
  stepOrder: number;
}

// ============================================
// REVIEWS
// ============================================

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  isVerifiedPurchase: boolean;
  isPublished: boolean;
  createdAt: string;
  user?: {
    fullName: string;
  };
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product?: Product;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed_amount";
  discountValue: number;
  minPurchaseAmount: number | null;
  maxDiscountAmount: number | null;
  startsAt: string | null;
  expiresAt: string | null;
  usageLimit: number | null;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "order" | "promo" | "system";
  isRead: boolean;
  link: string | null;
  createdAt: string;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// ANALYTICS
// ============================================

export type EventType =
  | "view_product"
  | "add_to_cart"
  | "checkout"
  | "complete_purchase"
  | "view_category"
  | "search"
  | "complete_quiz";

export interface AnalyticsEvent {
  id: string;
  userId: string | null;
  eventType: EventType;
  payload: Record<string, unknown>;
  createdAt: string;
}

// ============================================
// APP STATE
// ============================================

export type AppLocale = "ar" | "en";
export type AppCurrency = "EGP";

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  currency: string;
  quantity: number;
  maxQuantity: number;
  variant?: string;
}

// ============================================
// CHECKOUT TYPES (Phase 9)
// ============================================

export * from "./checkout";
