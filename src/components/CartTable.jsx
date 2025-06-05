"use client";
import { useCart } from "@/hooks/CartProvider";
import CartTableRow from "./CartTableRow";
import EmptyState from "./EmptyState";
import Table from "./Table";

function CartTable() {
  const { cart } = useCart();

  if (!cart || cart.length === 0) {
    return <EmptyState type="cart" />;
  }

  return (
    <Table columns="grid-cols-[1fr_1fr_1fr_1fr]">
      <Table.Header>
        <div className="product">Product</div>
        <div className="price">Price</div>
        <div className="quantity">Quantity</div>
        <div className="subtotal">Subtotal</div>
      </Table.Header>
      <Table.Body
        data={cart}
        render={(item) => <CartTableRow key={item.id} item={item} />}
      />
    </Table>
  );
}

export default CartTable;
