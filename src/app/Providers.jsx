"use client";

import { CartProvider } from "@/hooks/CartProvider";
import { WishlistProvider } from "@/hooks/WishlistProvider";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </HeroUIProvider>
  );
}
