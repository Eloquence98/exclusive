"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface ShopParams {
  page: number;
  limit: number;
  sort?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

export function useShopParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read current state from URL → typed ShopParams
  const params: ShopParams = {
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 9,
    sort: searchParams.get("sort") || undefined,
    category: searchParams.get("category") || undefined,
    brand: searchParams.get("brand") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    rating: searchParams.get("rating")
      ? Number(searchParams.get("rating"))
      : undefined,
  };

  // Update URL params → triggers queryKey change → TanStack Query auto-refetches
  const setParams = useCallback(
    (newParams: Partial<ShopParams>) => {
      const next = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      // Reset to page 1 whenever filters change — standard UX
      const isFilterChange = Object.keys(newParams).some(
        (key) => key !== "page" && key !== "limit" && key !== "sort",
      );
      if (isFilterChange) {
        next.set("page", "1");
      }

      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  // Clear all filters — reset to default state
  const clearParams = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  return { params, setParams, clearParams };
}
