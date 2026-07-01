import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(price: number) {
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formater.format(price);
}

export function getTotalPrice(arrayToReduce = []) {
  const totalPrice = arrayToReduce.reduce((acc, cur) => {
    return acc + cur?.price || 0;
  }, 0);

  return totalPrice;
}

export function formatPrice(price: number) {
  const n = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);
}

export function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export function starRating(rating: number) {
  return Math.round(rating * 2) / 2; // round to nearest half
}
