/**
 * Product API Layer
 * Raw backend communication only — no business logic
 */

import type { ApiResponse, Product } from "../types/product.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Fetches featured products from /api/products/featured
 * Backend returns: { status: "success", data: { data: Product[] } }
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products/featured`, {
    // Next.js 15 fetch cache options
    next: { revalidate: 300 }, // 5 minutes
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch featured products: ${res.statusText}`);
  }

  const json: ApiResponse<Product[]> = await res.json();
  return json.data.data; // Unwrap double-nested structure
}

/**
 * Fetches trending products from /api/products/trending
 */
export async function getTrendingProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products/trending`, {
    next: { revalidate: 300 },
  });

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
  const res = await fetch(`${API_BASE_URL}/products/top-rated`, {
    next: { revalidate: 300 },
  });

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
  const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
    next: { revalidate: 600 }, // 10 minutes for product details
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.statusText}`);
  }

  const json: ApiResponse<Product> = await res.json();
  return json.data.data;
}
