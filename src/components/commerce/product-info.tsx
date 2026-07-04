"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { cn } from "@/src/utils/utility";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface ProductSize {
  name: string;
  inStock: boolean;
}

// Updated interface to include fields needed for the Cart Store
export interface ProductInfoData {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sizes: ProductSize[];
  images: string[];
}

interface ProductInfoProps {
  product: ProductInfoData;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Connect to Zustand store
  const addItem = useCartStore((state) => state.addItem);

  const hasSale = product.salePrice && product.salePrice < product.price;

  const handleAddToCart = () => {
    // Validation: Ensure a size is selected if the product has sizes
    if (!selectedSize && product.sizes.length > 0) {
      toast.error("Please select a size");
      return;
    }

    setIsAdding(true);

    // Simulate brief network delay for UX, then add to store
    setTimeout(() => {
      addItem({
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        price: product.price,
        salePrice: product.salePrice,
        imageUrl: product.images[0], // Use the primary image for the cart
        size: selectedSize || undefined,
      });

      setIsAdding(false);

      toast.success("Added to cart", {
        description: `${product.name}${selectedSize ? ` (${selectedSize})` : ""} has been added.`,
      });
    }, 600);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          {
            label: product.category,
            href: `/shop?category=${product.category.toLowerCase()}`,
          },
          { label: product.name },
        ]}
      />

      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {product.brand}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {product.name}
        </h1>

        {/* Pricing */}
        <div className="flex items-center gap-3">
          {hasSale ? (
            <>
              <span className="text-2xl font-medium text-destructive">
                ${product.salePrice?.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                {product.discountPercentage}% Off
              </span>
            </>
          ) : (
            <span className="text-2xl font-medium text-foreground">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(product.rating)
                    ? "fill-amber-500 text-amber-500"
                    : "fill-muted text-muted",
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount} Reviews)
          </span>
        </div>
      </div>

      {/* Stock Indicator */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            product.inStock ? "bg-emerald-500" : "bg-destructive",
          )}
        />
        <span className="text-sm font-medium text-foreground">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Size Selection */}
      {product.sizes.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Size</p>
            <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size.name}
                disabled={!size.inStock}
                onClick={() => setSelectedSize(size.name)}
                className={cn(
                  "flex h-11 min-w-[3rem] items-center justify-center rounded-full border px-4 text-sm font-medium transition-all",
                  selectedSize === size.name
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary",
                  !size.inStock && "cursor-not-allowed line-through opacity-50",
                )}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="space-y-4 pt-4">
        <Button
          size="lg"
          className="h-12 w-full bg-primary text-base text-primary-foreground hover:bg-primary/90"
          disabled={!product.inStock || isAdding}
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Adding...
            </span>
          ) : !product.inStock ? (
            "Sold Out"
          ) : (
            "Add to Cart"
          )}
        </Button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5" /> Free Shipping
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5" /> 30-Day Returns
          </span>
        </div>
      </div>
    </div>
  );
}
