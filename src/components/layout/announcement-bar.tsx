import { cn } from "@/utils/utility";

interface AnnouncementBarProps {
  message?: string;
  className?: string;
}

export function AnnouncementBar({
  message = "Free shipping on all orders over $100",
  className,
}: AnnouncementBarProps) {
  return (
    <div
      className={cn(
        "bg-primary px-4 py-2 text-center text-xs text-white",
        "font-medium tracking-wide",
        className,
      )}
    >
      {message}
    </div>
  );
}
