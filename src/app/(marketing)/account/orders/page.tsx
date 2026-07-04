"use client";

import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { Button } from "@/components/ui/button";
import { NoOrdersEmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserOrders, type Order } from "@/lib/api";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function OrderTableSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
        >
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-muted" />
            <Skeleton className="h-3 w-32 bg-muted" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-20 rounded-full bg-muted" />
            <Skeleton className="h-4 w-16 bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          My Orders
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your recent purchases and view order history.
        </p>
      </div>

      {isLoading ? (
        <OrderTableSkeleton />
      ) : orders.length === 0 ? (
        <NoOrdersEmptyState />
      ) : (
        <div className="space-y-4">
          {/* Desktop Table Header (Hidden on mobile) */}
          <div className="hidden grid-cols-12 gap-4 border-b border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:grid">
            <div className="col-span-3">Order ID</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Order Rows */}
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="group block rounded-lg border border-border bg-background transition-all hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              {/* Mobile Layout */}
              <div className="space-y-3 p-4 md:hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {order.id}
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {new Date(order.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-medium text-foreground">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2">
                  <span className="text-xs text-muted-foreground">
                    {order.itemsCount} items
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary group-hover:underline">
                    View Details <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden grid-cols-12 items-center gap-4 p-4 md:grid">
                <div className="col-span-3">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {order.id}
                  </span>
                </div>
                <div className="col-span-3">
                  <span className="text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="col-span-2">
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-medium text-foreground">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary"
                    asChild
                  >
                    <span className="flex items-center gap-1">
                      View <ChevronRight className="h-3 w-3" />
                    </span>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
