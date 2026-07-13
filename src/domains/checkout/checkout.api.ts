import type { ApiResponse } from "@/types/api";
import type { CreateOrderPayload, CreateOrderResponse } from "./checkout.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add authorization headers here if needed, e.g.:
      // "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  // Parse JSON regardless of status to inspect error details if needed
  const json = await res.json();

  if (!res.ok) {
    // Throw error with backend message or fallback to status text
    throw new Error(
      json.message ?? json.error ?? `Failed to create order: ${res.statusText}`,
    );
  }

  return (json as ApiResponse<CreateOrderResponse>).data.data;
}
