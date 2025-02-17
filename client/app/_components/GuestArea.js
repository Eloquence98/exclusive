import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { auth } from "../_lib/auth";
const { default: Link } = require("next/link");

export default async function GuestArea({ className = "" }) {
  // this will makee the route dynamic it's reading the headers and currently the header is being used in every route so all the routes are dynamic
  const session = await auth();

  return (
    <ul
      className={`guest-area flex items-center justify-center gap-4 ${className}`}
    >
      {session?.user?.image ? (
        <>
          <li>
            <Link
              href="/wishlist"
              className="hover:text-accent-400 flex items-center gap-4 transition-colors"
            >
              <HiOutlineHeart />
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="hover:text-accent-400 flex items-center gap-4 transition-colors"
            >
              <HiOutlineShoppingCart />
            </Link>
          </li>
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 flex items-center gap-4 transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
            </Link>
          </li>
        </>
      ) : (
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>
        </li>
      )}
    </ul>
  );
}
