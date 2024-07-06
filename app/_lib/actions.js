"use server";
import { signIn, signOut } from "@/app/_lib/auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/about" });
}

export async function signOutAction() {
//   await signOut({ redirectTo: "/" });
await signOut()
}
