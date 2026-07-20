"use client";

import { SearchInput } from "@/components/ui/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { searchSuggestOptions } from "@/domains/search/search.query";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchAutocomplete({ className }: { className?: string }) {
  const router = useRouter();
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [pendingValue, setPendingValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(pendingValue.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [pendingValue]);

  const { data, isLoading, isFetching } = useQuery(
    searchSuggestOptions(debouncedQuery),
  );
  const suggestions = data?.suggestions ?? [];
  const showDropdown = debouncedQuery.length >= 2;

  function handleChange(value: string) {
    setPendingValue(value);
  }

  function handleSubmit(value: string) {
    if (value.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  }

  function handleClear() {
    setPendingValue("");
    setDebouncedQuery("");
  }

  return (
    <SearchInput
      className={className}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClear={handleClear}
    >
      {/* ── Dropdown — rendered inside SearchInput's expanded container ── */}
      {showDropdown && (
        <div className="border-t border-border">
          {isLoading || isFetching ? (
            <div className="space-y-1 p-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg p-2">
                  <Skeleton className="h-11 w-11 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : suggestions.length > 0 ? (
            <>
              <ul className="py-1" role="listbox">
                {suggestions.map((product) => (
                  <li key={product.id} role="option" aria-selected={false}>
                    <Link
                      href={`/product/${product.slug}`}
                      className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-muted"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                        <Image
                          src={product.imageCover}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {product.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${product.price.toFixed(2)}
                          {product.brand && (
                            <span className="ml-1">· {product.brand}</span>
                          )}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border p-2">
                <button
                  type="submit"
                  onMouseDown={(e) => e.preventDefault()}
                  className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Search className="h-3.5 w-3.5" />
                  View all results for &ldquo;{debouncedQuery}&rdquo;
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results for &ldquo;{debouncedQuery}&rdquo;
            </div>
          )}
        </div>
      )}
    </SearchInput>
  );
}
