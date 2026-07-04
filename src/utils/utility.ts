import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to generate URL with updated page while preserving other filters
export function getPageUrl(
  searchParams: Record<string, string | string[] | undefined>,
  page: number,
) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  if (page === 1) {
    params.delete("page"); // Keep URL clean for page 1
  } else {
    params.set("page", page.toString());
  }
  return `?${params.toString()}`;
}

// Helper to generate the array of page numbers to display (with ellipses)
export function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
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
