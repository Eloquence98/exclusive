import type { ShopParams } from "@/hooks/useShopParams";
import type {
  ApiResponse,
  ApiStatsResponse,
  CatalogStats,
  Product,
  ProductListItem,
  ProductListResponse,
} from "../types/product.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Fetches featured products
 * GET /api/v1/products/featured
 */
export async function getFeaturedProducts(): Promise<ProductListItem[]> {
  const res = await fetch(`${API_BASE_URL}/products/featured`);

  if (!res.ok) {
    throw new Error(`Failed to fetch featured products: ${res.statusText}`);
  }

  const json: ApiResponse<ProductListItem[]> = await res.json();
  return json.data.data;
}

/**
 * Fetches trending products
 * GET /api/v1/products/trending
 */
export async function getTrendingProducts(): Promise<ProductListItem[]> {
  const res = await fetch(`${API_BASE_URL}/products/trending`);

  if (!res.ok) {
    throw new Error(`Failed to fetch trending products: ${res.statusText}`);
  }

  const json: ApiResponse<ProductListItem[]> = await res.json();
  return json.data.data;
}

/**
 * Fetches top rated products
 * GET /api/v1/products/top-rated
 */
export async function getTopRatedProducts(): Promise<ProductListItem[]> {
  const res = await fetch(`${API_BASE_URL}/products/top-rated`);

  if (!res.ok) {
    throw new Error(`Failed to fetch top rated products: ${res.statusText}`);
  }

  const json: ApiResponse<ProductListItem[]> = await res.json();
  return json.data.data;
}

/**
 * Fetches a single product by slug
 * GET /api/v1/products/:slug
 * Returns null if not found (404)
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/products/${slug}`);

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.statusText}`);
  }

  const json: ApiResponse<Product> = await res.json();
  return json.data.data;
}

/**
 * Fetches a single product by ID
 * GET /api/v1/products/:id
 * Returns null if not found (404)
 */
export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.statusText}`);
  }

  const json: ApiResponse<Product> = await res.json();
  return json.data.data;
}

/**
 * Fetches catalog stats
 * GET /api/v1/products/stats
 * Returns price range, categories, brands, sizes
 * Used to power filter sidebar dynamically
 */
export async function getCatalogStats(): Promise<CatalogStats> {
  const res = await fetch(`${API_BASE_URL}/products/stats`);

  if (!res.ok) {
    throw new Error(`Failed to fetch catalog stats: ${res.statusText}`);
  }

  const json: ApiStatsResponse = await res.json();
  return json.data;
}

/**
 * Fetches paginated and filtered product list
 * GET /api/v1/products?...
 * Accepts typed ShopParams — translates to backend query format
 *
 * Frontend → Backend param translation:
 * sort=price-asc        → sort=price
 * sort=price-desc       → sort=-price
 * sort=newest           → sort=-createdAt
 * sort=top-rated        → sort=-ratingsAverage
 * sort=featured         → isFeatured=true&sort=-createdAt
 * minPrice=50           → price[gte]=50
 * maxPrice=200          → price[lte]=200
 * rating=4              → ratingsAverage[gte]=4
 * category=shoes        → category=shoes
 * brand=Classic Fit     → brand=Classic Fit
 */
export async function getProductList(
  shopParams: ShopParams,
): Promise<ProductListResponse> {
  const params = new URLSearchParams();

  // Pagination
  params.set("page", String(shopParams.page));
  params.set("limit", String(shopParams.limit));

  // Sorting — translate frontend values to backend format
  switch (shopParams.sort) {
    case "price-asc":
      params.set("sort", "price");
      break;
    case "price-desc":
      params.set("sort", "-price");
      break;
    case "newest":
      params.set("sort", "-createdAt");
      break;
    case "top-rated":
      params.set("sort", "-ratingsAverage");
      break;
    case "featured":
      params.set("isFeatured", "true");
      params.set("sort", "-createdAt");
      break;
    default:
      params.set("sort", "-createdAt");
  }

  // Category filter — passed directly to backend
  if (shopParams.category) {
    params.set("category", shopParams.category);
  }

  // Brand filter — backend APIFeatures.filter() handles directly
  if (shopParams.brand) {
    params.set("brand", shopParams.brand);
  }

  // Price range → backend advanced filter format
  if (shopParams?.minPrice !== undefined) {
    params.set("price[gte]", String(shopParams.minPrice));
  }
  if (shopParams.maxPrice !== undefined) {
    params.set("price[lte]", String(shopParams.maxPrice));
  }

  // Rating filter → backend advanced filter format
  if (shopParams.rating !== undefined) {
    params.set("ratingsAverage[gte]", String(shopParams.rating));
  }

  const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const json: ApiResponse<ProductListItem[]> = await res.json();

  return {
    products: json.data.data,
    pagination: json.meta!.pagination,
  };
}
