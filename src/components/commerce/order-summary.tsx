import { Button } from "@/components/ui/button";
import { useCartStore } from "@/domains/cart/cart.store";
import {
  calculateShipping,
  calculateTotal,
  formatShippingCost,
} from "@/domains/checkout/checkout.utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface OrderSummaryProps {
  isPending: boolean;
}

export function OrderSummary({ isPending }: OrderSummaryProps) {
  const { items, subtotal } = useCartStore();

  const cartSubtotal = subtotal();
  const { shippingCost } = calculateShipping(cartSubtotal);
  const total = calculateTotal(cartSubtotal, shippingCost);

  return (
    <div className="h-fit rounded-2xl border border-border bg-muted/30 p-6 lg:sticky lg:top-24">
      <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
        Order Summary
      </h2>

      <div className="mb-6 max-h-[40vh] space-y-4 overflow-y-auto pr-2 scrollbar-hide">
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="items-center-center absolute -right-1 -top-1 flex h-5 w-5 justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                {item.quantity}
              </span>
            </div>

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

            <p className="text-sm font-medium text-foreground">
              ${((item.salePrice ?? item.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-border pt-4 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${cartSubtotal.toFixed(2)}</span>
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
