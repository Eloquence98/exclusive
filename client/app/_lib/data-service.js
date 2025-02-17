import { notFound } from "next/navigation";

export async function getProductById(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    // For testing
    // await new Promise((res) => setTimeout(res, 5000));

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getProducts(section) {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    // await new Promise((res) => setTimeout(res, 5000));

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const products = await response.json();

    if (!Array.isArray(products)) {
      throw new Error("Unexpected response format - products not an array");
    }

    return products;
  } catch (error) {
    // Handle different types of errors
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network error - could not fetch products");
    } else {
      throw new Error("Products could not be loaded");
    }
  }
}
