import CartCheckoutStats from "./CartCheckoutStats";
import CheckoutForm from "./CheckoutForm";
import CheckoutTotalItem from "./CheckoutTotalItem";

function CheckoutTotal({ checkOutItems = [], shippingAddress }) {
  const subTotal = checkOutItems.reduce((total, item) => {
    const price = item.currentPrice || item.price;
    return total + price * (item.quantity || 1);
  }, 0);

  const stats = { subTotal, shipping: 0 };

  return (
    <div className="items-on-check-out space-y-8 lg:ml-auto lg:max-w-[32.5rem]">
      <h4 className="text-xl font-medium text-black">Order Summary</h4>
      
      {checkOutItems.map((item) => (
        <CheckoutTotalItem key={item.id} item={item} />
      ))}
      
      <CartCheckoutStats stats={stats} />
      <CheckoutForm shippingAddress={shippingAddress} />
    </div>
  );
}

export default CheckoutTotal;