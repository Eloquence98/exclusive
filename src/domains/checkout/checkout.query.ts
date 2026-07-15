// src/domains/checkout/checkout.query.ts

import { queryOptions } from "@tanstack/react-query";
import * as checkoutApi from "./checkout.api";
import type { OrderStatus } from "./checkout.types";

/**
 * Query key factory for checkout confirmation.
 *
 * Key hierarchy:
 * ['checkout']
 *   ['checkout', 'confirmation']
 *     ['checkout', 'confirmation', orderNumber]
 */
export const checkoutConfirmationKeys = {
  all: ["checkout"] as const,
  confirmation: () =>
    [...checkoutConfirmationKeys.all, "confirmation"] as const,
  detail: (orderNumber: string) =>
    [...checkoutConfirmationKeys.confirmation(), orderNumber] as const,
};

/**
 * Terminal order statuses.
 * Once reached, the backend invalidates the access token
 * and the confirmation endpoint returns 404.
 * Polling must stop before this happens.
 */
const TERMINAL_STATUSES: OrderStatus[] = ["delivered", "cancelled"];

/**
 * Order confirmation query options factory.
 *
 * Polling behavior:
 * - Polls every 60 seconds while order is in a non-terminal status.
 * - Stops polling when order reaches delivered or cancelled.
 * - Backend will return 404 once token is invalidated —
 *   TanStack Query will stop retrying on error automatically
 *   since retry is set to 1 in the global query client config.
 *
 * Used on the success page — server prefetched, hydrated on client.
 */
export const orderConfirmationOptions = (orderNumber: string, token: string) =>
  queryOptions({
    queryKey: checkoutConfirmationKeys.detail(orderNumber),
    queryFn: () => checkoutApi.getOrderConfirmation(orderNumber, token),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: (query) => {
      const status = query.state.data?.orderStatus;

      // Stop polling if status is terminal
      if (status && TERMINAL_STATUSES.includes(status)) {
        return false;
      }

      // Poll every 60 seconds while order is active
      return 60 * 1000;
    },
  });
