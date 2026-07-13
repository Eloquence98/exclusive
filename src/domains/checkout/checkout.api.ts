import type { ApiResponse } from "@/types/api";
import type { CreateOrderPayload, CreateOrderResponse } from "./checkout.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to create order: ${res.statusText}`);
  }

  const json: ApiResponse<CreateOrderResponse> = await res.json();
  return json.data.data;
}
