"use client";

import { HeroUIProvider } from "@heroui/react";
import { CartProvider } from "@/app/_hooks/CartProvider";
import { WishlistProvider } from "@/app/_hooks/WishlistProvider";

export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </HeroUIProvider>
  );
}
