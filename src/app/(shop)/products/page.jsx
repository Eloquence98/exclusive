import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Products",
};

async function Page(props) {
  const searchParams = await props.searchParams;
  const section = searchParams?.section ?? "explore our products";

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
