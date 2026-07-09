"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useSearchParams } from "next/navigation";

export function SortDropdown() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort") || "";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    // router.replace(`${pathname}?${params.toString()}`);
    // Instant URL update (client-side only) this feels better once data is cached on query
    window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
  };

  return (
    <Select value={sortBy} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px] bg-background md:w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="top-rated">Top Rated</SelectItem>
      </SelectContent>
    </Select>
  );
}
