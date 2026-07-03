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
import { cn } from "@/src/utils/utility";
import { Star } from "lucide-react";
import { useState } from "react";

// Mock data for filters
const categories = ["Apparel", "Footwear", "Accessories", "Outerwear"];
const brands = ["Atelier Essentials", "Atelier Studio", "Atelier Accessories"];

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
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
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-3">
                  <Checkbox id={`cat-${category}`} />
                  <Label
                    htmlFor={`cat-${category}`}
                    className="cursor-pointer text-sm font-normal text-muted-foreground"
                  >
                    {category}
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
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-3">
                  <Checkbox id={`brand-${brand}`} />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="cursor-pointer text-sm font-normal text-muted-foreground"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price" className="border-border">
          <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:text-foreground">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-1 pt-4">
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
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
                  <Checkbox id={`rating-${rating}`} />
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
