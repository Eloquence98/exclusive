import type {
  ApiProductListResponse,
  ApiResponse,
  Product,
  ProductListResponse,
} from "../types/product.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Fetches featured products from /api/products/featured
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products/featured`);

  if (!res.ok) {
    throw new Error(`Failed to fetch featured products: ${res.statusText}`);
  }

  const json: ApiResponse<Product[]> = await res.json();
  return json.data.data;
}

/**
 * Fetches trending products from /api/products/trending
 */
export async function getTrendingProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products/trending`);

  if (!res.ok) {
    throw new Error(`Failed to fetch trending products: ${res.statusText}`);
  }

  const json: ApiResponse<Product[]> = await res.json();
  return json.data.data;
}

/**
 * Fetches top-rated products from /api/products/top-rated
 */
export async function getTopRatedProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products/top-rated`);

  if (!res.ok) {
    throw new Error(`Failed to fetch top-rated products: ${res.statusText}`);
  }

  const json: ApiResponse<Product[]> = await res.json();
  return json.data.data;
}

/**
 * Fetches a single product by slug
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
 * Fetches paginated and filtered product list
 * Transforms frontend searchParams → backend query format
 *
 * Frontend → Backend param translation:
 * - sort=price-asc        → sort=price
 * - sort=price-desc       → sort=-price
 * - sort=newest           → sort=-createdAt
 * - sort=top-rated        → sort=-ratingsAverage
 * - sort=featured         → isFeatured=true&sort=-ratingsAverage
 * - minPrice=50           → price[gte]=50
 * - maxPrice=200          → price[lte]=200
 * - rating=4              → ratingsAverage[gte]=4
 * - category=shoes        → category=shoes
 */
export async function getProductList(
  searchParams: Record<string, string | string[] | undefined>,
): Promise<ProductListResponse> {
  const params = new URLSearchParams();

  // Pagination
  const page = searchParams.page?.toString() || "1";
  const limit = searchParams.limit?.toString() || "9";
  params.set("page", page);
  params.set("limit", limit);

  // Sorting
  const sort = searchParams.sort?.toString() || "featured";
  switch (sort) {
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
      params.set("sort", "-ratingsAverage");
      break;
    default:
      params.set("sort", "-createdAt");
  }

  // Category filter
  if (searchParams.category) {
    params.set("category", searchParams.category.toString());
  }

  // Price range filters → backend advanced filter format
  if (searchParams.minPrice) {
    params.set("price[gte]", searchParams.minPrice.toString());
  }
  if (searchParams.maxPrice) {
    params.set("price[lte]", searchParams.maxPrice.toString());
  }

  // Rating filter → backend advanced filter format
  if (searchParams.rating) {
    params.set("ratingsAverage[gte]", searchParams.rating.toString());
  }

  // Search
  if (searchParams.search) {
    // TODO: Confirm backend search param name when search is implemented
    params.set("search", searchParams.search.toString());
  }

  const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product list: ${res.statusText}`);
  }

  const json: ApiProductListResponse = await res.json();

  return {
    products: json.data.data,
    pagination: json.meta.pagination,
  };
}
