import Link from "next/link";
import { getProducts } from "../_lib/data-service";

async function ProductList({ section }) {
  console.log(`section inza products ${section}`);
  // use section param for specific products when use the actual API
  const products = await getProducts(section);

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
