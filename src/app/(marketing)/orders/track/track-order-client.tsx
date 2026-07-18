"use client";

import { TrackOrderDetails } from "@/components/commerce/track-order-details";
import { TrackOrderLookupForm } from "@/components/commerce/track-order-lookup-form";
import { TrackOrderSkeleton } from "@/components/commerce/track-order-skeleton";
import { orderTrackingOptions } from "@/domains/order/order.query";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";

interface TrackOrderClientProps {
  orderNumber?: string;
  token?: string;
  email?: string;
}

export default function TrackOrderClient({
  orderNumber: urlOrderNumber,
  token: urlToken,
  email: urlEmail,
}: TrackOrderClientProps) {
  // Scenario B: Manual lookup state
  const [lookupCredentials, setLookupCredentials] = useState<{
    orderNumber: string;
    email: string;
  } | null>(null);

  // URL params (Scenario A) take priority over form state (Scenario B)
  const resolvedOrderNumber = urlOrderNumber ?? lookupCredentials?.orderNumber;
  const resolvedToken = urlToken;
  const resolvedEmail = urlEmail ?? lookupCredentials?.email;

  const hasCredentials = Boolean(
    resolvedOrderNumber && (resolvedToken || resolvedEmail),
  );

  // Query
  const {
    data: order,
    isLoading,
    isFetching,
    isError,
    error,
    dataUpdatedAt,
  } = useQuery({
    ...orderTrackingOptions(resolvedOrderNumber ?? "", {
      token: resolvedToken,
      email: resolvedEmail,
    }),
    enabled: hasCredentials,
    refetchInterval: (query) => {
      const status = query.state.data?.orderStatus;
      // Poll every 60s if order is active
      if (status && ["processing", "confirmed", "shipped"].includes(status)) {
        return 60 * 1000;
      }
      return false;
    },
  });

  // ---
  const errorMessage = isError
    ? error instanceof Error
      ? error.message
      : "Order not found. Please check your order number and email."
    : null;

  // Scenario detection
  const isScenarioA = Boolean(urlOrderNumber && (urlToken || urlEmail));

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="space-y-8">
          <TrackOrderLookupForm
            initialOrderNumber={resolvedOrderNumber}
            initialEmail={resolvedEmail}
            onSubmit={(values) => setLookupCredentials(values)}
            isLoading={isLoading}
            error={errorMessage}
          />

          {hasCredentials && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isLoading ? (
                <TrackOrderSkeleton />
              ) : order ? (
                <TrackOrderDetails
                  order={order}
                  isFetching={isFetching}
                  lastUpdated={dataUpdatedAt}
                />
              ) : null}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
