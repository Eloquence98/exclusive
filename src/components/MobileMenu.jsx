"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/CartProvider";
import { useWishlist } from "@/hooks/WishlistProvider";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { NavbarMenu } from "@heroui/navbar";
import { NavbarMenuItem } from "@heroui/navbar";
import { Button } from "@heroui/button";

export default function MobileMenu({ navLinks }) {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemCount = cart?.length || 0;
  const wishlistItemCount = wishlist?.length || 0;

  // Listen for menu toggle events from NavbarMenuToggle
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-menu-open") {
          const isOpen = navbar.getAttribute("data-menu-open") === "true";
          setIsMenuOpen(isOpen);
        }
      });
    });

    observer.observe(navbar, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const isActive = (path) => pathname === path;

  // Update cart and wishlist badges dynamically
  useEffect(() => {
    // Update cart count
    const cartCountElements = document.querySelectorAll("[data-cart-count]");
    cartCountElements.forEach((badge) => {
      if (cartItemCount > 0) {
        badge.textContent = cartItemCount.toString();
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });

    // Update wishlist count
    const wishlistCountElements = document.querySelectorAll(
      "[data-wishlist-count]",
    );
    wishlistCountElements.forEach((badge) => {
      if (wishlistItemCount > 0) {
        badge.textContent = wishlistItemCount.toString();
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });
  }, [cartItemCount, wishlistItemCount]);

  return (
    <NavbarMenu>
      {navLinks.map((item) => (
        <NavbarMenuItem key={item.name}>
          <Link
            className={`w-full ${isActive(item.href) ? "font-medium text-primary" : "text-foreground"}`}
            href={item.href}
          >
            {item.name}
          </Link>
        </NavbarMenuItem>
      ))}
      <NavbarMenuItem>
        <div className="mt-4 flex gap-6">
          <Link href="/wishlist">
            <Button
              color="danger"
              variant="flat"
              startContent={<HiOutlineHeart />}
            >
              Wishlist {wishlistItemCount > 0 && `(${wishlistItemCount})`}
            </Button>
          </Link>
          <Link href="/cart">
            <Button
              color="primary"
              variant="flat"
              startContent={<HiOutlineShoppingCart />}
            >
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </Button>
          </Link>
        </div>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}
