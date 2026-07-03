"use client";

import { cn } from "@/utils/utility";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

/**
 * Button Variants
 * Strictly follows the "Quiet Luxury" blueprint:
 * - Primary: bg-zinc-900
 * - Secondary: Outline with border-zinc-200
 * - Border Radius: rounded-lg (8px)
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-zinc-800",
        outline:
          "border border-zinc-200 bg-white hover:bg-zinc-50 hover:text-primary",
        secondary: "bg-zinc-100 text-primary hover:bg-zinc-200",
        ghost: "hover:bg-zinc-100 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "h-10 w-10 p-0 rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-8 text-base", // Blueprint: Add to cart button is h-12
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "style">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Premium Button Component
 * - Uses Framer Motion for micro-interactions (scale 0.98 on tap)
 * - Supports `asChild` to render as a Next.js Link without breaking motion props
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      whileTap = { scale: 0.98 },
      ...props
    },
    ref,
  ) => {
    // If asChild is true, we render a standard Slot to avoid passing
    // Framer Motion props (like whileTap) to DOM elements via Next.js Link
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    // Standard button with Framer Motion micro-interactions
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileTap={whileTap}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
