import { formatCurrency } from "../_utills/utility";

function CartCheckoutStats({ className = "", stats = {} }) {
  const { subTotal = 1750, shipping = 0 } = stats;
  const total = subTotal + shipping;

  return (
    <div className={`${className} divide-y-[1px] divide-discount`}>
      <p className="py-4">
        Subtotal <span className="float-right">{formatCurrency(subTotal)}</span>
      </p>
      <p className="py-4">
        Shipping{" "}
        <span className="float-right">
          {shipping === 0 ? "Free" : formatCurrency(shipping)}
        </span>
      </p>
      <p className="py-4">
        Total <span className="float-right">{formatCurrency(total)}</span>
      </p>
    </div>
  );
}

export default CartCheckoutStats;
