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
 * Pagination metadata from backend
 * Returned in meta.pagination for list endpoints
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  totalDocuments: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Backend response for paginated product lists
 * GET /api/products returns this shape
 */
export interface ApiProductListResponse {
  status: "success" | "fail" | "error";
  results: number;
  meta: {
    pagination: PaginationMeta;
  };
  data: {
    data: Product[];
  };
}

/**
 * Frontend-friendly product list response
 * After unwrapping backend structure
 */
export interface ProductListResponse {
  products: Product[];
  pagination: PaginationMeta;
}
