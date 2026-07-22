export interface WishlistItem {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
}

export interface WishlistState {
  items: WishlistItem[];
  addItem: (product: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (product: WishlistItem) => void;
  clearWishlist: () => void;

  // Computed
  totalItems: () => number;
  isInWishlist: (id: string) => boolean;
}
