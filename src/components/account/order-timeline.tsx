"use client";

import type {
  OrderStatus,
  OrderStatusHistory,
} from "@/domains/order/order.types";
import { cn, formatDateTime } from "@/utils/utility";
import { Check, X } from "lucide-react";

const ORDERED_STEPS: OrderStatus[] = [
  "processing",
  "confirmed",
  "shipped",
  "delivered",
];

const stepMeta: Record<OrderStatus, { label: string; description: string }> = {
  processing: {
    label: "Order Placed",
    description: "We have received your order and are preparing it.",
  },
  confirmed: {
    label: "Order Confirmed",
    description: "Your order has been confirmed and is being prepared.",
  },
  shipped: {
    label: "Shipped",
    description: "Your order is on its way to you.",
  },
  delivered: {
    label: "Delivered",
    description: "Your order has been delivered successfully.",
  },
  cancelled: {
    label: "Cancelled",
    description: "This order has been cancelled.",
  },
};

interface OrderTimelineProps {
  statusHistory: OrderStatusHistory[];
  currentStatus: OrderStatus;
}

export function OrderTimeline({
  statusHistory,
  currentStatus,
}: OrderTimelineProps) {
  const isCancelled = currentStatus === "cancelled";

  const historyMap = new Map<OrderStatus, OrderStatusHistory>();
  statusHistory.forEach((entry) => historyMap.set(entry.status, entry));

  const steps = isCancelled
    ? [
        ...ORDERED_STEPS.filter((s) => historyMap.has(s)),
        "cancelled" as OrderStatus,
      ]
    : ORDERED_STEPS;

  function getStepState(
    status: OrderStatus,
  ): "completed" | "current" | "pending" {
    if (historyMap.has(status)) {
      if (status === currentStatus && !isCancelled) return "current";
      return "completed";
    }
    if (status === currentStatus) return "current";
    return "pending";
  }

  return (
    <div className="relative space-y-0">
      {steps.map((status, index) => {
        const isLast = index === steps.length - 1;
        const state = getStepState(status);
        const meta = stepMeta[status];
        const historyEntry = historyMap.get(status);
        const isCancelledStep = status === "cancelled";

        return (
          <div
            key={status}
            className="relative flex gap-4 pb-8 last:pb-0"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Vertical connector line */}
            {!isLast && (
              <div
                className={cn(
                  "absolute bottom-0 left-[15px] top-8 w-[2px] transition-all duration-500",
                  state === "completed"
                    ? "bg-foreground"
                    : "border-l-2 border-dashed border-border",
                )}
              />
            )}

            {/* Step indicator */}
            <div className="relative z-10 flex-shrink-0">
              {state === "completed" ? (
                isCancelledStep ? (
                  // Cancelled — rose filled circle with X
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-primary-foreground shadow-sm shadow-destructive/30">
                    <X className="h-4 w-4" strokeWidth={3} />
                  </div>
                ) : (
                  // Completed — solid foreground circle with check
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-sm">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </div>
                )
              ) : state === "current" ? (
                // Current — pulsing ring
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-20" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-foreground" />
                </div>
              ) : (
                // Pending — hollow circle
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background" />
              )}
            </div>

            {/* Step content */}
            <div
              className={cn(
                "flex flex-col gap-0.5 pt-1 transition-opacity duration-300",
                state === "pending" && "opacity-40",
              )}
            >
              <span
                className={cn(
                  "text-sm",
                  state !== "pending"
                    ? "font-semibold text-foreground"
                    : "font-normal text-muted-foreground",
                  isCancelledStep && state === "completed" && "text-rose-600",
                )}
              >
                {meta.label}
              </span>

              <span className="text-xs text-muted-foreground">
                {meta.description}
              </span>

              {historyEntry?.timestamp && (
                <span className="mt-1 text-xs font-medium text-muted-foreground">
                  {formatDateTime(historyEntry.timestamp)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
