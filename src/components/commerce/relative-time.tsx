import { useRelativeTime } from "@/hooks/useRelativeTime";

// Explicitly type the props
interface RelativeTimeProps {
  date: string | number | Date;
}

// 2. The Isolated Component
export const RelativeTime = ({ date }: RelativeTimeProps) => {
  const relativeTime = useRelativeTime(date);

  // guaranteed to be a string, not void
  return <span>{relativeTime}</span>;
};
