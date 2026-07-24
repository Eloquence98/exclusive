"use server";
import { cookies } from "next/headers";
import { logoutUser } from "@/domains/customer/customer.api";

export async function setBackendTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // Adjust to match your backend's JWT_COOKIE_EXPIRES_IN
  });
}

export async function clearBackendTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
}

export async function handleSignOut() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  // Best-effort backend logout — invalidate the backend session
  if (token) {
    try {
      await logoutUser(token);
    } catch {
      // Swallow error — local cleanup happens regardless
    }
  }

  // Clear the HttpOnly cookie
  cookieStore.delete("jwt");
}
