import "@/app/_styles/globals.css";
import { Poppins } from "next/font/google";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { Providers } from "./Providers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    template: "%s / Exclusive",
    default: "Welcome / Exclusive",
  },
  description:
    "Welcome to the official Exclusive's online store. Shop new arrivals & latest trends for men, women and juniors online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} mx-auto max-w-8xl bg-white`}>
        <Providers>
          <Header />
          <main className="mb-24 min-h-[calc(100dvh-4.625rem)]">
            {children}
          </main>
          <Footer />
        </Providers>
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
