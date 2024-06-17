import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function Logo() {
  return (
    <Link
      href="/"
      className={`${inter.className} font-bold  text-2xl text-black`}
    >
      Exclusive
    </Link>
  );
}

export default Logo;
