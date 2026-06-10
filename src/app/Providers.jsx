"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/hooks/CartProvider";
import { WishlistProvider } from "@/hooks/WishlistProvider";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}