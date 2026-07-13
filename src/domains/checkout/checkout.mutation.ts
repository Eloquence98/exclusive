import { mutationOptions } from "@tanstack/react-query";
import * as checkoutApi from "./checkout.api";
import type { CreateOrderPayload } from "./checkout.types";

/**
 * Mutation key factory for checkout domain
 * Hierarchical structure mirrors catalogKeys pattern
 *
 * Key hierarchy:
 * ['checkout']
 *   ['checkout', 'order']
 *     ['checkout', 'order', 'create']
 */
export const checkoutKeys = {
  all: ["checkout"] as const,
  order: () => [...checkoutKeys.all, "order"] as const,
  create: () => [...checkoutKeys.order(), "create"] as const,
};

/**
 * Create order mutation options
 * Guest checkout — no auth token at this stage
 *
 * Consumed by components via:
 * const { mutate, isPending } = useMutation(createOrderMutationOptions);
 *
 * Side effects (onSuccess, onError) are handled
 * in the component layer — not here.
 * This keeps the mutation definition pure and reusable.
 */
export const createOrderMutationOptions = mutationOptions({
  mutationKey: checkoutKeys.create(),
  mutationFn: (payload: CreateOrderPayload) => checkoutApi.createOrder(payload),
});
