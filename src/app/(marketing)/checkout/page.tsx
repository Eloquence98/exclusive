"use client";

import { CheckoutForm } from "@/components/commerce/checkout-form";
import { OrderSummary } from "@/components/commerce/order-summary";
import { EmptyCartEmptyState } from "@/components/ui/empty-state";
import { useCartStore } from "@/domains/cart/cart.store";
import { createOrderMutationOptions } from "@/domains/checkout/checkout.mutation";
import type { CreateOrderPayload } from "@/domains/checkout/checkout.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const { mutate: placeOrder, isPending } = useMutation({
    ...createOrderMutationOptions,
    onSuccess: (data) => {
      clearCart();
      toast.success("Order placed successfully!");
      router.push(
        `/checkout/success?orderNumber=${data.orderNumber}&token=${data.accessToken}`,
      );
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to place order. Please try again.");
    },
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <EmptyCartEmptyState />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          <CheckoutForm
            isPending={isPending}
            onPlaceOrder={(payload: CreateOrderPayload) => placeOrder(payload)}
          />
          <OrderSummary isPending={isPending} />
        </div>
      </main>
    </div>
  );
}
