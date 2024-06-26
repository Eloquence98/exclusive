import { Poppins } from "next/font/google";
import Header from "./_components/Header";
import "@/app/_styles/globals.css";

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
      <body className={`${poppins.className} max-w-8xl mx-auto bg-white`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
