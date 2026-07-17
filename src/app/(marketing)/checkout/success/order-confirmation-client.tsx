"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatShippingCost } from "@/domains/checkout/checkout.utils";
import { orderConfirmationOptions } from "@/src/domains/checkout/checkout.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, MapPin, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface OrderConfirmationClientProps {
  orderNumber: string | null;
  token: string | null;
}

export function OrderConfirmationClient({
  orderNumber,
  token,
}: OrderConfirmationClientProps) {
  const { data: order } = useSuspenseQuery(
    orderConfirmationOptions(orderNumber, token),
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
        <div className="space-y-8">
          {/* ── 1. Confirmation Header ── */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Order Confirmed!
              </h1>
              <p className="text-sm text-muted-foreground">
                Hi {order.customer.name}, a confirmation has been sent to{" "}
                <span className="font-medium text-foreground">
                  {order.customer.email}
                </span>
              </p>
            </div>
            {/* Order number — prominent */}
            <div className="rounded-lg border border-border bg-muted/30 px-4 py-2">
              <span className="text-xs text-muted-foreground">
                Order Number{" "}
              </span>
              <span className="font-mono text-sm font-semibold tracking-wide text-foreground">
                {order.orderNumber}
              </span>
            </div>
          </div>

          {/* ── 2. Order Status ── */}
          <Card className="border-border bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  {order.orderStatus.charAt(0).toUpperCase() +
                    order.orderStatus.slice(1)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* ── 3. Products ── */}
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="mb-4 text-sm font-semibold text-foreground">
                Items Ordered
              </h2>
              <div className="space-y-4">
                {order.products.map((item) => (
                  <div key={item.product} className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="line-clamp-1 text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* Line total */}
                    <p className="text-sm font-medium text-foreground">
                      ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${order.totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{formatShippingCost(order.totals.shippingCost)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>${order.totals.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── 4. Payment + Shipping ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Payment */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="mb-3 text-sm font-semibold text-foreground">
                  Payment
                </h2>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {order.payment.method === "cash_on_delivery"
                      ? "Cash on Delivery"
                      : order.payment.method}
                  </p>
                  <p className="text-xs capitalize text-muted-foreground">
                    Status:{" "}
                    <span className="text-foreground">
                      {order.payment.status}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Shipping To
                </h2>
                <div className="space-y-0.5 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {order.shippingAddress.name}
                  </p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && (
                    <p>{order.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="pt-1 text-xs">{order.shippingAddress.phone}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── 5. Account Creation Prompt ── */}
          <Card className="border-border bg-background">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-left sm:flex-row">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                <UserPlus className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  Track your order
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Create an account to easily track your shipment, manage
                  returns, and save your details for next time.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="shrink-0 border-border text-foreground hover:bg-muted"
              >
                <Link href={`/signup?orderNumber=${order.orderNumber}`}>
                  Create Account
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* ── 6. Actions ── */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              <Link
                href={{
                  pathname: `/orders/track`,
                  query: {
                    orderNumber,
                    token,
                  },
                }}
              >
                Track Order
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-full text-muted-foreground hover:text-foreground sm:w-auto"
            >
              <Link href="/shop" className="flex items-center gap-2">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
