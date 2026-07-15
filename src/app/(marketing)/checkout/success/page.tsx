import { orderConfirmationOptions } from "@/domains/checkout/checkout.query";
import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderConfirmationClient } from "./order-confirmation-client";

const defaultMetadata: Metadata = {
  title: "Order Confirmation",
  description: "Your order confirmation details.",
  robots: {
    index: false,
    follow: false,
  },
};

interface SuccessPageProps {
  searchParams: Promise<{ orderNumber?: string; token?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SuccessPageProps): Promise<Metadata> {
  const { orderNumber, token } = await searchParams;

  if (!orderNumber || !token) {
    return defaultMetadata;
  }

  try {
    const queryClient = getQueryClient();

    const order = await queryClient.fetchQuery(
      orderConfirmationOptions(orderNumber, token),
    );

    if (!order) {
      return defaultMetadata;
    }

    return {
      title: "Order Placed Successfully",
      description:
        "Your order has been placed successfully. Thank you for shopping with us.",
      robots: {
        index: false,
        follow: false,
      },
    };
  } catch {
    return defaultMetadata;
  }
}

export default async function OrderSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { orderNumber, token } = await searchParams;

  if (!orderNumber || !token) {
    notFound();
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(orderConfirmationOptions(orderNumber, token));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderConfirmationClient orderNumber={orderNumber} token={token} />
    </HydrationBoundary>
  );
}
