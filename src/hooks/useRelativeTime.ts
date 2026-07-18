import { useCallback, useEffect, useState } from "react";

export const useRelativeTime = (iso: string | number | Date) => {
  const [relativeTime, setRelativeTime] = useState<string>("");

  // 1. Stabilize the calculation function with useCallback
  // This ensures the function reference only changes when 'iso' changes.
  const getRelative = useCallback(() => {
    const target = new Date(iso).getTime();
    const now = Date.now();
    const diffMs = now - target;

    // Handle future dates or invalid dates gracefully
    if (diffMs < 0) return "just now";

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) {
      return `${diffSec} sec ago`;
    }
    if (diffMin < 60) {
      return `${diffMin} min ago`;
    }
    if (diffHr < 24) {
      return `${diffHr} hr ago`;
    }
    return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  }, [iso]);

  useEffect(() => {
    // 2. Set initial value immediately on mount or iso change
    setRelativeTime(getRelative());

    // 3. Setup interval
    const intervalId = setInterval(() => {
      setRelativeTime(getRelative());
    }, 1000);

    // 4. Cleanup function to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [getRelative]); // Safe to include getRelative now as it is stable

  return relativeTime;
};
