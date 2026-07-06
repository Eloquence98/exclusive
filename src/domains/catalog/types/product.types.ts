/**
 * Product domain types
 * Matches backend Mongoose schema + virtuals
 */

export type ProductCategory =
  | "t-shirts"
  | "shirts"
  | "polos"
  | "jeans"
  | "shorts"
  | "trousers"
  | "activewear"
  | "fragrances"
  | "shoes"
  | "underwear";

export type ProductSize =
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "XXXL"
  | "4XL"
  | "5XL"
  | "6XL";

export type SaleStatus =
  | "NOT_ON_SALE"
  | "NO_DATES"
  | "SCHEDULED"
  | "ACTIVE"
  | "ENDED";

/**
 * Product model from backend
 * Includes Mongoose fields + virtuals (toJSON: { virtuals: true })
 */
export interface Product {
  _id: string; // imported on backend replace this with id in toJson function model
  title: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  discount: number;
  stock: number;
  imageCover: string;
  images: string[];
  category: ProductCategory;
  size?: ProductSize; // TODO: Backend needs variants system for multi-size products
  brand?: string;
  tags: string[];
  isFeatured: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;

  // Virtuals (computed by backend)
  currentPrice: number;
  discountPercentage: number;
  saleStatus: SaleStatus;
}

/**
 * Backend API response wrapper
 * All endpoints return { status, data: { data: T } }
 */
export interface ApiResponse<T> {
  status: "success" | "fail" | "error";
  results?: number;
  data: {
    data: T;
  };
}

/**
 * Paginated products response (future use for /shop)
 */
export interface ProductsListResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}
