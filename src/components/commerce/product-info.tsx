"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/domains/cart/cart.store";
import type { Product } from "@/src/domains/catalog/product.types";
import { cn } from "@/utils/utility";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    // Pre-select the single size if product has one
    product.size ?? null,
  );
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const hasSale = product.saleStatus === "ACTIVE";
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    // Size required only if product has a size field
    if (!selectedSize && product.size) {
      toast.error("Please select a size");
      return;
    }

    setIsAdding(true);

    setTimeout(() => {
      addItem({
        id: product.id,
        slug: product.slug,
        name: product.title,
        brand: product.brand,
        price: product.price,
        salePrice: product.salePrice,
        imageUrl: product.imageCover,
        size: selectedSize ?? undefined,
      });

      setIsAdding(false);

      // Toast notification is the only feedback — no drawer open
      toast.success("Added to cart", {
        description: `${product.title}${selectedSize ? ` (${selectedSize})` : ""} has been added to your cart.`,
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
            href: `/shop?category=${product.category}`,
          },
          { label: product.title },
        ]}
      />

      {/* Header */}
      <div className="space-y-3">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {product.brand}
          </p>
        )}

        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {product.title}
        </h1>

        {/* Pricing — uses backend virtuals */}
        <div className="flex items-center gap-3">
          {hasSale ? (
            <>
              <span className="text-2xl font-medium text-destructive">
                ${product.currentPrice.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                  {product.discountPercentage}% Off
                </span>
              )}
            </>
          ) : (
            <span className="text-2xl font-medium text-foreground">
              ${product.currentPrice.toFixed(2)}
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
                  i < Math.round(product.ratingsAverage)
                    ? "fill-amber-500 text-amber-500"
                    : "fill-muted text-muted",
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.ratingsAverage} ({product.ratingsQuantity} Reviews)
          </span>
        </div>
      </div>

      {/* Stock Indicator */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            inStock ? "bg-emerald-500" : "bg-destructive",
          )}
        />
        <span className="text-sm font-medium text-foreground">
          {inStock ? `In Stock (${product.stock} available)` : "Out of Stock"}
        </span>
      </div>

      {/* Size Selection */}
      {product.size && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Size</p>
            <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSize(product.size!)}
              className={cn(
                "flex h-11 min-w-[3rem] items-center justify-center rounded-full border px-4 text-sm font-medium transition-all",
                selectedSize === product.size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary",
              )}
            >
              {product.size}
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <div className="space-y-4 pt-4">
        <Button
          size="lg"
          className="h-12 w-full text-base"
          disabled={!inStock || isAdding}
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Adding...
            </span>
          ) : !inStock ? (
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
