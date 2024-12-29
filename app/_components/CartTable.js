"use client";
import Table from "./Table";

function CartTable() {
  return (
    <Table columns="1fr_1fr_1fr_1fr">
      <Table.Header
        tableRows={["Product", "Price", "Quantity", "Subtotal"]}
      ></Table.Header>
      <Table.Body
        data={[]}
        render={(item, i) => <div key={i} className="item"></div>}
      />
    </Table>
  );
}

export default CartTable;
