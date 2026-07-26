"use client";

import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { OrderTimeline } from "@/components/account/order-timeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { OrderTracking } from "@/domains/order/order.types";
import { formatCurrency, formatDate } from "@/utils/utility";
import Image from "next/image";

interface OrderHistoryListProps {
  orders: OrderTracking[];
}

export function OrderHistoryList({ orders }: OrderHistoryListProps) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {orders.map((order) => (
        <AccordionItem
          key={order.id}
          value={order.id}
          className="rounded-lg border border-border px-4"
        >
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex flex-1 flex-wrap items-center justify-between gap-3 pr-4 text-left">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {order.orderNumber}
                </p>
                <p className="text-xs text-muted-foreground">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">
                  {formatCurrency(order.totalAmount)}
                </span>
                <OrderStatusBadge status={order.orderStatus} />
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="space-y-6 pb-6 pt-2">
            {/* Products */}
            <div className="space-y-3">
              {order.products.map((item, index) => (
                <div key={`${item.product}-${index}`} className="flex gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="line-clamp-1 text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty {item.quantity} &middot;{" "}
                      {formatCurrency(item.priceAtPurchase)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Timeline */}
            <div className="border-t border-border pt-6">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Order Status
              </h4>
              <OrderTimeline
                statusHistory={order.statusHistory}
                currentStatus={order.orderStatus}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
