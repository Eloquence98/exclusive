import Image from "next/image";
import { formatCurrency } from "../_utills/utility";

const listItems = [
  { name: "HTC Combat gear", image: "/controller.png", price: 230 },
  { name: "CPU & GPU Combat", image: "/controller.png", price: 2300 },
];

function ItemsOnCheckOut() {
  return (
    <div className="items-on-check-out">
      {listItems.map((item, index) => (
        <OneItemOnCheckOut key={item?.name} item={item} />
      ))}
    </div>
  );
}

export default ItemsOnCheckOut;

function OneItemOnCheckOut({ item }) {
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
