/**
 * Product Queries (TanStack Query layer)
 * Defines all catalog domain queries using queryOptions pattern
 * TanStack Query is the only server state manager
 */

import type { ShopParams } from "@/hooks/useShopParams";
import { queryOptions } from "@tanstack/react-query";
import * as productsApi from "../api/products.api";

/**
 * Query key factory for catalog domain
 * Hierarchical structure enables targeted invalidation
 *
 * Key hierarchy:
 * ['catalog']
 *   ['catalog', 'products']
 *     ['catalog', 'products', 'featured']
 *     ['catalog', 'products', 'trending']
 *     ['catalog', 'products', 'top-rated']
 *     ['catalog', 'products', 'list', { ...ShopParams }]
 *     ['catalog', 'products', 'detail', slug]
 *   ['catalog', 'stats']
 */
export const catalogKeys = {
  all: ["catalog"] as const,

  // Products
  products: () => [...catalogKeys.all, "products"] as const,
  featured: () => [...catalogKeys.products(), "featured"] as const,
  trending: () => [...catalogKeys.products(), "trending"] as const,
  topRated: () => [...catalogKeys.products(), "top-rated"] as const,
  list: (params: ShopParams) =>
    [...catalogKeys.products(), "list", params] as const,
  detail: (slug: string) =>
    [...catalogKeys.products(), "detail", slug] as const,

  // Stats
  stats: () => [...catalogKeys.all, "stats"] as const,
};

/**
 * Featured products query
 * Used on homepage — 8 products sorted by createdAt
 */
export const featuredProductsOptions = queryOptions({
  queryKey: catalogKeys.featured(),
  queryFn: productsApi.getFeaturedProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

/**
 * Trending products query
 * Used on homepage — 5 products sorted by ratingsQuantity
 */
export const trendingProductsOptions = queryOptions({
  queryKey: catalogKeys.trending(),
  queryFn: productsApi.getTrendingProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

/**
 * Top rated products query
 * Used on homepage — 5 products sorted by ratingsAverage
 */
export const topRatedProductsOptions = queryOptions({
  queryKey: catalogKeys.topRated(),
  queryFn: productsApi.getTopRatedProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

/**
 * Product list query factory
 * Used on shop page
 * Each unique ShopParams object = unique cache entry
 *
 * Cache behavior:
 * { page: 1, sort: 'featured' }              → unique cache entry
 * { page: 2, sort: 'featured' }              → different cache entry
 * { page: 1, category: 'shoes' }             → different cache entry
 * Same params after back navigation           → instant cache hit
 *
 * placeholderData: keeps previous page visible
 * while new page loads — no flash between pages
 */
export const productListOptions = (params: ShopParams) =>
  queryOptions({
    queryKey: catalogKeys.list(params),
    queryFn: () => productsApi.getProductList(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    placeholderData: (prev) => prev, // critical — no flash on page/filter change
  });

/**
 * Catalog stats query
 * Used to power filter sidebar dynamically
 * Price range, categories, brands — all from backend
 * Long staleTime — stats change infrequently
 */
export const catalogStatsOptions = queryOptions({
  queryKey: catalogKeys.stats(),
  queryFn: productsApi.getCatalogStats,
  staleTime: 10 * 60 * 1000, // 10 minutes
});

/**
 * Product detail query factory
 * Used on product detail page (PDP)
 */
export const productDetailOptions = (slug: string) =>
  queryOptions({
    queryKey: catalogKeys.detail(slug),
    queryFn: () => productsApi.getProductBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
