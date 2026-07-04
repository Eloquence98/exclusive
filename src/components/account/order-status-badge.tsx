import { type OrderStatus } from "@/lib/api";
import { cn } from "@/src/utils/utility";

const statusStyles: Record<OrderStatus, string> = {
  Processing: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  Shipped: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  Delivered: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  Cancelled: "bg-rose-500/10 text-rose-700 border-rose-500/20",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
