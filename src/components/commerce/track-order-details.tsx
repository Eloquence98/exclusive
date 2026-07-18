"use client";

import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { OrderTimeline } from "@/components/account/order-timeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatShippingCost } from "@/domains/checkout/checkout.utils";
import type { OrderTracking } from "@/domains/order/order.types";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RelativeTime } from "./relative-time";

interface TrackOrderDetailsProps {
  order: OrderTracking;
  isFetching?: boolean;
  lastUpdated?: number;
}

export function TrackOrderDetails({
  order,
  isFetching = false,
  lastUpdated,
}: TrackOrderDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* ── Header ── */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Order Number
            </p>
            <h2 className="font-mono text-2xl font-semibold tracking-tight text-foreground">
              {order.orderNumber}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <OrderStatusBadge status={order.orderStatus} />
            {isFetching && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>Refreshing...</span>
              </div>
            )}
          </div>
        </div>
        {lastUpdated && !isFetching && (
          <p className="text-xs text-muted-foreground">
            Last refreshed <RelativeTime date={lastUpdated} />
          </p>
        )}
      </div>

      {/* ── Timeline ── */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="mb-6 text-sm font-semibold text-foreground">
            Order Progress
          </h3>
          <OrderTimeline
            statusHistory={order.statusHistory}
            currentStatus={order.orderStatus}
          />
        </CardContent>
      </Card>

      {/* ── Products ── */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Items</h3>
          <div className="space-y-4">
            {order.products.map((item) => (
              <div key={item.product} className="flex gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="line-clamp-1 text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
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
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{formatShippingCost(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-foreground">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Payment + Shipping ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Payment */}
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Payment
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {order.paymentMethod === "cash_on_delivery"
                  ? "Cash on Delivery"
                  : order.paymentMethod}
              </p>
              <p className="text-xs text-muted-foreground">
                Status:{" "}
                <span className="capitalize text-foreground">
                  {order.paymentStatus}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping */}
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Shipping To
            </h3>
            <div className="space-y-0.5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {order.shippingAddress.name}
              </p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && (
                <p>{order.shippingAddress.addressLine2}</p>
              )}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="pt-1 text-xs">{order.shippingAddress.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
        >
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="w-full text-muted-foreground hover:text-foreground sm:w-auto"
        >
          <Link href="/" className="flex items-center gap-2">
            Return Home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
