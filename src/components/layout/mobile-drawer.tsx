"use client";

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
import { SearchAutocomplete } from "@/domains/search/search-autocomplete";
import { useWishlistStore } from "@/domains/wishlist/wishlist.store";
import { Heart, Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Shop All", href: "/shop" },
  { name: "New Arrivals", href: "/shop?sort=newest" },
  { name: "Best Sellers", href: "/shop?sort=top-rated" },
];

const categoryLinks = [
  { name: "T-Shirts", href: "/shop?category=t-shirts" },
  { name: "Shirts", href: "/shop?category=shirts" },
  { name: "Polos", href: "/shop?category=polos" },
  { name: "Jeans", href: "/shop?category=jeans" },
  { name: "Shorts", href: "/shop?category=shorts" },
  { name: "Trousers", href: "/shop?category=trousers" },
  { name: "Activewear", href: "/shop?category=activewear" },
  { name: "Fragrances", href: "/shop?category=fragrances" },
  { name: "Shoes", href: "/shop?category=shoes" },
  { name: "Underwear", href: "/shop?category=underwear" },
];

interface MobileDrawerProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export function MobileDrawer({
  onOpenCart,
  onOpenWishlist,
}: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { totalItems: cartTotalItems } = useCartStore();
  const cartCount = cartTotalItems();

  const { totalItems: wishlistTotalItems } = useWishlistStore();
  const wishlistCount = wishlistTotalItems();

  const handleOpenCart = () => {
    setIsOpen(false);
    setTimeout(() => onOpenCart(), 150);
  };

  const handleOpenWishlist = () => {
    setIsOpen(false);
    setTimeout(() => onOpenWishlist(), 150);
  };

  // Closes the drawer when search navigates to a product or results page
  const handleSearchNavigate = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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

      <SheetContent
        side="right"
        className="flex w-full max-w-sm flex-col bg-background p-0"
      >
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="text-left text-xl font-semibold tracking-tight text-foreground">
            Menu
          </SheetTitle>
        </SheetHeader>

        {/* Mobile Search — always-expanded inline variant */}
        <div className="border-b border-border px-6 py-4">
          <SearchAutocomplete
            alwaysExpanded
            className="w-full"
            onNavigate={handleSearchNavigate}
          />
        </div>

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

          {/* Real Categories — flat list, no accordion */}
          <div className="border-t border-border pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Categories
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="space-y-4 border-t border-border px-6 py-6">
          <SheetClose asChild>
            <Link
              href="/me"
              className="block text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              My Account
            </Link>
          </SheetClose>

          {/* Wishlist Trigger */}
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

          {/* Cart Trigger */}
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
