import {
  SyncGoogleUserPayload,
  SyncGoogleUserResponse,
} from "./customer.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function syncGoogleUser(
  payload: SyncGoogleUserPayload,
): Promise<SyncGoogleUserResponse> {
  const res = await fetch(`${API_BASE_URL}/users/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.message ??
        json.error ??
        `Failed to create account: ${res.statusText}`,
    );
  }

  return json as SyncGoogleUserResponse;
}

export async function logoutUser(token: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message ?? json.error ?? "Logout failed");
  }
}
