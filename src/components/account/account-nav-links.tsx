"use client";

import { cn } from "@/utils/utility";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Profile", href: "/me", icon: User },
  { name: "My Orders", href: "/me/orders", icon: ShoppingBag },
];

export function AccountNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="scrollbar-hide flex gap-2 overflow-x-auto md:flex-col md:gap-1 md:overflow-visible">
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
    </nav>
  );
}
