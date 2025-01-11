import { getTotalPrice } from "../_utills/utility";
import CartCheckoutStats from "./CartCheckoutStats";
import CheckoutForm from "./CheckoutForm";
import CheckoutTotalItem from "./CheckoutTotalItem";

function CheckoutTotal({ checkOutItems = [] }) {
  const subTotal = getTotalPrice(checkOutItems || []);
  const stats = { subTotal, shipping: 0 };

  return (
    <div className="items-on-check-out space-y-8">
      {checkOutItems.map(
        ({ name = "Unknown Item", image = "", price = 0 }, index) => (
          <CheckoutTotalItem key={name} item={{ name, image, price }} />
        ),
      )}
      <CartCheckoutStats stats={stats} />
      <CheckoutForm />
    </div>
  );
}

export default CheckoutTotal;
