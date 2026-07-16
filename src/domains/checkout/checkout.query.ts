import { queryOptions } from "@tanstack/react-query";
import * as checkoutApi from "./checkout.api";
import type { OrderStatus } from "./checkout.types";

/**
 * Query key factory for checkout domain.
 *
 * Key hierarchy:
 * ['checkout']
 *   ['checkout', 'confirmation', orderNumber]
 *   ['checkout', 'tracking', orderNumber]
 */
export const checkoutKeys = {
  all: ["checkout"] as const,
  confirmation: (orderNumber: string) =>
    [...checkoutKeys.all, "confirmation", orderNumber] as const,
  tracking: (orderNumber: string) =>
    [...checkoutKeys.all, "tracking", orderNumber] as const,
};

/**
 * Terminal order statuses.
 * Once reached, polling stops because no more status changes are expected.
 */
const TERMINAL_STATUSES: OrderStatus[] = ["delivered", "cancelled"];

/**
 * Order confirmation query options.
 * Polls until order reaches a terminal status.
 */
export const orderConfirmationOptions = (orderNumber: string, token: string) =>
  queryOptions({
    queryKey: checkoutKeys.confirmation(orderNumber),
    queryFn: () => checkoutApi.getOrderConfirmation(orderNumber, token),
    staleTime: 30 * 1000,
    refetchInterval: (query) => {
      const status = query.state.data?.orderStatus;
      if (status && TERMINAL_STATUSES.includes(status)) {
        return false;
      }

      return 60 * 1000;
    },
  });

/**
 * Order tracking query options.
 *
 */
export const orderTrackingOptions = (
  orderNumber: string,
  options: {
    token?: string;
    email?: string;
  },
) =>
  queryOptions({
    queryKey: checkoutKeys.tracking(orderNumber),
    queryFn: () => checkoutApi.getOrderTracking(orderNumber, options),
    staleTime: 30 * 1000,
  });
