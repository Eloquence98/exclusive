import { SignOut } from "@/components/signout-button";
import type { Session } from "next-auth";
import { AccountNavLinks } from "./account-nav-links";

interface AccountSidebarProps {
  user: Session["user"];
}

export function AccountSidebar({ user }: AccountSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 hidden md:block">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Welcome back,
        </p>
        <h2 className="truncate text-lg font-semibold tracking-tight text-foreground">
          {user.name ?? "Customer"}
        </h2>
      </div>

      <div className="scrollbar-hide mb-8 flex gap-2 overflow-x-auto border-b border-border pb-4 md:mb-0 md:flex-col md:gap-1 md:overflow-visible md:border-b-0 md:border-r md:pb-0 md:pr-8">
        <AccountNavLinks />

        <div className="md:mt-auto">
          <SignOut />
        </div>
      </div>
    </div>
  );
}
