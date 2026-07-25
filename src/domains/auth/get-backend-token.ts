import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

const AUTH_SECRET = process.env.AUTH_SECRET;

if (!AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not defined in environment variables");
}

export async function getBackendToken(): Promise<string | null> {
  const cookieStore = await cookies();

  // Auth.js v5 uses different cookie names based on environment
  // In production (HTTPS), it prefixes with __Secure-
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

  const sessionToken = cookieStore.get(cookieName)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const payload = await decode({
      token: sessionToken,
      secret: AUTH_SECRET,
      salt: cookieName,
    });

    // Ensure the token exists and hasn't expired
    if (!payload || !payload.backendToken) {
      return null;
    }

    return payload.backendToken as string;
  } catch (error) {
    console.error("Failed to decode backend token:", error);
    return null;
  }
}
