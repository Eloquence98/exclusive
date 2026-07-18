import type { OrderStatus } from "@/domains/order/order.types";
import { cn } from "@/utils/utility";

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
  {
    processing: {
      label: "Processing",
      className: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    },
    shipped: {
      label: "Shipped",
      className: "bg-violet-500/10 text-violet-700 border-violet-500/20",
    },
    delivered: {
      label: "Delivered",
      className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-rose-500/10 text-rose-700 border-rose-500/20",
    },
  };

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
