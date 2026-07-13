"use client";

import { CheckoutForm } from "@/components/commerce/checkout-form";
import { OrderSummary } from "@/components/commerce/order-summary";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/domains/cart/cart.store";
import { createOrderMutationOptions } from "@/domains/checkout/checkout.mutation";
import type {
  GuestInfo,
  ShippingAddress,
} from "@/domains/checkout/checkout.types";
import {
  buildOrderProducts,
  calculateShipping,
  calculateTotal,
} from "@/domains/checkout/checkout.utils";
import { getQueryClient } from "@/src/lib/get-query-client";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const queryClient = getQueryClient();

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: "",
    email: "",
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
    country: "",
  });

  // ---
  // Shipping + total — computed from cart subtotal
  // Business rules live in checkout.utils — not here
  // ---
  const cartSubtotal = subtotal();
  const { shippingCost } = calculateShipping(cartSubtotal);
  const total = calculateTotal(cartSubtotal, shippingCost);

  // ---
  // Mutation — side effects handled here, not in mutation file
  // ---
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

  // ---
  // Field change handlers
  // Kept minimal — only update the relevant state slice
  // ---
  function handleGuestInfoChange(field: keyof GuestInfo, value: string) {
    setGuestInfo((prev) => ({ ...prev, [field]: value }));
  }

  function handleShippingAddressChange(
    field: keyof ShippingAddress,
    value: string,
  ) {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  }

  // ---
  // Submit handler
  // Builds payload from local state + cart items
  // Fires mutation — no direct API call
  // ---
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    placeOrder({
      guestInfo,
      shippingAddress: {
        ...shippingAddress,
        // name on shippingAddress mirrors guestInfo.name
        // backend expects full name on the address object
        name: guestInfo.name,
      },
      products: buildOrderProducts(items),
      paymentMethod: "cash_on_delivery",
    });
  }

  // ---
  // Guard render — nothing until redirect completes
  // ---
  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
            {/* Left Column — Shipping Form */}
            <div className="flex flex-col">
              <Link
                href="/shop"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to shop
              </Link>

              <h1 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">
                Shipping Information
              </h1>

              <CheckoutForm
                guestInfo={guestInfo}
                shippingAddress={shippingAddress}
                isPending={isPending}
                onGuestInfoChange={handleGuestInfoChange}
                onShippingAddressChange={handleShippingAddressChange}
              />

              {/* Submit Button — Mobile only */}
              <div className="pt-8 lg:hidden">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="h-12 w-full bg-primary text-base text-primary-foreground hover:bg-primary/90"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </Button>
              </div>
            </div>

            {/* Right Column — Order Summary (sticky desktop) */}
            <OrderSummary
              items={items}
              subtotal={cartSubtotal}
              shippingCost={shippingCost}
              total={total}
              isPending={isPending}
            />
          </div>
        </form>
      </main>
    </div>
  );
}
