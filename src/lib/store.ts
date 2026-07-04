import { create } from "zustand";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  size?: string;
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];

  // Drawer Controls
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Cart Actions
  addItem: (product: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (
    id: string,
    size: string | undefined,
    quantity: number,
  ) => void;
  clearCart: () => void;

  // Calculations
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  items: [],

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product) => {
    const { items } = get();
    // Check if item with same ID and Size already exists
    const existingItemIndex = items.findIndex(
      (item) => item.id === product.id && item.size === product.size,
    );

    if (existingItemIndex > -1) {
      // Increment quantity if exists
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      set({ items: updatedItems, isOpen: true });
    } else {
      // Add new item
      set({
        items: [...items, { ...product, quantity: 1 }],
        isOpen: true,
      });
    }
  },

  removeItem: (id, size) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.id === id && item.size === size),
      ),
    }));
  },

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

  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  subtotal: () => {
    return get().items.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + price * item.quantity;
    }, 0);
  },
}));
