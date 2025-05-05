"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
  href,
  children,
  className = "",
  activeClassName = "text-primary font-medium",
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={`${className} ${isActive ? activeClassName : ""}`}
      href={href}
    >
      {children}
    </Link>
  );
}
