import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/get-query-client";
import { orderTrackingOptions } from "@/src/domains/checkout/checkout.query";
import TrackOrderClient from "./track-order-client";

export default async function TrackOrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{
    email?: string;
    token?: string;
  }>;
}) {
  const { orderNumber } = await params;
  const { email, token } = await searchParams;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    orderTrackingOptions(orderNumber, { email, token }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TrackOrderClient orderNumber={orderNumber} token={token} email={email} />
    </HydrationBoundary>
  );
}
