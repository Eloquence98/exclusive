"use client";

import { getQueryClient } from "@/lib/get-query-client";
import { HeroUIProvider } from "@heroui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "../hooks/CartProvider";
import { WishlistProvider } from "../hooks/WishlistProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <HeroUIProvider>
        <CartProvider>
          <WishlistProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <ReactQueryDevtools />
            </QueryClientProvider>
          </WishlistProvider>
        </CartProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
