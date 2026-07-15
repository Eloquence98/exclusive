"use client";

import { CheckoutForm } from "@/components/commerce/checkout-form";
import { OrderSummary } from "@/components/commerce/order-summary";
import { useCartStore } from "@/domains/cart/cart.store";
import { createOrderMutationOptions } from "@/domains/checkout/checkout.mutation";
import type { CreateOrderPayload } from "@/domains/checkout/checkout.types";
import {
  calculateShipping,
  calculateTotal,
} from "@/domains/checkout/checkout.utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();

  useEffect(() => {
    if (items.length === 0) {
      router.push("/shop");
    }
  }, [items, router]);

  const { mutate: placeOrder, isPending } = useMutation({
    ...createOrderMutationOptions,
    onSuccess: (data) => {
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/checkout/success?orderNumber=${data.orderNumber}`);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to place order. Please try again.");
    },
  });

  const cartSubtotal = subtotal();
  const { shippingCost } = calculateShipping(cartSubtotal);
  const total = calculateTotal(cartSubtotal, shippingCost);

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Left Column — Form owns its state and <form> element */}
          <CheckoutForm
            items={items}
            total={total}
            isPending={isPending}
            onPlaceOrder={(payload: CreateOrderPayload) => placeOrder(payload)}
          />

          {/* Right Column — Summary reads cart data from store */}
          <OrderSummary isPending={isPending} />
        </div>
      </main>
    </div>
  );
}
