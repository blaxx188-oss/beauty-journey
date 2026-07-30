import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/stores/cart-store";

describe("Cart Store Integration", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("should add items to the cart", () => {
    const product = {
      id: "1",
      productId: "1",
      title: "Test Product",
      slug: "test-product",
      price: 100,
      currency: "EGP",
      imageUrl: "/test.jpg",
      maxQuantity: 10,
    };

    useCartStore.getState().addItem(product);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].productId).toBe("1");
    expect(state.items[0].quantity).toBe(1);
  });

  it("should increase quantity when adding existing item", () => {
    const product = {
      id: "1",
      productId: "1",
      title: "Test Product",
      slug: "test-product",
      price: 100,
      currency: "EGP",
      imageUrl: "/test.jpg",
      maxQuantity: 10,
    };

    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("should calculate totals correctly", () => {
    useCartStore.getState().addItem({
      id: "1",
      productId: "1",
      title: "Item 1",
      slug: "item-1",
      price: 100,
      currency: "EGP",
      imageUrl: "/1.jpg",
      maxQuantity: 10,
    });
    
    useCartStore.getState().addItem({
      id: "2",
      productId: "2",
      title: "Item 2",
      slug: "item-2",
      price: 200,
      currency: "EGP",
      imageUrl: "/2.jpg",
      maxQuantity: 10,
    });

    const subtotal = useCartStore.getState().getSubtotal();
    expect(subtotal).toBe(300);
  });

  it("should apply percentage coupon correctly", () => {
    useCartStore.getState().addItem({
      id: "1",
      productId: "1",
      title: "Item 1",
      slug: "item-1",
      price: 1000,
      currency: "EGP",
      imageUrl: "/1.jpg",
      maxQuantity: 10,
    });

    useCartStore.getState().applyCoupon("SAVE10", 10, "percentage");
    
    const discount = useCartStore.getState().getDiscountAmount();
    const total = useCartStore.getState().getTotal();
    
    expect(discount).toBe(100);
    expect(total).toBe(900);
  });
});
