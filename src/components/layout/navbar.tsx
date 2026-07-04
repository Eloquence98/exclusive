"use client";

import { CartDrawer } from "@/components/commerce/cart-drawer";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { useCartStore } from "@/lib/store";
import { cn } from "@/src/utils/utility";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileDrawer } from "./mobile-drawer";

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "New Arrivals", href: "/shop?sort=newest" },
  { name: "Categories", href: "/shop" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Connect to Cart Store
  const { openCart, totalItems } = useCartStore();
  const cartCount = totalItems();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "border-b border-border bg-background/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
              >
                ATELIER
              </Link>
            </div>

            {/* Center: Desktop Links */}
            <nav className="hidden items-center space-x-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center space-x-1">
              <div className="hidden sm:block">
                <SearchInput />
              </div>

              {/* Profile / Account */}
              <Button variant="ghost" size="icon" asChild>
                <Link href="/account" aria-label="My Account">
                  <User className="h-5 w-5 text-foreground" />
                </Link>
              </Button>

              {/* Cart Trigger */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCart}
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <MobileDrawer />
            </div>
          </div>
        </div>
      </header>

      {/* Global Cart Drawer Instance */}
      <CartDrawer />
    </>
  );
}
