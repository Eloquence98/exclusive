/**
 * Product Queries (TanStack Query layer)
 * Defines all catalog domain queries using queryOptions pattern
 */

import { queryOptions } from "@tanstack/react-query";
import * as productsApi from "../api/products.api";

/**
 * Query key factory for catalog domain
 * Hierarchical structure enables targeted invalidation
 */
export const catalogKeys = {
  all: ["catalog"] as const,
  products: () => [...catalogKeys.all, "products"] as const,
  featured: () => [...catalogKeys.products(), "featured"] as const,
  trending: () => [...catalogKeys.products(), "trending"] as const,
  topRated: () => [...catalogKeys.products(), "top-rated"] as const,
  detail: (slug: string) =>
    [...catalogKeys.products(), "detail", slug] as const,
};

/**
 * Featured products query
 * Used on homepage
 */
export const featuredProductsOptions = queryOptions({
  queryKey: catalogKeys.featured(),
  queryFn: productsApi.getFeaturedProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

/**
 * Trending products query
 * Used on homepage
 */
export const trendingProductsOptions = queryOptions({
  queryKey: catalogKeys.trending(),
  queryFn: productsApi.getTrendingProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

/**
 * Top-rated products query
 * Used on homepage
 */
export const topRatedProductsOptions = queryOptions({
  queryKey: catalogKeys.topRated(),
  queryFn: productsApi.getTopRatedProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
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
