"use client";

import { setBackendTokenCookie } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function SyncToken() {
  const { data: session } = useSession();

  useEffect(() => {
    // Only run if we have a session and a backend token
    if (session?.user?.backendToken) {
      // Silently call the server action to set the HttpOnly cookie
      setBackendTokenCookie(session.user.backendToken);
    }
  }, [session]);

  return null; // This component renders nothing visible
}
