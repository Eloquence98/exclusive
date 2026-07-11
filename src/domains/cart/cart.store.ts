import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "./cart.types";
import {
  calculateSubtotal,
  calculateTotalItems,
  findCartItemIndex,
} from "./cart.utils";

interface CartStoreState extends CartState {
  // Computed values as functions
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart
      // If item with same ID and size exists, increment quantity
      // Otherwise add new item with quantity = 1
      addItem: (product) => {
        const { items } = get();
        const existingIndex = findCartItemIndex(
          items,
          product.id,
          product.size,
        );

        if (existingIndex > -1) {
          // Increment existing item quantity
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += 1;
          set({ items: updatedItems });
        } else {
          // Add new item
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      // Remove item from cart by id and size
      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.size === size),
          ),
        }));
      },

      // Update item quantity
      // If quantity < 1, remove the item
      updateQuantity: (id, size, quantity) => {
        if (quantity < 1) {
          get().removeItem(id, size);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      // Computed values
      totalItems: () => calculateTotalItems(get().items),
      subtotal: () => calculateSubtotal(get().items),
    }),
    {
      name: "atelier-cart", // localStorage key
    },
  ),
);
