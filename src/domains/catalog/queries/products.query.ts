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
  list: (searchParams: Record<string, string | string[] | undefined>) =>
    [...catalogKeys.products(), "list", searchParams] as const,
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
 * Product list query factory
 * Used on shop page — each unique searchParams = unique cache entry
 * URL params are the source of truth for filtering, sorting, pagination
 *
 * Cache behavior:
 * /shop?page=1&sort=price-asc → unique cache entry
 * /shop?page=2&sort=price-asc → different cache entry
 * /shop?category=shoes        → different cache entry
 * Browser back/forward        → instant cache hit
 */
export const productListOptions = (
  searchParams: Record<string, string | string[] | undefined>,
) =>
  queryOptions({
    queryKey: catalogKeys.list(searchParams),
    queryFn: () => productsApi.getProductList(searchParams),
    staleTime: 2 * 60 * 1000, // 2 minutes — shop page refreshes more often
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
