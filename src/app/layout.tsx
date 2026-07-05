import "@/styles/globals.css";
import { cn } from "@/utils/utility";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "../components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ATELIER | Premium E-Commerce",
  description: "A quiet luxury shopping experience.",
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

// export const metadata: Metadata = {
//   title: {
//     template: "%s / Exclusive",
//     default: "Welcome / Exclusive",
//   },
//   description:
//     "Welcome to the official Exclusive's online store. Shop new arrivals & latest trends for men, women and juniors online.",
// };

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
        {children}
        {/* Global Toast Notifications */}
        <Toaster />
      </body>
    </html>
    // <html lang="en" className="bg-cream text-ink antialiased">
    //   {/* <body
    //     className={`${fraunces.className} mx-auto max-w-1920 bg-cream text-ink antialiased`}
    //   > */}
    //   <body
    //     className={cn(
    //       "mx-auto min-h-screen max-w-1920 bg-background font-sans antialiased",
    //       inter.variable,
    //     )}
    //   >
    //     <Providers>
    //       <Header />
    //       <main className="mb-24 min-h-[calc(100dvh-4.625rem)]">
    //         {children}
    //       </main>
    //       <Footer />
    //       <Toaster />
    //     </Providers>
    //   </body>
    // </html>
  );
}
