import { cn } from "@/utils/utility";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export function SectionHeader({
  overline,
  title,
  actionHref,
  actionLabel = "View All",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end",
        className,
      )}
    >
      <div className="space-y-2">
        {overline && (
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {overline}
          </p>
        )}
        <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
      </div>

      {actionHref && (
        <Link
          href={actionHref}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
