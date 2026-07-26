"use client";

import { cn } from "@/utils/utility";
import { Search, X } from "lucide-react";
import * as React from "react";
import { Input } from "./input";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  children?: React.ReactNode;
  /**
   * When true, renders as a static, always-expanded inline search bar
   * (no collapse/expand behavior). Used in contexts like the mobile
   * drawer where an absolutely-positioned overlay doesn't fit.
   */
  alwaysExpanded?: boolean;
}

export function SearchInput({
  className,
  placeholder = "Search products...",
  onChange,
  onSubmit,
  onClear,
  children,
  alwaysExpanded = false,
}: SearchInputProps) {
  const [isExpanded, setIsExpanded] = React.useState(alwaysExpanded);
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    if (alwaysExpanded) return;
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCollapse = React.useCallback(() => {
    if (alwaysExpanded) return;
    if (!query) {
      setIsExpanded(false);
    }
  }, [query, alwaysExpanded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onChange?.(value);
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(query);
  };

  React.useEffect(() => {
    if (alwaysExpanded) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleCollapse();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleCollapse, alwaysExpanded]);

  // Always-expanded variant — static inline search bar, no overlay
  if (alwaysExpanded) {
    return (
      <div ref={containerRef} className={cn("w-full", className)}>
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-center rounded-lg border border-border bg-background">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              value={query}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="h-11 w-full border-0 bg-transparent pl-9 pr-9 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={placeholder}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
                className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-muted hover:text-zinc-900"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {children}
        </form>
      </div>
    );
  }

  // Default variant — collapsed icon that expands into an overlay
  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center", className)}
    >
      {!isExpanded && (
        <button
          type="button"
          onClick={handleExpand}
          className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-muted hover:text-zinc-900"
          aria-label="Open search"
        >
          <Search className="h-5 w-5" />
        </button>
      )}

      <div
        className={cn(
          "absolute right-0 top-0 overflow-hidden rounded-lg border bg-background transition-all duration-300 ease-in-out",
          isExpanded
            ? "w-80 border-border shadow-md"
            : "w-0 border-none shadow-none",
        )}
      >
        {isExpanded && (
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                value={query}
                onChange={handleInputChange}
                onBlur={handleCollapse}
                placeholder={placeholder}
                className="h-10 w-full border-0 bg-transparent pl-9 pr-9 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label={placeholder}
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClear}
                  className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-muted hover:text-zinc-900"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {children}
          </form>
        )}
      </div>
    </div>
  );
}
