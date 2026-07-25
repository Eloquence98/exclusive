import "@/styles/globals.css";
import { cn } from "@/utils/utility";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "../components/ui/sonner";
import { Providers } from "./Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s / ATELIER",
    default: "Welcome / ATELIER",
  },
  description:
    "Welcome to the official ATELIER's online store. Shop new arrivals & latest trends for men, women and juniors online.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility, but prevent accidental double-tap zoom
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
