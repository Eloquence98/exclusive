"use client";
import { useCart } from "@/hooks/CartProvider";
import { formatCurrency } from "@/utils/utility";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Image from "next/image";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi2";
import Table from "./Table";

function CartTableRow({ item }) {
  const { image, title, price, quantity = 1, id } = item;
  const subtotal = price * quantity;
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <Table.Row>
      <div className="product flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-secondary">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="80px"
            className="object-contain"
            priority
          />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <button
            onClick={() => removeFromCart(id)}
            className="mt-1 flex items-center text-sm text-danger hover:text-danger-400"
          >
            <HiTrash className="mr-1 h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
      <div className="price">{formatCurrency(price)}</div>
      <div className="quantity flex items-center">
        <Button
          size="sm"
          isIconOnly
          variant="bordered"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <HiMinus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="mx-2 w-16 text-center"
          min="1"
        />
        <Button
          size="sm"
          isIconOnly
          variant="bordered"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <HiPlus className="h-4 w-4" />
        </Button>
      </div>
      <div className="subtotal font-medium text-primary">
        {formatCurrency(subtotal)}
      </div>
    </Table.Row>
  );
}

export default CartTableRow;
