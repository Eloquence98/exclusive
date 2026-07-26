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
  { name: "Track Order", href: "/orders/track" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand Story */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="mb-4 block text-xl font-semibold tracking-tight text-foreground"
            >
              EXCLUSIVE
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Curating premium, timeless essentials designed for the modern
              lifestyle. Quality materials, exceptional craftsmanship.
            </p>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Shop
            </h3>
            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Customer Service
            </h3>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Join the Club
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Subscribe for early access to new arrivals, exclusive offers, and
              styling inspiration.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="h-11 bg-background"
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
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} EXCLUSIVE. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-xs font-medium tracking-wide text-muted-foreground"
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
