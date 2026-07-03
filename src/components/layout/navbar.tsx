"use client";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { cn } from "@/utils/utility";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileDrawer } from "./mobile-drawer";

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "New Arrivals", href: "/shop?sort=newest" },
  { name: "Categories", href: "/shop" }, // Will link to specific categories later
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-zinc-200 bg-white/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-zinc-950 transition-opacity hover:opacity-80"
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
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-1">
            {/* Search (Hidden on very small screens to prevent overflow, accessible via mobile drawer if needed, or just expands) */}
            <div className="hidden sm:block">
              <SearchInput />
            </div>

            {/* Mobile Search Icon (Visible only on small screens) */}
            <Button variant="ghost" size="icon" className="sm:hidden" asChild>
              <Link href="/shop" aria-label="Search">
                <ShoppingBag className="h-5 w-5 text-zinc-600" />{" "}
                {/* Reusing icon, will be Search icon */}
              </Link>
            </Button>

            {/* Profile / Account */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account" aria-label="My Account">
                <User className="h-5 w-5 text-zinc-600" />
              </Link>
            </Button>

            {/* Cart (Placeholder for Phase 5 Cart Drawer) */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart" aria-label="Shopping Cart">
                <ShoppingBag className="h-5 w-5 text-zinc-600" />
                {/* Badge placeholder for cart count */}
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                  0
                </span>
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <MobileDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
