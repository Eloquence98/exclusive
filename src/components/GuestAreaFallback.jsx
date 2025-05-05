"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import Link from "next/link";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";

export default function GuestAreaFallback() {
  return (
    <div className="flex items-center gap-4">
      <div className="cart-wishlist-icons flex items-center gap-2">
        <Link href="/wishlist" className="relative">
          <Button isIconOnly size="sm" variant="light" aria-label="Wishlist">
            <HiOutlineHeart className="text-default-500" size={20} />
          </Button>
        </Link>

        <Link href="/cart" className="relative">
          <Button isIconOnly size="sm" variant="light" aria-label="Cart">
            <HiOutlineShoppingCart className="text-default-500" size={20} />
          </Button>
        </Link>
      </div>

      <Avatar
        isBordered
        as="button"
        className="animate-pulse transition-transform"
        color="default"
        size="sm"
        showFallback
      />
    </div>
  );
}
