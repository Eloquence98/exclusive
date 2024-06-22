/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#DB4444",
          hover: "#E07575",
        },
        secondary: "#F5F5F5",
        accent: "#47B486",
        rating: {
          rated: "#FFAD33",
          "not-rated": "#BFBFBF",
        },
        placeholder: "#7B7B7B",
        discount: "#7F7F7F",
        "bullet-point": "#808080",
        background: {
          one: "#FFFFFF",
          two: "#F5F5F5",
        },
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
        border: "#B3B3B3",
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
      },
      maxWidth: {
        "8xl": "90rem",
      },
      margin: {
        47: "11.875rem",
      },
      height: {
        view: "calc(100vh - 7.25em)",
        23: "5.875rem",
        screen: {
          2: "calc(100dvh - 200px)",
        },
      },
      borderRadius: {
        smd: "0.25rem",
      },
    },
  },
  plugins: [],
};
