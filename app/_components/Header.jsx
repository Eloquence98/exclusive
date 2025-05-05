import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle } from "@heroui/navbar";
import { Suspense } from "react";
import ActiveLink from "./ActiveLink";
import GuestArea from "./GuestArea";
import GuestAreaFallback from "./GuestAreaFallback";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavbarClientItems from "./NavbarClientItems";
import SearchBar from "./SearchBar";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Products",
    href: "/products",
  },
];

export default function Header() {
  return (
    <Navbar isBordered maxWidth="xl" position="sticky" className="h-20">
      {/* Mobile menu toggle - client component */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarClientItems>
          <NavbarMenuToggle aria-label="Menu" />
        </NavbarClientItems>
      </NavbarContent>

      {/* Brand logo - server component */}
      <NavbarContent justify="start">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      {/* Navigation links - server component with client ActiveLink */}
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navLinks.map((item) => (
          <NavbarItem key={item.name}>
            <NavbarClientItems>
              <ActiveLink href={item.href} className="text-sm">
                {item.name}
              </ActiveLink>
            </NavbarClientItems>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Search and guest area - mixed */}
      <NavbarContent justify="end">
        {/* Server-side authentication with client-side fallback */}
        <NavbarItem className="flex items-center gap-2">
          <NavbarClientItems>
            <SearchBar />
          </NavbarClientItems>
          <Suspense fallback={<GuestAreaFallback />}>
            <GuestArea />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu - client component */}
      <MobileMenu navLinks={navLinks} />
    </Navbar>
  );
}
