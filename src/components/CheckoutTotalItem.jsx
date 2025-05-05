import Image from "next/image";
import { formatCurrency } from "@/utils/utility";

function CheckoutTotalItem({ item }) {
  return (
    <div
      key={item?.name}
      className="on-check-out-item flex items-center justify-start gap-6"
    >
      <Image
        className="size-12"
        src={item?.image || "/controller.png"}
        height={48}
        width={48}
        alt={`${item.name}'s Picture`}
      />
      <p className="name"> {item?.name} </p>
      <p className="price ml-auto"> {formatCurrency(item?.price) || 0} </p>
    </div>
  );
}

export default CheckoutTotalItem;
