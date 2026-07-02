"use client";

import { cn } from "@/utils/utility";
import { Search, X } from "lucide-react";
import * as React from "react";
import { Input } from "./input";

interface SearchInputProps {
  className?: string;
}

export function SearchInput({ className }: SearchInputProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setIsExpanded(true);
    // Small delay to ensure the DOM has updated before focusing
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCollapse = () => {
    if (!query) {
      setIsExpanded(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Future implementation: router.push(`/shop?search=${encodeURIComponent(query)}`)
    console.log("Searching for:", query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex items-center", className)}
      role="search"
    >
      {/* Search Icon / Toggle Button */}
      {!isExpanded && (
        <button
          type="button"
          onClick={handleExpand}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Open search"
        >
          <Search className="h-5 w-5" />
        </button>
      )}

      {/* Expanding Input Container */}
      <div
        className={cn(
          "absolute right-0 flex items-center overflow-hidden rounded-lg border bg-white transition-all duration-300 ease-in-out",
          isExpanded
            ? "w-64 border-zinc-200 shadow-sm"
            : "w-0 border-transparent",
        )}
      >
        <div className="relative flex flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-zinc-400" />
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleCollapse}
            placeholder="Search products..."
            className="h-10 w-full border-0 bg-transparent pl-9 pr-9 focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Search products"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
