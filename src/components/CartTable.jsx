"use client";
import CartTableRow from "./CartTableRow";
import Table from "./Table";

const items = [
  {
    image: "image-url",
    title: "LCD Monitor",
    price: 650,
    quantity: 1,
    subtotal: 100,
  },
  {
    image: "image-url",
    title: "H1 Gamepad",
    price: 550,
    quantity: 1,
    subtotal: 100,
  },
];

function CartTable() {
  return (
    <Table columns="grid-cols-[1fr_1fr_1fr_1fr]">
      <Table.Header>
        <div className="product">Product</div>
        <div className="price">Price</div>
        <div className="quantity">Quantity</div>
        <div className="subtotal">Subtotal</div>
      </Table.Header>
      <Table.Body
        data={items}
        render={(item, i) => <CartTableRow item={item} key={i} />}
      />
    </Table>
  );
}

export default CartTable;
