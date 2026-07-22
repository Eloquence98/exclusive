import { cn } from "@/utils/utility";
import {
  Heart,
  PackageX,
  SearchX,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Base Empty State Component
 * Blueprint: "Minimalist Lucide icon, clear heading, and a primary CTA button"
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-16 text-center md:py-24",
        className,
      )}
    >
      {/* Minimalist Icon Container */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50 text-zinc-400">
        {icon}
      </div>

      {/* Typography Hierarchy */}
      <h3 className="mb-2 text-xl font-semibold tracking-tight text-zinc-950">
        {title}
      </h3>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-zinc-500">
        {description}
      </p>

      {/* CTA Action */}
      {action && <div>{action}</div>}
    </div>
  );
}

/**
 * Contextual Empty State: Empty Cart (Checkout)
 * Used when user lands on checkout with an empty cart.
 */
export function EmptyCartEmptyState() {
  return (
    <EmptyState
      icon={<ShoppingBag className="h-7 w-7" />}
      title="Your cart is empty"
      description="You haven't added anything to your cart yet. Start shopping to see your items here."
      action={
        <Button asChild variant="default">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      }
    />
  );
}

/**
 * Contextual Empty State: No Search Results
 * Used when a standard search query returns 0 products.
 */
export function NoSearchResultsEmptyState({ query }: { query?: string }) {
  return (
    <EmptyState
      icon={<SearchX className="h-7 w-7" />}
      title="No results found"
      description={
        query
          ? `We couldn't find any products matching "${query}". Please try a different keyword.`
          : "We couldn't find any products matching your search. Please try a different keyword."
      }
      action={
        <Button asChild variant="outline">
          <Link href="/shop">Browse All Products</Link>
        </Button>
      }
    />
  );
}

/**
 * Contextual Empty State: No Filter Results
 * Blueprint: "If a user filters... don't just say 'No products.' Say: 'We couldn't find any products matching your filters. Try broadening your search.' Provide a button to clear filters."
 */
export function NoFilterResultsEmptyState({
  onClearFilters,
}: {
  onClearFilters?: () => void;
}) {
  return (
    <EmptyState
      icon={<SlidersHorizontal className="h-7 w-7" />}
      title="No matching products"
      description="We couldn't find any products matching your filters. Try broadening your search."
      action={
        onClearFilters ? (
          <Button onClick={onClearFilters} variant="default">
            Clear All Filters
          </Button>
        ) : (
          <Button asChild variant="default">
            <Link href="/shop">Clear All Filters</Link>
          </Button>
        )
      }
    />
  );
}

/**
 * Contextual Empty State: No Orders (My Account)
 * Used in the user dashboard when they haven't made a purchase yet.
 */
export function NoOrdersEmptyState() {
  return (
    <EmptyState
      icon={<ShoppingBag className="h-7 w-7" />}
      title="No orders yet"
      description="Looks like you haven't placed any orders. Start shopping to see your order history here."
      action={
        <Button asChild variant="default">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      }
    />
  );
}

/**
 * Contextual Empty State: Empty Wishlist
 * Used when wishlist drawer is open but no items have been saved.
 */
export function EmptyWishlistEmptyState() {
  return (
    <EmptyState
      icon={<Heart className="h-7 w-7" />}
      title="Your wishlist is empty"
      description="Save items you love by tapping the heart icon on any product."
      action={
        <Button asChild variant="default">
          <Link href="/shop">Browse Products</Link>
        </Button>
      }
    />
  );
}

/**
 * Contextual Empty State: Generic Out of Stock / Missing Product
 */
export function MissingProductEmptyState() {
  return (
    <EmptyState
      icon={<PackageX className="h-7 w-7" />}
      title="Product not found"
      description="The product you are looking for does not exist or has been removed."
      action={
        <Button asChild variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      }
    />
  );
}
