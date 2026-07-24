import { signOut } from "@/domains/auth/auth";
import { handleSignOut } from "@/lib/actions";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";

        // 1. Backend logout + clear cookie (before Auth.js destroys session)
        await handleSignOut();

        // 2. Destroy Auth.js session and redirect
        await signOut({
          redirectTo: "/login",
        });
      }}
    >
      <button
        type="submit"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Sign out
      </button>
    </form>
  );
}
