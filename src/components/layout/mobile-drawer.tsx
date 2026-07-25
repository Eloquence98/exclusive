"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/domains/cart/cart.store";
import { useWishlistStore } from "@/domains/wishlist/wishlist.store";
import { Heart, Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Women",
    slug: "women",
    subcategories: ["Apparel", "Footwear", "Accessories", "New Arrivals"],
  },
  {
    name: "Men",
    slug: "men",
    subcategories: ["Apparel", "Footwear", "Accessories", "Sale"],
  },
];

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Shop All", href: "/shop" },
  { name: "New Arrivals", href: "/shop?sort=newest" },
];

interface MobileDrawerProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export function MobileDrawer({
  onOpenCart,
  onOpenWishlist,
}: MobileDrawerProps) {
  const { totalItems: cartTotalItems } = useCartStore();
  const cartCount = cartTotalItems();

  const { totalItems: wishlistTotalItems } = useWishlistStore();
  const wishlistCount = wishlistTotalItems();

  // Prevent Radix focus trap conflicts by waiting for mobile drawer to close
  const handleOpenCart = () => {
    setTimeout(() => onOpenCart(), 150);
  };

  const handleOpenWishlist = () => {
    setTimeout(() => onOpenWishlist(), 150);
  };

  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-foreground" />
        </Button>
      </SheetTrigger>

      {/* Drawer Content */}
      <SheetContent
        side="right"
        className="flex w-full max-w-sm flex-col bg-background p-0"
      >
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-left text-xl font-semibold tracking-tight text-foreground">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav className="scrollbar-hide flex-1 overflow-y-auto px-6 py-4">
          {/* Main Links */}
          <ul className="mb-6 space-y-1">
            {mainLinks.map((link) => (
              <li key={link.name}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className="block py-3 text-xl font-medium text-foreground transition-colors hover:text-muted-foreground"
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>

          {/* Categories Accordion */}
          <div className="border-t border-border pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Categories
            </p>
            <Accordion type="single" collapsible className="w-full">
              {categories.map((category) => (
                <AccordionItem
                  key={category.slug}
                  value={category.slug}
                  className="border-border"
                >
                  <AccordionTrigger className="py-3 text-lg font-medium text-foreground">
                    {category.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col space-y-3 pl-2">
                      {category.subcategories.map((sub) => (
                        <li key={sub}>
                          <SheetClose asChild>
                            <Link
                              href={`/shop?category=${sub.toLowerCase().replace(" ", "-")}`}
                              className="block py-1 text-base text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {sub}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </nav>

        {/* Footer Links */}
        <div className="space-y-4 border-t border-border px-6 py-6">
          <SheetClose asChild>
            <Link
              href="/me"
              className="block text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              My Account
            </Link>
          </SheetClose>

          {/* Mobile Wishlist Trigger */}
          <SheetClose asChild>
            <button
              onClick={handleOpenWishlist}
              className="flex w-full items-center justify-between text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Wishlist
              </span>
              {wishlistCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {wishlistCount}
                </span>
              )}
            </button>
          </SheetClose>

          {/* Mobile Cart Trigger */}
          <SheetClose asChild>
            <button
              onClick={handleOpenCart}
              className="flex w-full items-center justify-between text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Cart
              </span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
