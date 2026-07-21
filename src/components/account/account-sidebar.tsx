"use client";

import { cn } from "@/utils/utility";
import { LogOut, Settings, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { name: "Profile", href: "/account", icon: User },
  { name: "My Orders", href: "/account/orders", icon: ShoppingBag },
  { name: "Settings", href: "/account/settings", icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // TODO: Implement logout with backend
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* User Greeting (Desktop Only) */}
      <div className="mb-8 hidden md:block">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Welcome back,
        </p>
        <h2 className="truncate text-lg font-semibold tracking-tight text-foreground">
          Customer
        </h2>
      </div>

      {/* Navigation Links */}
      {/* Mobile: Horizontal scroll. Desktop: Vertical stack */}
      <nav className="mb-8 flex gap-2 overflow-x-auto border-b border-border pb-4 scrollbar-hide md:mb-0 md:flex-col md:gap-1 md:overflow-visible md:border-b-0 md:border-r md:pb-0 md:pr-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-auto flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          {isLoggingOut ? (
            <LogOut className="h-4 w-4 shrink-0 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4 shrink-0" />
          )}
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
