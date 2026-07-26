"use client";

import { OrderHistoryList } from "@/components/account/order-history-list";
import { OrderHistorySkeleton } from "@/components/account/order-history-skeleton";
import PaginationControls from "@/components/commerce/product-pagination";
import { NoOrdersEmptyState } from "@/components/ui/empty-state";
import { myOrdersOptions } from "@/domains/order/order.query";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const PAGE_LIMIT = 10;

export default function OrderHistoryClient() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isPending, isError } = useQuery(
    myOrdersOptions({ page, limit: PAGE_LIMIT }),
  );

  if (isPending) {
    return <OrderHistorySkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-muted-foreground">
          Something went wrong loading your orders. Please try again.
        </p>
      </div>
    );
  }

  if (data.orders.length === 0) {
    return <NoOrdersEmptyState />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          My Orders
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View your order history and track current orders.
        </p>
      </div>

      <OrderHistoryList orders={data.orders} />

      <PaginationControls pagination={data.pagination} />
    </div>
  );
}
