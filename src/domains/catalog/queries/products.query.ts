/**
 * Product Queries (TanStack Query layer)
 * Defines all catalog domain queries using queryOptions pattern
 * TanStack Query is the only server state manager
 */

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
 *     ['catalog', 'products', 'list', { ...searchParams }]
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
  list: (searchParams: Record<string, string | string[] | undefined>) =>
    [...catalogKeys.products(), "list", searchParams] as const,
  detail: (slug: string) =>
    [...catalogKeys.products(), "detail", slug] as const,

  // Stats
  stats: () => [...catalogKeys.all, "stats"] as const,
};

/**
 * Featured products query
 * Used on homepage — 8 products, sorted by createdAt
 */
export const featuredProductsOptions = queryOptions({
  queryKey: catalogKeys.featured(),
  queryFn: productsApi.getFeaturedProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

/**
 * Trending products query
 * Used on homepage — 5 products, sorted by ratingsQuantity
 */
export const trendingProductsOptions = queryOptions({
  queryKey: catalogKeys.trending(),
  queryFn: productsApi.getTrendingProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

/**
 * Top rated products query
 * Used on homepage — 5 products, sorted by ratingsAverage
 */
export const topRatedProductsOptions = queryOptions({
  queryKey: catalogKeys.topRated(),
  queryFn: productsApi.getTopRatedProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

/**
 * Product list query factory
 * Used on shop page
 * Each unique searchParams object = unique cache entry
 *
 * Cache behavior:
 * ?page=1&sort=price-asc          → unique cache entry
 * ?page=2&sort=price-asc          → different cache entry
 * ?category=shoes                 → different cache entry
 * Browser back/forward            → instant cache hit
 * Same params after navigation    → instant cache hit
 */
export const productListOptions = (
  searchParams: Record<string, string | string[] | undefined>,
) =>
  queryOptions({
    queryKey: catalogKeys.list(searchParams),
    queryFn: () => productsApi.getProductList(searchParams),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

/**
 * Catalog stats query
 * Used to power filter sidebar dynamically
 * Price range, categories, brands, sizes — all from backend
 * Long staleTime — stats don't change frequently
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
