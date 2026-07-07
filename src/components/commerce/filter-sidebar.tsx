/**
 * FilterSidebar (Client Component)
 * Pure UI — receives URL params, writes URL params
 * Fetches catalog stats via TanStack Query for dynamic filters
 * Does NOT fetch products — only controls filter state via URL
 */

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { catalogStatsOptions } from "@/domains/catalog/queries/products.query";
import { cn } from "@/utils/utility";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch catalog stats for dynamic filters
  const { data: stats } = useSuspenseQuery(catalogStatsOptions);

  // Read current filters from URL
  const currentMinPrice =
    Number(searchParams.get("minPrice")) || stats.priceRange.minPrice;
  const currentMaxPrice =
    Number(searchParams.get("maxPrice")) || stats.priceRange.maxPrice;

  // Local state for smooth slider dragging
  const [priceRange, setPriceRange] = useState([
    currentMinPrice,
    currentMaxPrice,
  ]);

  // Sync local state if URL params change externally
  useEffect(() => {
    setPriceRange([currentMinPrice, currentMaxPrice]);
  }, [currentMinPrice, currentMaxPrice]);

  // Helper to update URL params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.set("page", "1"); // Reset to page 1 on filter change
      return params.toString();
    },
    [searchParams],
  );

  const handleCategoryChange = (category: string, checked: boolean) => {
    router.push(
      `${pathname}?${createQueryString("category", checked ? category : "")}`,
    );
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    router.push(
      `${pathname}?${createQueryString("brand", checked ? brand : "")}`,
    );
  };

  const handleRatingChange = (rating: string, checked: boolean) => {
    router.push(
      `${pathname}?${createQueryString("rating", checked ? rating : "")}`,
    );
  };

  // Update URL only when user releases the slider
  const handlePriceCommit = (value: number[]) => {
    const params = new URLSearchParams(searchParams.toString());

    // Only add params if they differ from defaults
    if (value[0] > stats.priceRange.minPrice) {
      params.set("minPrice", value[0].toString());
    } else {
      params.delete("minPrice");
    }

    if (value[1] < stats.priceRange.maxPrice) {
      params.set("maxPrice", value[1].toString());
    } else {
      params.delete("maxPrice");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    router.push(pathname);
  };

  const currentCategory = searchParams.get("category");
  const currentBrand = searchParams.get("brand");
  const currentRating = searchParams.get("rating");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="h-auto p-0 text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "brands", "price", "rating"]}
        className="w-full"
      >
        {/* Categories */}
        <AccordionItem value="categories" className="border-border">
          <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:text-foreground">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {stats.categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center space-x-3"
                >
                  <Checkbox
                    id={`cat-${category.name}`}
                    checked={currentCategory === category.name}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.name, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`cat-${category.name}`}
                    className="flex w-full cursor-pointer justify-between text-sm font-normal text-muted-foreground"
                  >
                    <span className="capitalize">
                      {category.name.replace("-", " ")}
                    </span>
                    <span className="text-xs">({category.count})</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands" className="border-border">
          <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:text-foreground">
            Brands
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {stats.brands.slice(0, 10).map((brand) => (
                <div key={brand.name} className="flex items-center space-x-3">
                  <Checkbox
                    id={`brand-${brand.name}`}
                    checked={currentBrand === brand.name}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand.name, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`brand-${brand.name}`}
                    className="flex w-full cursor-pointer justify-between text-sm font-normal text-muted-foreground"
                  >
                    <span>{brand.name}</span>
                    <span className="text-xs">({brand.count})</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price" className="border-border">
          <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:text-foreground">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-1 pt-4">
              <Slider
                min={Math.floor(stats.priceRange.minPrice)}
                max={Math.ceil(stats.priceRange.maxPrice)}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                onValueCommit={handlePriceCommit}
                className="mb-6"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating" className="border-border">
          <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:text-foreground">
            Rating
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={currentRating === rating.toString()}
                    onCheckedChange={(checked) =>
                      handleRatingChange(rating.toString(), checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="flex cursor-pointer items-center gap-1"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < rating
                              ? "fill-amber-500 text-amber-500"
                              : "fill-muted text-muted",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">& Up</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
