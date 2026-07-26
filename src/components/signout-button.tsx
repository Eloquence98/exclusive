// components/signout-button.tsx (updated)
import { signOut } from "@/domains/auth/auth";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <span>Sign out</span>
      </button>
    </form>
  );
}
