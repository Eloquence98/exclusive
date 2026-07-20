// src/domains/search/search.query.ts

import { queryOptions } from "@tanstack/react-query";
import * as searchApi from "./search.api";
import type { SearchParams } from "./search.types";

/**
 * Query key factory for search domain.
 *
 * Key hierarchy:
 * ['search']
 *   ['search', 'suggest', query]
 *   ['search', 'results', { ...SearchParams }]
 */
export const searchKeys = {
  all: ["search"] as const,
  suggest: (query: string) => [...searchKeys.all, "suggest", query] as const,
  results: (params: SearchParams) =>
    [...searchKeys.all, "results", params] as const,
};

/**
 * Autocomplete suggestions query options.
 *
 * Used in the search component for instant suggestions.
 * signal is passed from queryFn context into the API function —
 * when a new query fires before the previous resolves,
 * TanStack Query aborts the previous fetch automatically.
 *
 * Only enabled when query is at least 2 characters.
 * staleTime 1 minute — suggestions are relatively stable.
 */
export const searchSuggestOptions = (query: string) =>
  queryOptions({
    queryKey: searchKeys.suggest(query),
    queryFn: ({ signal }) => searchApi.getSearchSuggestions(query, signal),
    staleTime: 1 * 60 * 1000,
    enabled: query.trim().length >= 2,
  });

/**
 * Search results query options.
 *
 * Used on /search page.
 * signal is passed from queryFn context into the API function —
 * rapid filter or page changes cancel the previous in-flight request.
 *
 * placeholderData keeps previous results visible while
 * new results load — no flash between filter changes.
 * staleTime 2 minutes — results are backend-sorted by relevance.
 */
export const searchResultsOptions = (params: SearchParams) =>
  queryOptions({
    queryKey: searchKeys.results(params),
    queryFn: ({ signal }) => searchApi.searchProducts(params, signal),
    staleTime: 2 * 60 * 1000,
    enabled: params.q.trim().length >= 2,
    placeholderData: (prev) => prev,
  });
