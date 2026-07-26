import { queryOptions } from "@tanstack/react-query";
import * as orderApi from "./order.api";
import { MyOrdersParams, OrderStatus } from "./order.types";

/**
 * Query key factory for order domain.
 *
 * Key hierarchy:
 * ['order']
 *   ['order', 'confirmation', orderNumber]
 *   ['order', 'tracking', orderNumber]
 */
export const orderKeys = {
  all: ["order"] as const,

  confirmation: (orderNumber: string) =>
    [...orderKeys.all, "confirmation", orderNumber] as const,

  tracking: (orderNumber: string) =>
    [...orderKeys.all, "tracking", orderNumber] as const,

  myOrders: (params: MyOrdersParams) =>
    [...orderKeys.all, "my-orders", params] as const,
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
    queryKey: orderKeys.confirmation(orderNumber),

    queryFn: () => orderApi.getOrderConfirmation(orderNumber, token),

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
 */
export const orderTrackingOptions = (
  orderNumber: string,
  options: {
    token?: string;
    email?: string;
  },
) =>
  queryOptions({
    queryKey: orderKeys.tracking(orderNumber),

    queryFn: () => orderApi.getOrderTracking(orderNumber, options),

    staleTime: 30 * 1000,
  });

/**
 * Authenticated user's order history query options.
 * Routed through /api/proxy — requires active Auth.js session.
 */
export const myOrdersOptions = (params: MyOrdersParams = {}) =>
  queryOptions({
    queryKey: orderKeys.myOrders(params),

    queryFn: () => orderApi.getMyOrders(params),

    staleTime: 30 * 1000,
  });
