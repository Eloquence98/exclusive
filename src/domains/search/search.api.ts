// src/domains/search/search.api.ts

import type { ApiResponse } from "@/types/api";
import type {
  AutocompleteResponse,
  SearchParams,
  SearchResult,
  SearchResultsResponse,
  SearchSuggestion,
} from "./search.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Fetches instant autocomplete suggestions.
 * GET /api/v1/search/suggest?q=...
 *
 * Accepts AbortController signal — previous in-flight request
 * is cancelled automatically when a new query fires.
 * Backend requires minimum 2 characters.
 * Limited to 8 results by backend.
 */
export async function getSearchSuggestions(
  query: string,
  signal?: AbortSignal,
): Promise<AutocompleteResponse> {
  const res = await fetch(
    `${API_BASE_URL}/search/suggest?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
      signal,
    },
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message ?? `Failed to fetch suggestions: ${res.statusText}`,
    );
  }

  const data = (json as ApiResponse<SearchSuggestion[]>).data;

  return { suggestions: data };
}

/**
 * Fetches full search results with filters and pagination.
 * GET /api/v1/search?q=...
 *
 * Accepts AbortController signal — stale requests are cancelled
 * when params change before the previous request resolves.
 * Results are sorted by backend relevance ranking (Atlas Search score).
 * Score is not exposed in the response — sorting is backend-owned.
 */
export async function searchProducts(
  params: SearchParams,
  signal?: AbortSignal,
): Promise<SearchResultsResponse> {
  const url = new URL(`${API_BASE_URL}/search`);

  // Required
  url.searchParams.set("q", params.q);

  // Pagination
  url.searchParams.set("page", String(params.page ?? 1));
  url.searchParams.set("limit", String(params.limit ?? 20));

  // Optional filters
  if (params.category) url.searchParams.set("category", params.category);
  if (params.brand) url.searchParams.set("brand", params.brand);
  if (params.minPrice !== undefined)
    url.searchParams.set("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined)
    url.searchParams.set("maxPrice", String(params.maxPrice));
  if (params.onSale !== undefined)
    url.searchParams.set("onSale", String(params.onSale));

  const res = await fetch(url.toString(), {
    cache: "no-store",
    signal,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? `Search failed: ${res.statusText}`);
  }

  const typed = json as ApiResponse<SearchResult[]>;

  return {
    results: typed.data,
    pagination: typed.meta?.pagination ?? { page: 1, limit: 20 },
  };
}
