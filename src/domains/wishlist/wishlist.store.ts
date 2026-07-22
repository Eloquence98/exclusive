import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishlistState } from "./wishlist.types";
import {
  calculateTotalItems,
  findWishlistItem,
  findWishlistItemIndex,
} from "./wishlist.utils";

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        const exists = findWishlistItem(items, product.id);

        if (!exists) {
          set({ items: [...items, product] });
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      toggleItem: (product) => {
        const { items } = get();
        const existingIndex = findWishlistItemIndex(items, product.id);

        if (existingIndex > -1) {
          set({
            items: items.filter((item) => item.id !== product.id),
          });
        } else {
          set({ items: [...items, product] });
        }
      },

      clearWishlist: () => set({ items: [] }),

      // Computed values
      totalItems: () => calculateTotalItems(get().items),
      isInWishlist: (id) => !!findWishlistItem(get().items, id),
    }),
    {
      name: "atelier-wishlist", // localStorage key
    },
  ),
);
