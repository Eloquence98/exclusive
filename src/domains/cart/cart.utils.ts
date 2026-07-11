import { CartItem } from "./cart.types";

/**
 * Calculate total number of items in cart
 * Accounts for quantity of each item
 */
export function calculateTotalItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Calculate cart subtotal
 * Uses salePrice if available, otherwise regular price
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = item.salePrice ?? item.price;
    return total + price * item.quantity;
  }, 0);
}

/**
 * Check if a specific item exists in cart
 * Matches by id AND size (same product different size = different item)
 */
export function findCartItem(
  items: CartItem[],
  id: string,
  size?: string,
): CartItem | undefined {
  return items.find((item) => item.id === id && item.size === size);
}

/**
 * Check if a specific item exists in cart by index
 * Used for quantity increment logic
 */
export function findCartItemIndex(
  items: CartItem[],
  id: string,
  size?: string,
): number {
  return items.findIndex((item) => item.id === id && item.size === size);
}
