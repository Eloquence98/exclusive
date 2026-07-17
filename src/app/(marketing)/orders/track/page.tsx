import { orderTrackingOptions } from "@/domains/order/order.query";
import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import TrackOrderClient from "./track-order-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Track Your Order",
    description:
      "Enter your order number and email to track your shipment status.",
    robots: { index: true, follow: true }, // Safe to index the form page
  };
}

export default async function TrackOrderPage({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string;
    token?: string;
    orderNumber?: string;
  }>;
}) {
  const params = await searchParams;
  const { orderNumber, email, token } = params;

  const queryClient = getQueryClient();

  // If params are missing (Scenario 1), we skip prefetching.
  const hasCredentials = (token && orderNumber) || (email && orderNumber);

  if (hasCredentials) {
    try {
      await queryClient.prefetchQuery(
        orderTrackingOptions(orderNumber, { email, token }),
      );
    } catch (error) {
      // Optional: Handle invalid links gracefully (e.g., log error, don't crash page)
      console.error("Failed to prefetch order:", error);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TrackOrderClient orderNumber={orderNumber} token={token} email={email} />
    </HydrationBoundary>
  );
}
