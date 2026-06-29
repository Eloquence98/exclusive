// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   NavbarMenuToggle,
// } from "@heroui/navbar";
// import { Suspense } from "react";
// import ActiveLink from "./ActiveLink";
// import GuestArea from "./GuestArea";
// import GuestAreaFallback from "./GuestAreaFallback";
// import Logo from "./Logo";
// import MobileMenu from "./MobileMenu";
// import NavbarClientItems from "./NavbarClientItems";
// import SearchBar from "./SearchBar";

// const navLinks = [
//   {
//     name: "Home",
//     href: "/",
//   },
//   {
//     name: "Contact",
//     href: "/contact",
//   },
//   {
//     name: "About",
//     href: "/about",
//   },
//   {
//     name: "Products",
//     href: "/products",
//   },
// ];

// export default function Header() {
//   return (
//     <Navbar isBordered maxWidth="xl" position="sticky" className="h-20">
//       {/* Mobile menu toggle - client component */}
//       <NavbarContent className="sm:hidden" justify="start">
//         <NavbarClientItems>
//           <NavbarMenuToggle aria-label="Menu" />
//         </NavbarClientItems>
//       </NavbarContent>

//       {/* Brand logo - server component */}
//       <NavbarContent justify="start">
//         <NavbarBrand>
//           <Logo />
//         </NavbarBrand>
//       </NavbarContent>

//       {/* Navigation links - server component with client ActiveLink */}
//       <NavbarContent className="hidden gap-4 sm:flex" justify="center">
//         {navLinks.map((item) => (
//           <NavbarItem key={item.name}>
//             <NavbarClientItems>
//               <ActiveLink href={item.href} className="text-sm">
//                 {item.name}
//               </ActiveLink>
//             </NavbarClientItems>
//           </NavbarItem>
//         ))}
//       </NavbarContent>

//       {/* Search and guest area - mixed */}
//       <NavbarContent justify="end">
//         {/* Server-side authentication with client-side fallback */}
//         <NavbarItem className="flex items-center gap-2">
//           <NavbarClientItems>
//             <SearchBar />
//           </NavbarClientItems>
//           <Suspense fallback={<GuestAreaFallback />}>
//             <GuestArea />
//           </Suspense>
//         </NavbarItem>
//       </NavbarContent>

//       {/* Mobile menu - client component */}
//       <MobileMenu navLinks={navLinks} />
//     </Navbar>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
// import { useCart } from "@/context/cart";
import { usePathname } from "next/navigation";

export default function Header() {
  // const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const count = 2;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="bg-ink text-cream py-2 text-center text-[11px] uppercase tracking-[0.2em]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6">
          <span>Complimentary shipping on orders over $120</span>
          <span className="hidden opacity-40 md:inline">·</span>
          <span className="hidden opacity-70 md:inline">
            Free returns within 30 days
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-cream/90 border-ink/10 border-b backdrop-blur"
            : "bg-cream border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <div className="flex flex-1 items-center gap-8">
            <button
              className="-ml-2 p-2 lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
            <nav className="hidden items-center gap-8 text-sm lg:flex">
              <Link href="/shop" className="link-underline">
                Shop All
              </Link>
              <Link href="/shop?category=tshirts" className="link-underline">
                T-Shirts
              </Link>
              <Link href="/shop?category=denim" className="link-underline">
                Denim
              </Link>
              <Link href="/shop?category=activewear" className="link-underline">
                Activewear
              </Link>
            </nav>
          </div>

          <Link href="/" className="font-display text-2xl tracking-tight">
            novva
          </Link>

          <div className="flex flex-1 items-center justify-end gap-5 text-sm">
            <Link
              href="/shop"
              className="link-underline hidden sm:inline"
              aria-label="Search"
            >
              Search
            </Link>
            <Link href="/shop" className="link-underline hidden sm:inline">
              Journal
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative -mr-1 flex items-center gap-1.5 p-1"
              aria-label="Open cart"
            >
              <span className="link-underline hidden sm:inline">Bag</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
              {count > 0 && (
                <span className="bg-ink text-cream absolute -right-2 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-medium">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${
            mobileOpen ? "border-ink/10 max-h-64 border-t" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-3 px-6 py-4 text-sm">
            <Link href="/shop">Shop All</Link>
            <Link href="/shop?category=tshirts">T-Shirts</Link>
            <Link href="/shop?category=denim">Denim</Link>
            <Link href="/shop?category=activewear">Activewear</Link>
            <Link href="/shop">Journal</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
