import { auth } from "@/lib/auth";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import Link from "next/link";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import UserDropdownMenu from "./UserDropdownMenu";

export default async function GuestArea() {
  // Server-side authentication check
  const session = await auth();

  return (
    <div className="flex items-center gap-4">
      <div className="cart-wishlist-icons flex items-center gap-2">
        <Link href="/wishlist" className="relative">
          <Badge
            content="0"
            color="danger"
            size="sm"
            className="hidden"
            showOutline={false}
            data-wishlist-count
          >
            <Button isIconOnly size="sm" variant="light" aria-label="Wishlist">
              <HiOutlineHeart className="text-default-500" size={20} />
            </Button>
          </Badge>
        </Link>

        <Link href="/cart" className="relative">
          <Badge
            content="0"
            color="primary"
            size="sm"
            className="hidden"
            showOutline={false}
            data-cart-count
          >
            <Button isIconOnly size="sm" variant="light" aria-label="Cart">
              <HiOutlineShoppingCart className="text-default-500" size={20} />
            </Button>
          </Badge>
        </Link>
      </div>

      <UserDropdownMenu user={session?.user} />
    </div>
  );
}
