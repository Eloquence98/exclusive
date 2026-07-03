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
import { Menu } from "lucide-react";
import Link from "next/link";

// Mock categories for the accordion (Will be dynamic in Phase 3)
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

export function MobileDrawer() {
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
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      {/* Drawer Content */}
      <SheetContent side="right" className="flex w-full max-w-sm flex-col p-0">
        <SheetHeader className="border-b border-zinc-100 px-6 py-4">
          <SheetTitle className="text-left text-xl font-semibold tracking-tight">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-6 py-4">
          {/* Main Links */}
          <ul className="mb-6 space-y-1">
            {mainLinks.map((link) => (
              <li key={link.name}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className="block py-3 text-xl font-medium text-zinc-950 transition-colors hover:text-zinc-600"
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>

          {/* Categories Accordion */}
          <div className="border-t border-zinc-100 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Categories
            </p>
            <Accordion type="single" collapsible className="w-full">
              {categories.map((category) => (
                <AccordionItem key={category.slug} value={category.slug}>
                  <AccordionTrigger className="py-3 text-lg font-medium text-zinc-950">
                    {category.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col space-y-3 pl-2">
                      {category.subcategories.map((sub) => (
                        <li key={sub}>
                          <SheetClose asChild>
                            <Link
                              href={`/shop/${category.slug}/${sub.toLowerCase().replace(" ", "-")}`}
                              className="block py-1 text-base text-zinc-600 transition-colors hover:text-zinc-950"
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

        {/* Footer Links (Auth/Cart placeholders for now) */}
        <div className="space-y-4 border-t border-zinc-100 px-6 py-6">
          <SheetClose asChild>
            <Link
              href="/account"
              className="block text-base font-medium text-zinc-950 transition-colors hover:text-zinc-600"
            >
              My Account
            </Link>
          </SheetClose>
          {/* Cart link will be replaced by Cart Drawer trigger in Phase 5 */}
          <SheetClose asChild>
            <Link
              href="/cart"
              className="block text-base font-medium text-zinc-950 transition-colors hover:text-zinc-600"
            >
              Cart
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
