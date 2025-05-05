import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function Logo() {
  return (
    <Link href="/" className={`${inter.className} text-2xl font-bold text-inherit`}>
      Exclusive
    </Link>
  );
}

export default Logo;
