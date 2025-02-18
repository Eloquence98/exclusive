import ProductDetails from "@/app/_components/ProductDetails";
import { getProductById, getProducts } from "@/app/_lib/data-service";
import { mockProduct } from "@/app/_lib/tempData";

//  dynamic metadeta for dynamic routes
export async function generateMetadata(props) {
  const params = await props.params;
  const { title } = await getProductById(params.productId);
  return { title: `Product ${title}` };
}

// Static route generation for dynamic routes
export async function generateStaticParams() {
  const products = await getProducts();
  const ids = products.map((product) => ({ productId: String(product.id) }));
  return ids;
}

async function Page(props) {
  const params = await props.params;
  // Todo Get Product
  const product = await getProductById(params.productId);

  return (
    <div>
      <ProductDetails product={mockProduct} />
    </div>
  );
}

export default Page;
