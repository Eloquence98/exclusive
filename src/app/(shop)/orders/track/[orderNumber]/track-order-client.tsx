"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { orderTrackingOptions } from "@/src/domains/checkout/checkout.query";

export default function TrackOrderClient({
  orderNumber,
  token,
  email,
}: {
  orderNumber: string;
  token?: string;
  email?: string;
}) {
  const { data } = useSuspenseQuery(
    orderTrackingOptions(orderNumber, {
      token,
      email,
    }),
  );

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
