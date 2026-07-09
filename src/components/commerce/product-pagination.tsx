"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  pagination: {
    page: number;
    limit: number;
    totalDocuments: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function PaginationControls({
  pagination,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { page, limit, totalDocuments, totalPages, hasNextPage, hasPrevPage } =
    pagination;

  // 1. Helper to update URL
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  // 2. Logic to generate page numbers + ellipsis
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5; // Total page buttons to show (excluding prev/next)

    if (totalPages <= maxVisible) {
      // Case: Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Case: Complex logic with ellipsis
      // Always show first page
      pages.push(1);

      // Calculate start/end of the middle range
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      // Adjust range if near start
      if (page <= 3) {
        end = Math.min(totalPages - 1, maxVisible - 1);
      }
      // Adjust range if near end
      if (page >= totalPages - 2) {
        start = Math.max(2, totalPages - (maxVisible - 2));
      }

      // Add ellipsis after '1' if needed
      if (start > 2) pages.push("ellipsis");

      // Add middle pages
      for (let i = start; i <= end; i++) pages.push(i);

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) pages.push("ellipsis");

      // Always show last page
      pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalDocuments);
  const pageNumbers = getPageNumbers();

  if (totalPages < 2) return null;

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Results Info */}
      <p className="shrink-0 text-sm text-muted-foreground">
        Showing <span className="font-semibold">{from}</span> to{" "}
        <span className="font-semibold">{to}</span> of{" "}
        <span className="font-semibold">{totalDocuments}</span> results
      </p>

      {/* Shadcn Pagination Component */}
      <Pagination className="mt-4 justify-end">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (hasPrevPage) handlePageChange(page - 1);
              }}
              className={
                hasPrevPage
                  ? "cursor-pointer"
                  : "pointer-events-none opacity-50"
              }
            />
          </PaginationItem>

          {/* Dynamic Page Numbers */}
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNum as number);
                  }}
                  isActive={pageNum === page}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (hasNextPage) handlePageChange(page + 1);
              }}
              className={
                hasNextPage
                  ? "cursor-pointer"
                  : "pointer-events-none opacity-50"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
