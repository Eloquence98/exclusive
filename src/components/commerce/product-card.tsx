import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utility";
import { ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className={cn("group flex flex-col", className)}>
      {/* Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-100"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges (Featured / Sale) */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
              Featured
            </span>
          )}
          {hasSale && (
            <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-medium text-white">
              {product.discountPercentage
                ? `-${product.discountPercentage}%`
                : "Sale"}
            </span>
          )}
        </div>

        {/* Quick Add Button (Desktop Only) */}
        {/* Blueprint: "Button slides up from bottom of image on hover" */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 hidden translate-y-full p-4 transition-transform duration-300 ease-out group-hover:translate-y-0 md:block">
            <Button
              className="w-full bg-white/90 text-zinc-950 backdrop-blur-sm hover:bg-white"
              onClick={(e) => {
                // Prevent link navigation when clicking Quick Add
                e.preventDefault();
                e.stopPropagation();
                // Future: Add to cart logic
              }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Quick Add
            </Button>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
            <span className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="mt-4 space-y-1 px-1">
        {/* Brand (Overline) */}
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {product.brand}
          </p>
        )}

        {/* Title */}
        <h3 className="line-clamp-1 text-base font-medium text-zinc-950">
          <Link
            href={`/product/${product.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {product.name}
          </Link>
        </h3>

        {/* Rating Stars (Blueprint: Lucide Star icons, filled amber) */}
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
                      : "fill-zinc-200 text-zinc-200",
                  )}
                />
              ))}
            </div>
            {product.reviewCount !== undefined && (
              <span className="text-xs text-zinc-400">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2">
          {hasSale ? (
            <>
              <span className="text-sm font-medium text-rose-500">
                ${product.salePrice?.toFixed(2)}
              </span>
              <span className="text-sm text-zinc-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-zinc-900">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
