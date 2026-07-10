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

  // Helper to update URL with new page number
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Complex logic with ellipsis
      pages.push(1);

      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (page <= 3) {
        end = Math.min(totalPages - 1, maxVisible - 1);
      }
      if (page >= totalPages - 2) {
        start = Math.max(2, totalPages - (maxVisible - 2));
      }

      if (start > 2) pages.push("ellipsis");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("ellipsis");

      pages.push(totalPages);
    }
    return pages;
  };

  // Don't render if only 1 page
  if (totalPages <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalDocuments);
  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Results Info */}
      <p className="shrink-0 text-sm text-muted-foreground">
        Showing <span className="font-semibold">{from}</span> to{" "}
        <span className="font-semibold">{to}</span> of{" "}
        <span className="font-semibold">{totalDocuments}</span> results
      </p>

      {/* Shadcn Pagination Component */}
      <Pagination className="justify-end">
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
