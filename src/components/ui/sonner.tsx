"use client";

import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      // Blueprint: Top-right corner
      position="top-right"
      className="toaster group"
      // Blueprint: Sleek, minimal borders, semantic icons
      icons={{
        success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        error: <AlertCircle className="h-5 w-5 text-rose-500" />,
        info: <Info className="h-5 w-5 text-zinc-500" />,
        warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-zinc-950 group-[.toaster]:border-zinc-200 group-[.toaster]:shadow-[0_8px_30px_rgba(0,0,0,0.04)] group-[.toaster]:rounded-lg",
          title: "group-[.toast]:text-zinc-950 group-[.toast]:font-medium",
          description: "group-[.toast]:text-zinc-500 group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-white group-[.toast]:rounded-md",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-primary group-[.toast]:rounded-md",
          success: "group-[.toaster]:border-emerald-200",
          error: "group-[.toaster]:border-rose-200",
        },
        // Premium feel: slightly longer duration
        duration: 4000,
      }}
      {...props}
    />
  );
};

export { Toaster };
