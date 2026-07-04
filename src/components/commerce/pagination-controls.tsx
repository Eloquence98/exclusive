"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageUrl, getPaginationRange } from "@/src/utils/utility";
import Link from "next/link";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
}

export function PaginationControls({
  currentPage,
  totalPages,
  searchParams,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const pages = getPaginationRange(currentPage, totalPages);
  const prevPageUrl = getPageUrl(searchParams, currentPage - 1);
  const nextPageUrl = getPageUrl(searchParams, currentPage + 1);

  return (
    <div className="mt-16">
      {/* Desktop: Numbered Pagination */}
      <Pagination className="hidden md:flex">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? prevPageUrl : "#"}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={getPageUrl(searchParams, page as number)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={currentPage < totalPages ? nextPageUrl : "#"}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Mobile: Load More Button */}
      <div className="flex justify-center md:hidden">
        {currentPage < totalPages ? (
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full max-w-xs border-border text-foreground hover:bg-muted"
          >
            <Link href={nextPageUrl}>Load More Products</Link>
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            You&apos;ve reached the end.
          </p>
        )}
      </div>
    </div>
  );
}
