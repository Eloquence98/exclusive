"use server";
import { cookies } from "next/headers";

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
