"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/domains/cart/cart.store";
import { useWishlistStore } from "@/domains/wishlist/wishlist.store";
import type { WishlistItem as WishlistItemType } from "@/domains/wishlist/wishlist.types";
import { ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface WishlistItemProps {
  item: WishlistItemType;
  onNavigate: () => void;
}

export function WishlistItem({ item, onNavigate }: WishlistItemProps) {
  const { removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleMoveToCart = () => {
    // Add to cart with no size (size: undefined)
    addToCart({
      id: item.id,
      slug: item.slug,
      name: item.name,
      brand: item.brand,
      price: item.price,
      salePrice: item.salePrice,
      imageUrl: item.imageUrl,
    });

    removeItem(item.id);

    toast.success("Moved to cart", {
      description: `${item.name} has been added to your cart.`,
    });
  };

  const currentPrice = item.salePrice ?? item.price;

  return (
    <div className="flex gap-4 border-b border-border py-6 last:border-0">
      {/* Product Image */}
      <Link
        href={`/product/${item.slug}`}
        className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted"
        onClick={onNavigate}
      >
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </Link>

      {/* Product Details & Actions */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-2">
          <div className="space-y-1">
            {/* Brand Overline */}
            {item.brand && (
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {item.brand}
              </p>
            )}

            {/* Product Name */}
            <Link
              href={`/product/${item.slug}`}
              className="line-clamp-1 block max-w-[180px] text-sm font-medium text-foreground underline-offset-4 hover:underline sm:max-w-[220px]"
              onClick={onNavigate}
            >
              {item.name}
            </Link>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from wishlist`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Price & Action Button (Pushed to bottom) */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          {/* Price */}
          <p className="text-sm font-semibold text-foreground">
            ${currentPrice.toFixed(2)}
          </p>

          {/* Move to Cart Button */}
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={handleMoveToCart}
          >
            <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
            Move to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
