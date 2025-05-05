import Table from "./Table";

function CartTableRow({ item }) {
  const { image, title, price, quantity, subtotal } = item;
  return (
    <Table.Row>
      <div className="title"> {title} </div>
      <div className="price"> {price} </div>
      <div className="quantity"> {quantity} </div>
      <div className="subtotal"> {subtotal} </div>
    </Table.Row>
  );
}

export default CartTableRow;
