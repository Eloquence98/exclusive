import { Button } from "@heroui/button";
import Link from "next/link";

export default function EmptyState({ type = "cart" }) {
  const config = {
    cart: {
      title: "Your cart is empty",
      description: "Looks like you haven't added anything to your cart yet.",
      buttonText: "Continue Shopping",
      image: "/empty-cart.png"
    },
    wishlist: {
      title: "Your wishlist is empty",
      description: "Looks like you haven't added anything to your wishlist yet.",
      buttonText: "Explore Products",
      image: "/empty-wishlist.png"
    }
  };

  const { title, description, buttonText, image } = config[type];

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="mb-2 text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mb-8 text-default-500">{description}</p>
      <Link href="/products">
        <Button color="primary" size="lg">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
} 