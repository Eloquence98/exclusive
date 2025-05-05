"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass, HiXMark, HiClock, HiTag } from "react-icons/hi2";

// Quick search suggestions for fashion
const FASHION_SUGGESTIONS = ["Dresses", "Tops", "Jeans", "Summer", "Sale", "New Arrivals"];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 3));
      } catch (e) {
        console.error("Failed to parse recent searches");
      }
    }
  }, []);

  // Focus input when popover opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const saveRecentSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const updated = [trimmed, ...recentSearches.filter((item) => item !== trimmed)].slice(0, 3);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      // Handle search submission - redirect to search page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    saveRecentSearch(suggestion);
    window.location.href = `/search?q=${encodeURIComponent(suggestion)}`;
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom">
      <PopoverTrigger>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          aria-label="Search"
          className="text-default-500"
        >
          <HiMagnifyingGlass className="text-default-500" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 overflow-hidden rounded-lg border border-default-200 p-0 shadow-md">
        <div className="bg-background">
          <form onSubmit={handleSubmit} className="w-full">
            <Input
              ref={inputRef}
              classNames={{
                base: "w-full",
                inputWrapper:
                  "h-12 bg-default-50 shadow-none rounded-none border-b border-default-100",
              }}
              placeholder="Search for clothes, accessories..."
              size="sm"
              startContent={
                <HiMagnifyingGlass
                  className="pointer-events-none flex-shrink-0 text-default-400"
                  size={18}
                />
              }
              endContent={
                searchQuery && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={handleClear}
                    className="p-0"
                  >
                    <HiXMark className="text-default-400" size={18} />
                  </Button>
                )
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsOpen(false);
                }
              }}
              type="search"
              aria-label="Search"
            />
          </form>

          {/* Suggestions section with motion animation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4"
          >
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="mb-3 flex items-center gap-1.5">
                  <HiClock className="text-default-400" size={16} />
                  <p className="text-xs font-medium text-default-600">Recent Searches</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <div
                      key={i}
                      onClick={() => handleSuggestionClick(term)}
                      className="flex cursor-pointer items-center rounded-full bg-default-100 px-3 py-1.5 text-xs font-medium text-default-700 transition-colors hover:bg-default-200"
                    >
                      {term}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="mb-3 flex items-center gap-1.5">
                <HiTag className="text-primary-400" size={16} />
                <p className="text-xs font-medium text-default-600">Popular Categories</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FASHION_SUGGESTIONS.map((suggestion, i) => (
                  <div
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex cursor-pointer items-center rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-500 transition-colors hover:bg-primary-100"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
