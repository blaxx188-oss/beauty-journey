/**
 * Analytics Utility — Architecture for GA4 and Meta Pixel.
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// ============================================
// PAGE VIEWS
// ============================================

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "PageView");
  }
};

// ============================================
// GENERIC EVENTS
// ============================================

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// ============================================
// ECOMMERCE EVENTS
// ============================================

export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  currency: string;
  category?: string;
}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "add_to_cart", {
      currency: product.currency,
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      }],
    });
  }
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "AddToCart", {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: product.currency,
    });
  }
};
