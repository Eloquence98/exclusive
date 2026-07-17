"use client";

import { cn } from "@/utils/utility";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

const buttonVariants = cva(
  // Blueprint: Accessible UI focus rings using CSS variables
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground",
        secondary: "bg-muted text-foreground hover:bg-muted/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        icon: "h-10 w-10 p-0 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonAsChildProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    asChild: true;
  };

type MotionButtonProps = HTMLMotionProps<"button"> &
  ButtonVariants & {
    asChild?: false;
  };

export type ButtonProps = ButtonAsChildProps | MotionButtonProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant, size, asChild = false } = props;

    if (asChild) {
      const {
        className: _,
        variant: __,
        size: ___,
        asChild: ____,
        ...slotProps
      } = props as ButtonAsChildProps;

      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...slotProps}
        />
      );
    }

    const {
      className: _,
      variant: __,
      size: ___,
      asChild: ____,
      whileTap = { scale: 0.98 },
      ...motionProps
    } = props as MotionButtonProps;

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileTap={whileTap}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...motionProps}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
