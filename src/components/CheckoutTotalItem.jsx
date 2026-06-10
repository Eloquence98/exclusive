import { formatCurrency } from "@/utils/utility";
import Image from "next/image";

function CheckoutTotalItem({ item }) {
  const price = item.currentPrice || item.price;
  const quantity = item.quantity || 1;
  const total = price * quantity;

  return (
    <div className="on-check-out-item flex items-center justify-start gap-6">
      <div className="relative h-12 w-12 overflow-hidden rounded bg-secondary">
        <Image
          src={item.image || item.imageCover || "/placeholder.svg"}
          fill
          sizes="48px"
          className="object-contain"
          alt={`${item.title || item.name}'s Picture`}
        />
      </div>
      <p className="name flex-1">{item.title || item.name}</p>
      {quantity > 1 && (
        <p className="quantity text-sm text-default-500">×{quantity}</p>
      )}
      <p className="price">{formatCurrency(total)}</p>
    </div>
  );
}

export default CheckoutTotalItem;