// src/domains/search/search.types.ts

import type { ProductCategory } from "@/domains/catalog/product.types";

/**
 * Lightweight suggestion returned by autocomplete endpoint.
 * GET /api/v1/search/suggest?q=...
 * Backend returns max 8 results.
 */
export interface SearchSuggestion {
  id: string;
  title: string;
  price: number;
  onSale: boolean;
  imageCover: string;
  category: ProductCategory;
  brand?: string;
  slug: string;
}

/**
 * Full search result returned by main search endpoint.
 * GET /api/v1/search?q=...
 */
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  discount: number;
  stock: number;
  imageCover: string;
  category: ProductCategory;
  brand?: string;
  tags: string[];
  isFeatured: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
  slug: string;
}

/**
 * Parameters accepted by the search endpoint.
 * All filters supported by backend Atlas Search pipeline.
 */
export interface SearchParams {
  q: string;
  category?: ProductCategory;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Unwrapped search results with pagination.
 * Returned by searchProducts after unwrapping ApiResponse.
 */
export interface SearchResultsResponse {
  results: SearchResult[];
  pagination: {
    page: number;
    limit: number;
  };
}

/**
 * Unwrapped autocomplete response.
 * Returned by getSearchSuggestions after unwrapping ApiResponse.
 */
export interface AutocompleteResponse {
  suggestions: SearchSuggestion[];
}
