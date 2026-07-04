"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { CartItem } from "./cart-item";

export function CartDrawer() {
  const { isOpen, closeCart, items, totalItems, subtotal } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col bg-background p-0"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border px-6 py-4">
          <SheetTitle className="text-lg font-semibold tracking-tight text-foreground">
            Your Cart ({totalItems()})
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyState
                icon={<ShoppingBag className="h-8 w-8" />}
                title="Your cart is empty"
                description="Looks like you haven't added anything to your cart yet."
                action={
                  <Button asChild variant="default" onClick={closeCart}>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map((item, index) => (
                <CartItem
                  key={`${item.id}-${item.size || "no-size"}-${index}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout Actions */}
        {items.length > 0 && (
          <div className="space-y-4 border-t border-border bg-background p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Subtotal
              </span>
              <span className="text-lg font-semibold text-foreground">
                ${subtotal().toFixed(2)}
              </span>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>

            <Button
              asChild
              size="lg"
              className="h-12 w-full bg-primary text-base text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/checkout" onClick={closeCart}>
                Proceed to Checkout
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="w-full text-sm text-muted-foreground hover:text-foreground"
              onClick={closeCart}
            >
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
