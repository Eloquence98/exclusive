"use client";

import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem as CartItemType } from "@/lib/store";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity, closeCart } = useCartStore();

  // Calculate price based on active sale
  const currentPrice = item.salePrice || item.price;
  const lineTotal = currentPrice * item.quantity;

  return (
    <div className="flex gap-4 border-b border-border py-6 last:border-0">
      {/* Product Image */}
      <Link
        href={`/product/${item.slug}`}
        className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted"
        onClick={closeCart}
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
              onClick={closeCart}
            >
              {item.name}
            </Link>

            {/* Selected Size */}
            {item.size && (
              <p className="text-xs text-muted-foreground">
                Size:{" "}
                <span className="font-medium text-foreground">{item.size}</span>
              </p>
            )}
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            onClick={() => removeItem(item.id, item.size)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Price & Quantity Controls (Pushed to bottom) */}
        <div className="mt-auto flex items-center justify-between pt-4">
          {/* Minimalist Quantity Selector */}
          <div className="flex items-center overflow-hidden rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none text-foreground hover:bg-muted"
              onClick={() =>
                updateQuantity(item.id, item.size, item.quantity - 1)
              }
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="flex h-8 w-8 items-center justify-center border-x border-border bg-background text-sm font-medium text-foreground">
              {item.quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none text-foreground hover:bg-muted"
              onClick={() =>
                updateQuantity(item.id, item.size, item.quantity + 1)
              }
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Line Total */}
          <p className="text-sm font-semibold text-foreground">
            ${lineTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
