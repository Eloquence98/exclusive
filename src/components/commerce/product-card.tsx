"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { cn } from "@/src/utils/utility";
import { ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  price: number;
  salePrice?: number;
  discountPercentage?: number;
  imageUrl: string;
  isFeatured?: boolean;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const hasSale = product.salePrice && product.salePrice < product.price;

  // Connect to Zustand Cart Store
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent link navigation when clicking Quick Add
    e.preventDefault();
    e.stopPropagation();

    // Add item to cart (Size is undefined for Quick Add)
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      salePrice: product.salePrice,
      imageUrl: product.imageUrl,
    });

    // User Feedback
    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className={cn("group flex flex-col", className)}>
      {/* Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges (Featured / Sale) */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Featured
            </span>
          )}
          {hasSale && (
            <span className="rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground">
              {product.discountPercentage
                ? `-${product.discountPercentage}%`
                : "Sale"}
            </span>
          )}
        </div>

        {/* Quick Add Button (Desktop Only) */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 z-10 hidden translate-y-full p-4 transition-transform duration-300 ease-out group-hover:translate-y-0 md:block">
            <Button
              className="w-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm hover:bg-background"
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Quick Add
            </Button>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
            <span className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="mt-4 space-y-1.5 px-1">
        {/* Brand (Overline) */}
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {product.brand}
          </p>
        )}

        {/* Title */}
        <h3 className="line-clamp-1 text-base font-medium text-foreground">
          <Link
            href={`/product/${product.slug}`}
            className="underline-offset-4 transition-colors hover:underline"
          >
            {product.name}
          </Link>
        </h3>

        {/* Rating Stars */}
        {product.rating !== undefined && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.round(product.rating!)
                      ? "fill-amber-500 text-amber-500"
                      : "fill-muted text-muted",
                  )}
                />
              ))}
            </div>
            {product.reviewCount !== undefined && (
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2 pt-0.5">
          {hasSale ? (
            <>
              <span className="text-sm font-medium text-destructive">
                ${product.salePrice?.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-foreground">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
