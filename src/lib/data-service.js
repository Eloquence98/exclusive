// src/lib/data-service.js
import { notFound } from "next/navigation";
import { fetchAPI } from "./api";

export async function getProducts(category) {
  try {
    let endpoint = '/products';
    
    // Add query params if category exists
    if (category) {
      endpoint += `?category=${encodeURIComponent(category)}`;
    }

    const data = await fetchAPI(endpoint);
    
    // Transform backend data to match frontend structure
    return data.data.data.map(transformProduct);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Products could not be loaded');
  }
}

export async function getProductById(id) {
  try {
    const data = await fetchAPI(`/products/${id}`);
    return transformProduct(data.data.data);
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    notFound();
  }
}

export async function getProductBySlug(slug) {
  try {
    const data = await fetchAPI(`/products/${slug}`);
    return transformProduct(data.data.data);
  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error);
    notFound();
  }
}

// Transform backend product to frontend format
function transformProduct(product) {
  return {
    id: product._id || product.id,
    title: product.title,
    name: product.title, // For ProductDetails component
    description: product.description,
    price: product.price,
    currentPrice: product.salePrice && product.onSale ? product.salePrice : product.price,
    salePrice: product.salePrice,
    onSale: product.onSale,
    discount: product.onSale && product.salePrice 
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0,
    stock: product.stock,
    image: product.imageCover 
      ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}/img/products/${product.imageCover}`
      : '/placeholder.svg',
    imageCover: product.imageCover,
    images: product.images?.map(img => 
      `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}/img/products/${img}`
    ) || [],
    category: product.category,
    size: product.size,
    brand: product.brand,
    tags: product.tags || [],
    isFeatured: product.isFeatured,
    slug: product.slug,
    rating: product.ratingsAverage || 0,
    ratingsAverage: product.ratingsAverage,
    reviewCount: product.ratingsQuantity || 0,
    ratingsQuantity: product.ratingsQuantity,
    inStock: product.stock > 0,
    // For ProductDetails component
    colors: [
      { name: "Default", class: "bg-gray-200", selectedClass: "ring-gray-400" }
    ],
    sizes: product.size ? [product.size] : ["S", "M", "L", "XL"],
    // Ratings for star component
    ratings: {
      total: product.ratingsQuantity || 0,
      dislikes: Math.floor((product.ratingsQuantity || 0) * 0.1),
    },
  };
}

// import { notFound } from "next/navigation";

// export async function getProductById(id) {
//   try {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`);

//     // For testing
//     // await new Promise((res) => setTimeout(res, 5000));

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const product = await response.json();
//     return product;
//   } catch (error) {
//     console.error(error);
//     notFound();
//   }
// }

// export async function getProducts(section) {
//   try {
//     const response = await fetch("https://fakestoreapi.com/products");

//     // await new Promise((res) => setTimeout(res, 5000));

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const products = await response.json();

//     if (!Array.isArray(products)) {
//       throw new Error("Unexpected response format - products not an array");
//     }

//     return products;
//   } catch (error) {
//     // Handle different types of errors
//     if (error instanceof TypeError && error.message === "Failed to fetch") {
//       throw new Error("Network error - could not fetch products");
//     } else {
//       throw new Error("Products could not be loaded");
//     }
//   }
// }

