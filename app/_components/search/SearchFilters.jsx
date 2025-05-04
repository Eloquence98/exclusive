"use client";

import { Chip } from "@heroui/chip";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { HiMagnifyingGlass } from "react-icons/hi2";

// Available filters
const CATEGORIES = ["Dresses", "Tops", "Jeans", "Skirts", "Outerwear", "Accessories"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = ["Black", "White", "Red", "Blue", "Green", "Yellow"];
const PRICE_RANGES = ["Under $25", "$25 - $50", "$50 - $100", "Over $100"];

export default function SearchFilters({ refinedQuery, setRefinedQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(refinedQuery);
  };

  return (
    <aside className="space-y-6 md:col-span-1">
      {/* Search refinement */}
      <div>
        <h3 className="mb-3 text-medium font-semibold">Refine Search</h3>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <Input
              value={refinedQuery}
              onChange={(e) => setRefinedQuery(e.target.value)}
              placeholder="Search again..."
              startContent={<HiMagnifyingGlass className="text-default-400" size={18} />}
              size="sm"
              className="w-full"
            />
          </form>
        </div>
      </div>

      <Divider />

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-medium font-semibold">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox size="sm" />
              <span className="text-sm">{category}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Price range */}
      <div>
        <h3 className="mb-3 text-medium font-semibold">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <div key={range} className="flex items-center gap-2">
              <Checkbox size="sm" />
              <span className="text-sm">{range}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Sizes */}
      <div>
        <h3 className="mb-3 text-medium font-semibold">Size</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <Chip key={size} variant="flat" className="cursor-pointer" size="sm">
              {size}
            </Chip>
          ))}
        </div>
      </div>

      <Divider />

      {/* Colors */}
      <div>
        <h3 className="mb-3 text-medium font-semibold">Color</h3>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <div
              key={color}
              className="h-6 w-6 cursor-pointer rounded-full border border-default-200"
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
