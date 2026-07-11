/**
 * Product domain types
 * Matches backend Mongoose schema + virtuals
 * Backend returns: id (not _id) — Mongoose virtual
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
 * Product list item
 * Returned by list endpoints (featured, trending, top-rated, shop)
 * Backend aliasDefaultFields ensures these fields are always present
 */
export interface ProductListItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  discount: number;
  stock: number;
  imageCover: string;
  category: ProductCategory;
  isFeatured: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand?: string;

  // Virtuals
  currentPrice: number;
  discountPercentage: number;
  saleStatus: SaleStatus;
}

/**
 * Full product
 * Returned by getProductBySlug and getProductById
 * Includes all fields for PDP
 */
export interface Product extends ProductListItem {
  description: string;
  images: string[];
  size?: ProductSize; // TODO: Backend needs variants system
  brand?: string;
  tags: string[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Backend API response wrapper
 * Standard shape: { status, data: { data: T } }
 */
export interface ApiResponse<T> {
  status: "success" | "fail" | "error";
  results?: number;
  meta?: {
    pagination: PaginationMeta;
  };
  data: {
    data: T;
  };
}

/**
 * Pagination metadata
 * Returned in meta.pagination for all list endpoints
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
 * Frontend product list response
 * After unwrapping backend structure
 */
export interface ProductListResponse {
  products: ProductListItem[];
  pagination: PaginationMeta;
}

/**
 * Catalog stats
 * Returned by GET /api/v1/products/stats
 * Used to populate filter sidebar dynamically
 */
export interface CategoryStat {
  name: ProductCategory;
  count: number;
}

export interface BrandStat {
  name: string;
  count: number;
}

export interface SizeStat {
  name: ProductSize;
  count: number;
}

export interface CatalogStats {
  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
  totalProducts: number;
  categories: CategoryStat[];
  brands: BrandStat[];
  sizes: SizeStat[];
}

/**
 * Stats API response wrapper
 */
export interface ApiStatsResponse {
  status: "success" | "fail" | "error";
  data: CatalogStats;
}
