import { productListOptions } from "@/domains/catalog/queries/products.query";
import type { ShopParams } from "@/hooks/useShopParams";
import { getQueryClient } from "@/src/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import ShopClient from "./shop-client";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse our full collection of premium products. Filter by category, brand, price and rating to find exactly what you are looking for.",
};

const defaultShopParams: ShopParams = {
  page: 1,
  limit: 9,
};

export default function ShopPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(productListOptions(defaultShopParams));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopClient />
    </HydrationBoundary>
  );
}
