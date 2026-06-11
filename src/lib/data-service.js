// src/lib/data-service.js
import { notFound } from "next/navigation";
import { fetchAPI } from "./api";

// Transform backend product to frontend format
function transformProduct(product) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:3000';
  
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
      ? `${API_BASE}/img/products/${product.imageCover}`
      : '/placeholder.svg',
    imageCover: product.imageCover,
    images: product.images?.length > 0
      ? product.images.map(img => `${API_BASE}/img/products/${img}`)
      : [],
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
    // For star rating
    ratings: {
      total: product.ratingsQuantity || 0,
      dislikes: Math.floor((product.ratingsQuantity || 0) * 0.1),
    },
  };
}

export async function getProducts(filters = {}) {
  try {
    let endpoint = '/products';
    const params = new URLSearchParams();

    // Add filters
    if (filters.category) {
      params.append('category', filters.category);
    }
    if (filters.onSale) {
      params.append('onSale', 'true');
    }
    if (filters.isFeatured) {
      params.append('isFeatured', 'true');
    }
    if (filters.limit) {
      params.append('limit', filters.limit);
    }
    if (filters.sort) {
      params.append('sort', filters.sort);
    }

    const queryString = params.toString();
    if (queryString) {
      endpoint += `?${queryString}`;
    }

    const data = await fetchAPI(endpoint);
    
    // Handle the nested data structure from your backend
    const products = data.data?.data || data.data || [];
    return products.map(transformProduct);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Return empty array instead of throwing to prevent page crashes
    return [];
  }
}

export async function getProductById(id) {
  try {
    const data = await fetchAPI(`/products/${id}`);
    const product = data.data?.data || data.data;
    return transformProduct(product);
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    notFound();
  }
}

export async function getProductBySlug(slug) {
  try {
    const data = await fetchAPI(`/products/${slug}`);
    const product = data.data?.data || data.data;
    return transformProduct(product);
  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error);
    notFound();
  }
}

// Featured products (isFeatured = true)
export async function getFeaturedProducts(limit = 8) {
  return getProducts({ isFeatured: true, limit });
}

// Top rated products
export async function getTopRatedProducts(limit = 5) {
  return getProducts({ sort: '-ratingsAverage', limit });
}

// Products on sale
export async function getSaleProducts(limit = 8) {
  return getProducts({ onSale: true, limit });
}

// Best selling (most reviews)
export async function getBestSellingProducts(limit = 4) {
  return getProducts({ sort: '-ratingsQuantity', limit });
}