import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { cn } from "@/utils/utility";
import { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import React from "react";
import { Providers } from "./Providers";

// Blueprint: Typography Scale (Geist or Inter Font)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s / Exclusive",
    default: "Welcome / Exclusive",
  },
  description:
    "Welcome to the official Exclusive's online store. Shop new arrivals & latest trends for men, women and juniors online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-cream text-ink antialiased">
      {/* <body
        className={`${fraunces.className} mx-auto max-w-1920 bg-cream text-ink antialiased`}
      > */}
      <body
        className={cn(
          "mx-auto min-h-screen max-w-1920 bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <Providers>
          <Header />
          <main className="mb-24 min-h-[calc(100dvh-4.625rem)]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
