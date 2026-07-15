"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CartItem } from "@/domains/cart/cart.types";
import type {
  CreateOrderPayload,
  GuestInfo,
  ShippingAddress,
} from "@/domains/checkout/checkout.types";
import { buildOrderProducts } from "@/domains/checkout/checkout.utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  isPending: boolean;
  onPlaceOrder: (payload: CreateOrderPayload) => void;
}

export function CheckoutForm({
  items,
  total,
  isPending,
  onPlaceOrder,
}: CheckoutFormProps) {
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

  function handleGuestInfoChange(field: keyof GuestInfo, value: string) {
    setGuestInfo((prev) => ({ ...prev, [field]: value }));
  }

  function handleShippingAddressChange(
    field: keyof ShippingAddress,
    value: string,
  ) {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onPlaceOrder({
      guestInfo,
      shippingAddress: {
        ...shippingAddress,
        // Backend expects full name on the address object
        // mirrors guestInfo.name — single source
        name: guestInfo.name,
      },
      products: buildOrderProducts(items),
      paymentMethod: "cash_on_delivery",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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

      <div className="space-y-8">
        {/* Contact */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-foreground">Contact</h2>

          <div className="space-y-2">
            <Label htmlFor="name" className="sr-only">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Full name"
              value={guestInfo.name}
              onChange={(e) => handleGuestInfoChange("name", e.target.value)}
              required
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={guestInfo.email}
              onChange={(e) => handleGuestInfoChange("email", e.target.value)}
              required
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>
        </section>

        {/* Shipping Address */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-foreground">
            Shipping Address
          </h2>

          <div className="space-y-2">
            <Label htmlFor="phone" className="sr-only">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={shippingAddress.phone}
              onChange={(e) =>
                handleShippingAddressChange("phone", e.target.value)
              }
              required
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine1" className="sr-only">
              Address
            </Label>
            <Input
              id="addressLine1"
              name="addressLine1"
              placeholder="Address line 1"
              value={shippingAddress.addressLine1}
              onChange={(e) =>
                handleShippingAddressChange("addressLine1", e.target.value)
              }
              required
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine2" className="sr-only">
              Address Line 2
            </Label>
            <Input
              id="addressLine2"
              name="addressLine2"
              placeholder="Apartment, suite, etc. (optional)"
              value={shippingAddress.addressLine2 ?? ""}
              onChange={(e) =>
                handleShippingAddressChange("addressLine2", e.target.value)
              }
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="sr-only">
                City
              </Label>
              <Input
                id="city"
                name="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) =>
                  handleShippingAddressChange("city", e.target.value)
                }
                required
                disabled={isPending}
                className="border-border bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode" className="sr-only">
                ZIP Code
              </Label>
              <Input
                id="zipCode"
                name="zipCode"
                placeholder="ZIP code"
                value={shippingAddress.zipCode}
                onChange={(e) =>
                  handleShippingAddressChange("zipCode", e.target.value)
                }
                required
                disabled={isPending}
                className="border-border bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="sr-only">
              Country
            </Label>
            <Input
              id="country"
              name="country"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={(e) =>
                handleShippingAddressChange("country", e.target.value)
              }
              required
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>
        </section>

        {/* Submit Button — Mobile only */}
        <div className="pt-4 lg:hidden">
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
    </form>
  );
}
