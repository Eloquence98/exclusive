// src/app/(marketing)/search/page.tsx

import { searchResultsOptions } from "@/domains/search/search.query";
import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { SearchClient } from "./search-client";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    onSale?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" — Search Results` : "Search — Exclusive",
    description: q
      ? `Browse search results for "${q}"`
      : "Search our collection",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";

  const queryClient = getQueryClient();

  // Prefetch only if query is valid
  if (query.trim().length >= 2) {
    await queryClient.prefetchQuery(
      searchResultsOptions({
        q: query,
        category: params.category as never,
        brand: params.brand,
        minPrice: params.minPrice ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
        onSale: params.onSale === "true" ? true : undefined,
        page: params.page ? Number(params.page) : 1,
        limit: 20,
      }),
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchClient initialQuery={query} />
    </HydrationBoundary>
  );
}
