import type { ApiResponse } from "@/types/api";
import type {
  CreateOrderPayload,
  CreateOrderResponse,
  OrderConfirmation,
} from "./checkout.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message ?? json.error ?? `Failed to create order: ${res.statusText}`,
    );
  }

  return (json as ApiResponse<CreateOrderResponse>).data;
}

/**
 * Fetches order confirmation data for the success page.
 * GET /api/v1/orders/:orderNumber/confirmation?token=:token
 *
 * Token is the plain access token issued at order creation.
 * Backend compares it against the stored hash.
 * Returns 404 when the token is invalidated (order lifecycle ended).
 */
export async function getOrderConfirmation(
  orderNumber: string,
  token: string,
): Promise<OrderConfirmation> {
  const res = await fetch(
    `${API_BASE_URL}/orders/${orderNumber}/confirmation?token=${token}`,
    { cache: "no-store" },
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message ??
        json.error ??
        `Order confirmation not available: ${res.statusText}`,
    );
  }

  return (json as ApiResponse<OrderConfirmation>).data;
}
