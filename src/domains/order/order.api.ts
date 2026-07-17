import { ApiResponse } from "@/src/types/api";
import { OrderConfirmation, OrderTracking } from "./order.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

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

/**
 * Fetches order tracking data for the tracking page.
 * GET /api/v1/orders/:orderNumber/tracking?token=:token
 * GET /api/v1/orders/:orderNumber/tracking?email=:email
 *
 * Authentication is handled using either:
 * - plain access token issued during order creation
 * - customer email as fallback verification
 *
 * Backend validates orderNumber format:
 * EXC-YYYYMMDD-NNNN
 */
export async function getOrderTracking(
  orderNumber: string,
  options: {
    token?: string;
    email?: string;
  },
): Promise<OrderTracking> {
  const { token, email } = options;

  const url = new URL(`${API_BASE_URL}/orders/${orderNumber}/tracking`);

  if (token) {
    url.searchParams.set("token", token);
  } else if (email) {
    url.searchParams.set("email", email);
  } else {
    throw new Error("Either token or email is required to track order");
  }

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message ??
        json.error ??
        `Order tracking not available: ${res.statusText}`,
    );
  }

  return (json as ApiResponse<OrderTracking>).data;
}
