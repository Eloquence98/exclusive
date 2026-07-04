import { OrderStatusBadge } from "@/components/account/order-status-badge";
import { OrderTimeline } from "@/components/account/order-timeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderById } from "@/lib/api";
import { ArrowLeft, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/account/orders" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        </Button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground">
              Order {order.id}
              <OrderStatusBadge status={order.status} />
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Placed on{" "}
              {new Date(order.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Tracking & Shipping (2/3 width on desktop) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Tracking Timeline Card */}
          <Card className="border-border bg-background">
            <CardHeader>
              <CardTitle className="text-base font-medium text-foreground">
                Tracking Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline steps={order.timeline} />
            </CardContent>
          </Card>

          {/* Order Items Card */}
          <Card className="border-border bg-background">
            <CardHeader>
              <CardTitle className="text-base font-medium text-foreground">
                Items Ordered
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 border-b border-border pb-6 last:border-0 last:pb-0"
                >
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {item.brand}
                      </p>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {item.name}
                      </Link>
                      {item.size && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        $
                        {(
                          (item.salePrice || item.price) * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Totals */}
              <div className="flex justify-end pt-2">
                <div className="w-full space-y-2 text-sm sm:w-1/2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${(order.total - 15).toFixed(2)}</span>{" "}
                    {/* Mocking subtotal */}
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Shipping Info (1/3 width on desktop) */}
        <div className="space-y-8">
          <Card className="border-border bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium text-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zip}
              </p>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="border-border bg-muted/30">
            <CardContent className="space-y-3 p-6">
              <h3 className="text-sm font-semibold text-foreground">
                Need Help?
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                If you have any questions about your order, our customer service
                team is here to assist you.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-border text-foreground hover:bg-background"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
