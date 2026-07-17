import type { CartItem } from "@/domains/cart/cart.types";
import { OrderProduct } from "../order/order.types";
import type { ShippingCalculation } from "./checkout.types";

// ---
// Shipping constants
// Single place to update rules — never hardcoded in UI
// ---
const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_SHIPPING_COST = 15;

/**
 * calculateShipping
 *
 * Determines shipping cost based on subtotal.
 * Rule: orders >= $100 qualify for free shipping.
 *
 * Returns full ShippingCalculation object so UI
 * can display progress toward free shipping threshold.
 */
export function calculateShipping(subtotal: number): ShippingCalculation {
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : STANDARD_SHIPPING_COST;
  const amountUntilFreeShipping = isFreeShipping
    ? 0
    : Number((FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2));

  return {
    shippingCost,
    isFreeShipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountUntilFreeShipping,
  };
}

/**
 * calculateTotal
 *
 * Pure arithmetic — subtotal + shippingCost.
 * Kept as a named function so the rule
 * lives in one place, not scattered across components.
 */
export function calculateTotal(subtotal: number, shippingCost: number): number {
  return Number((subtotal + shippingCost).toFixed(2));
}

/**
 * buildOrderProducts
 *
 * Maps Zustand CartItem[] → backend OrderProduct[].
 * Backend expects "product" (MongoDB ObjectId) and "quantity" only.
 * priceAtPurchase, name, imageUrl are resolved server-side.
 */
export function buildOrderProducts(items: CartItem[]): OrderProduct[] {
  return items.map((item) => ({
    product: item.id,
    quantity: item.quantity,
  }));
}

/**
 * formatShippingCost
 *
 * Display helper — returns "Free" or "$15.00".
 * Keeps formatting logic out of components.
 */
export function formatShippingCost(shippingCost: number): string {
  return shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`;
}
