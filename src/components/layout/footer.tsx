import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const shopLinks = [
  { name: "New Arrivals", href: "/shop?sort=newest" },
  { name: "Best Sellers", href: "/shop?sort=top-rated" },
  { name: "Sale", href: "/shop?sale=true" },
  { name: "Collections", href: "/shop" },
];

const supportLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "FAQs", href: "/faqs" },
  { name: "Shipping & Returns", href: "/shipping" },
  { name: "Track Order", href: "/account/orders" },
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal"];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand Story */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="mb-4 block text-xl font-semibold tracking-tight text-zinc-950"
            >
              ATELIER
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-zinc-600">
              Curating premium, timeless essentials designed for the modern
              lifestyle. Quality materials, exceptional craftsmanship.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Shop
            </h3>
            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Customer Service
            </h3>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Join the Club
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600">
              Subscribe for early access to new arrivals, exclusive offers, and
              styling inspiration.
            </p>
            {/* <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}> */}
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="h-11 bg-white"
                aria-label="Email address for newsletter"
              />
              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 shrink-0"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-zinc-200 pt-8 md:flex-row">
          <p className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} ATELIER. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-xs font-medium tracking-wide text-zinc-400"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
