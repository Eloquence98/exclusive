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
