"use client";

import { cn } from "@/utils/utility";
import { useEffect, useState } from "react";

const messages = [
  "Free shipping on all orders over $100",
  "New arrivals every week — shop the latest drops",
  "Easy 30-day returns, no questions asked",
  "Pay on delivery — no card required at checkout",
];

export function AnnouncementBar({ className }: { className?: string }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length);
        // Fade in
        setVisible(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "bg-primary px-4 py-2 text-center text-xs font-medium tracking-wide text-primary-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "duration-400 inline-block transition-opacity",
          visible ? "opacity-100" : "opacity-0",
        )}
      >
        {messages[current]}
      </span>
    </div>
  );
}
