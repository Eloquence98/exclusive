"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";

export default function UserDropdownMenu({ user }) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // You'll implement actual sign out logic based on your auth system
      router.push("/api/auth/signout");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            size="sm"
            showFallback
            name="Guest"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions">
          <DropdownItem key="welcome" className="h-14 gap-2">
            <p className="font-semibold">Welcome</p>
            <p className="text-xs font-semibold text-default-500">
              Sign in to your account
            </p>
          </DropdownItem>
          <DropdownItem
            key="login"
            href="/login"
            color="primary"
            variant="flat"
          >
            Sign In
          </DropdownItem>
          <DropdownItem key="signup" href="/signup">
            Create Account
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          size="sm"
          src={user.image}
          alt={user.name}
          name={user.name || "User"}
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{user.name || "User"}</p>
          <p className="text-xs font-semibold text-default-500">
            {user.email || ""}
          </p>
        </DropdownItem>
        <DropdownItem key="account" href="/account">
          My Account
        </DropdownItem>
        <DropdownItem key="orders" href="/account?tab=orders">
          My Orders
        </DropdownItem>
        <DropdownItem key="wishlist" href="/wishlist">
          Wishlist
        </DropdownItem>
        <DropdownItem key="cart" href="/cart">
          Cart
        </DropdownItem>
        <DropdownItem key="settings" href="/account?tab=settings">
          Settings
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
