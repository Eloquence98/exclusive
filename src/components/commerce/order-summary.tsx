import { Button } from "@/components/ui/button";
import type { CartItem } from "@/domains/cart/cart.types";
import { formatShippingCost } from "@/domains/checkout/checkout.utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  isPending: boolean;
}

export function OrderSummary({
  items,
  subtotal,
  shippingCost,
  total,
  isPending,
}: OrderSummaryProps) {
  return (
    <div className="h-fit rounded-2xl border border-border bg-muted/30 p-6 lg:sticky lg:top-24">
      <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
        Order Summary
      </h2>

      {/* Items List */}
      <div className="mb-6 max-h-[40vh] space-y-4 overflow-y-auto pr-2 scrollbar-hide">
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex gap-4">
            {/* Product Image */}
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                {item.quantity}
              </span>
            </div>

            {/* Product Info */}
            <div className="flex flex-1 flex-col justify-center">
              <p className="line-clamp-1 text-sm font-medium text-foreground">
                {item.name}
              </p>
              {item.size && (
                <p className="text-xs text-muted-foreground">
                  Size: {item.size}
                </p>
              )}
            </div>

            {/* Line Total */}
            <p className="text-sm font-medium text-foreground">
              ${((item.salePrice ?? item.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals Breakdown */}
      <div className="space-y-3 border-t border-border pt-4 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{formatShippingCost(shippingCost)}</span>
        </div>

        <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Submit Button — Desktop only */}
      {/* type="submit" works because page wraps everything in <form> */}
      <div className="mt-8 hidden space-y-4 lg:block">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="h-12 w-full bg-primary text-base text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : (
            `Pay $${total.toFixed(2)}`
          )}
        </Button>

        <p className="text-center text-[10px] leading-relaxed text-muted-foreground">
          By placing your order, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
