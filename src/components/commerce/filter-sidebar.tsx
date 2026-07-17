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
import { catalogStatsOptions } from "@/domains/catalog/products.query";
import { useShopParams } from "@/hooks/useShopParams";
import { cn } from "@/utils/utility";
import { Skeleton } from "@heroui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export function FilterSidebar() {
  const { params, setParams, clearParams } = useShopParams();
  // Instant cache hit — stats prefetched on server
  // useSuspenseQuery is correct here — Suspense boundary in ShopClient
  const { data: stats } = useSuspenseQuery(catalogStatsOptions);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    params.minPrice ?? Math.floor(stats.priceRange.minPrice),
    params.maxPrice ?? Math.ceil(stats.priceRange.maxPrice),
  ]);

  // Sync slider when URL params change externally (clear all, back button)
  useEffect(() => {
    setPriceRange([
      params.minPrice ?? Math.floor(stats.priceRange.minPrice),
      params.maxPrice ?? Math.ceil(stats.priceRange.maxPrice),
    ]);
  }, [params.minPrice, params.maxPrice, stats.priceRange]);

  // Commit price to URL only on slider release
  const handlePriceCommit = (value: number[]) => {
    const isAtMin = value[0] <= Math.floor(stats.priceRange.minPrice);
    const isAtMax = value[1] >= Math.ceil(stats.priceRange.maxPrice);

    setParams({
      minPrice: isAtMin ? undefined : value[0],
      maxPrice: isAtMax ? undefined : value[1],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearParams}
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
        {/* Categories — from backend stats */}
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
                    checked={params.category === category.name}
                    onCheckedChange={(checked) =>
                      setParams({
                        category: checked ? category.name : undefined,
                      })
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

        {/* Brands — from backend stats, top 10 */}
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
                    checked={params.brand === brand.name}
                    onCheckedChange={(checked) =>
                      setParams({
                        brand: checked ? brand.name : undefined,
                      })
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

        {/* Price — real min/max from backend stats */}
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
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
                onValueCommit={handlePriceCommit}
                className="mb-6"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0].toFixed(0)}</span>
                <span>${priceRange[1].toFixed(0)}</span>
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
                    checked={params.rating === rating}
                    onCheckedChange={(checked) =>
                      setParams({
                        rating: checked ? rating : undefined,
                      })
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

export function FilterSidebarSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-14" />
      </div>
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-2 pl-1">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
