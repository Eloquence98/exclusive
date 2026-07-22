import type { WishlistItem } from "./wishlist.types";

/**
 * Calculate total number of items in wishlist
 */
export function calculateTotalItems(items: WishlistItem[]): number {
  return items.length;
}

/**
 * Check if a specific item exists in wishlist by id
 */
export function findWishlistItem(
  items: WishlistItem[],
  id: string,
): WishlistItem | undefined {
  return items.find((item) => item.id === id);
}

/**
 * Find index of a specific item in wishlist by id
 * Used for toggle logic
 */
export function findWishlistItemIndex(
  items: WishlistItem[],
  id: string,
): number {
  return items.findIndex((item) => item.id === id);
}
