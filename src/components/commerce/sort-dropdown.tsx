"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShopParams } from "@/hooks/useShopParams";

export function SortDropdown() {
  const { params, setParams } = useShopParams();

  const handleSortChange = (value: string) => {
    setParams({ sort: value });
  };

  return (
    <Select value={params.sort || ""} onValueChange={handleSortChange}>
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
