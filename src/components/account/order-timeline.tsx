import { type TimelineStep } from "@/lib/api";
import { cn } from "@/utils/utility";
import { Check } from "lucide-react";

interface OrderTimelineProps {
  steps: TimelineStep[];
}

export function OrderTimeline({ steps }: OrderTimelineProps) {
  return (
    <div className="relative space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div key={step.label} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Vertical Line */}
            {!isLast && (
              <div
                className={cn(
                  "absolute bottom-0 left-[15px] top-8 w-[2px]",
                  step.completed || step.current
                    ? "bg-foreground" // Solid black line
                    : "border-l-2 border-dashed border-border", // Dashed zinc-300 line
                )}
              />
            )}

            {/* Step Indicator (Circle) */}
            <div className="relative z-10 flex-shrink-0">
              {step.completed ? (
                // Completed: Solid black filled circle
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </div>
              ) : step.current ? (
                // Current: Pulsing black circle
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-20" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-foreground" />
                </div>
              ) : (
                // Pending: Hollow zinc-300 circle
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background" />
              )}
            </div>

            {/* Step Content */}
            <div
              className={cn(
                "flex flex-col pt-1",
                step.completed || step.current
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "text-sm",
                  step.completed || step.current
                    ? "font-semibold"
                    : "font-normal",
                )}
              >
                {step.label}
              </span>
              {step.date && (
                <span className="mt-0.5 text-xs text-muted-foreground">
                  {step.date}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
