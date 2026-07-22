"use client";

import { Button } from "@/components/ui/button";
import { EmptyWishlistEmptyState } from "@/components/ui/empty-state";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWishlistStore } from "@/domains/wishlist/wishlist.store";
import Link from "next/link";
import { WishlistItem } from "./wishlist-item";

interface WishlistDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WishlistDrawer({ isOpen, onOpenChange }: WishlistDrawerProps) {
  const { items, totalItems } = useWishlistStore();

  const handleClose = () => onOpenChange(false);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col bg-background p-0"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border px-6 py-4">
          <SheetTitle className="text-lg font-semibold tracking-tight text-foreground">
            Wishlist ({totalItems()})
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Content Area */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyWishlistEmptyState />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map((item) => (
                <WishlistItem
                  key={item.id}
                  item={item}
                  onNavigate={handleClose}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer / Continue Shopping */}
        {items.length > 0 && (
          <div className="space-y-3 border-t border-border bg-background p-6">
            <p className="text-center text-xs text-muted-foreground">
              Move items to cart to proceed to checkout.
            </p>

            <Button
              asChild
              variant="ghost"
              className="w-full text-sm text-muted-foreground hover:text-foreground"
              onClick={handleClose}
            >
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
