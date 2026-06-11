// src/app/(shop)/products/[productId]/page.jsx
import ProductDetails from "@/components/products/ProductDetails";
import { getProductById, getProducts } from "@/lib/data-service";

export async function generateMetadata(props) {
  const params = await props.params;
  try {
    const product = await getProductById(params.productId);
    return { title: `${product.title} | Exclusive` };
  } catch (error) {
    return { title: "Product | Exclusive" };
  }
}

export async function generateStaticParams() {
  try {
    const products = await getProducts({ limit: 10 });
    return products.map((product) => ({
      productId: String(product.id),
    }));
  } catch (error) {
    return [];
  }
}

export default async function Page(props) {
  const params = await props.params;
  const product = await getProductById(params.productId);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}