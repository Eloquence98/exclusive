"use client";

import Button from "@/components/Button";
import LayoutPadding from "@/components/LayoutPadding";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { HiCheckCircle } from "react-icons/hi2";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  return (
    <LayoutPadding>
      <div className="mt-15 flex min-h-[60vh] flex-col items-center justify-center text-center">
        <HiCheckCircle className="mb-6 h-24 w-24 text-success-500" />
        <h1 className="mb-4 text-4xl font-bold text-foreground">
          Order Placed Successfully!
        </h1>
        <p className="mb-2 text-lg text-default-600">
          Thank you for your order
        </p>
        {orderNumber && (
          <p className="mb-8 text-default-500">
            Order Number:{" "}
            <span className="font-semibold text-primary">{orderNumber}</span>
          </p>
        )}
        <p className="mb-8 max-w-md text-default-500">
          We&apos;ve sent a confirmation email with your order details. You can
          track your order using the order number above.
        </p>
        <div className="flex gap-4">
          {orderNumber && (
            <Button
              as="link"
              href={{
                pathname: `/orders/track`,
                query: {
                  orderNumber,
                },
              }}
            >
              Track Order
            </Button>
          )}
          <Button as="link" href="/products" variant="secondary">
            Continue Shopping
          </Button>
        </div>
      </div>
    </LayoutPadding>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
