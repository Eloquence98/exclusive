export { auth as middleware } from "@/domains/auth/auth";

export const config = {
  matcher: ["/me/:path*", "/login"],
};
