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

export interface CartState {
  items: CartItem[];

  // Cart Actions
  addItem: (product: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (
    id: string,
    size: string | undefined,
    quantity: number,
  ) => void;
  clearCart: () => void;
}
