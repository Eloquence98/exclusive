import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem", // Blueprint: px-4 sm:px-6 lg:px-8 (handled via max-w-7xl mx-auto usually, but base padding is good)
      screens: {
        "2xl": "1400px", // Blueprint: max-w-7xl (1280px) is standard, 1400px gives breathing room
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        cream: "#f6f1ea",
        bone: "#ece4d8",
        ink: "#141311",
        charcoal: "#2a2825",
        stone: "#8a8278",
        sand: "#d9cfbf",
        terracotta: "#b6623d",
        moss: "#4e5a3f",
        rating: {
          rated: "#FFAD33",
          "not-rated": "#BFBFBF",
        },
        placeholder: "#7B7B7B",
        discount: "#7F7F7F",
        "bullet-point": "#808080",
        text: {
          one: "#FAFAFA",
          two: "#7D8184",
        },
        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        error: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },
      },
      spacing: {
        layout: "1rem",
        "layout-md": "4rem",
        "layout-lg": "8.4375rem",
        15: "3.75rem",
        22: "5.5rem",
        25: "6.375em",
        35: "8.75rem",
        70: "16.875rem",
        99: "29rem",
      },
      maxWidth: {
        "8xl": "90rem",
        1920: "120em",
      },
      margin: {
        47: "11.875rem",
      },
      height: {
        screen: "100dvh",
        "screen-2": "calc(100dvh - 200px)",
        view: "calc(100vh - 7.25em)",
        23: "5.875rem",
      },
      borderRadius: {
        lg: "var(--radius)", // 8px (Buttons/Inputs)
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)", // 16px (Cards)
        smd: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animate"),
    heroui({
      themes: {
        light: {
          layout: {
            radius: {
              small: "0.375rem",
            },
          },
        },
        dark: {
          layout: {
            radius: {
              small: "0.375rem",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;

export default config;
