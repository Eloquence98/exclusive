import CartTable from "@/app/_components/CartTable";
import LayoutPadding from "../_components/LayoutPadding";

export const metadata = {
  title: "Cart",
};
function page() {
  return (
    <LayoutPadding>
      <div className="mt-15">
        <CartTable />
      </div>
    </LayoutPadding>
  );
}

export default page;
