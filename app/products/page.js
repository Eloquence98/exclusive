import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import ProductList from "../_components/ProductList";

export const metadata = {
  title: "Products",
};

function page() {
  return (
    <div>
      <h1 className="mb-12 text-center text-8xl text-primary">Products</h1>
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </div>
  );
}

export default page;
