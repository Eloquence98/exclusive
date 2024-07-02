import Link from "next/link";
import { getProducts } from "../_lib/data-service";

async function ProductList() {
  const products = await getProducts();

  if (!products.length) return null;
  return (
    <div>
      {" "}
      {products.map((product) => (
        <div key={product.id} className="product">
          <p>ID: {product.id} </p>
          <p>Name: {product.title} </p>
          <Link href={`/products/${product.id}`}>Details</Link>
        </div>
      ))}{" "}
    </div>
  );
}

export default ProductList;
