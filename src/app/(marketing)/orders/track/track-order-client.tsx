"use client";

import { orderTrackingOptions } from "@/src/domains/order/order.query";
import { useQuery } from "@tanstack/react-query";

export default function TrackOrderClient({
  orderNumber,
  token,
  email,
}: {
  orderNumber?: string;
  token?: string;
  email?: string;
}) {
  const hasCredentials = Boolean(
    (token && orderNumber) || (email && orderNumber),
  );

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    ...orderTrackingOptions(orderNumber, { email, token }),
    enabled: hasCredentials,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <h1>Track</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
