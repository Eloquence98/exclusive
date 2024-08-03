import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import ProductList from "../_components/ProductList";

export const metadata = {
  title: "Products",
};

function Page({ searchParams }) {
  const section = searchParams?.section ?? "explore our products";
  console.log(`Section inza page ${section}`);

  return (
    <div>
      <h1 className="mb-12 text-center text-8xl text-primary">Products</h1>
      <Suspense fallback={<Spinner />}>
        <ProductList section={section} />
      </Suspense>
    </div>
  );
}

export default Page;
