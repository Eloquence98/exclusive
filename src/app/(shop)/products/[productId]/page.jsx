import ProductDetails from "@/components/products/ProductDetails";
import { getProductById, getProducts } from "@/lib/data-service";

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
  const product = await getProductById(params.productId);
  
  // Transform the API data to match our component's expected format
  const transformedProduct = {
    ...product,
    name: product.title,
    colors: [
      { name: "Default", class: "bg-gray-200", selectedClass: "ring-gray-400" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: {
      Default: product.image
    },
    rating: product.rating?.rate || 0,
    reviewCount: product.rating?.count || 0,
    inStock: true
  };

  return (
    <div>
      <ProductDetails product={transformedProduct} />
    </div>
  );
}

export default Page;
