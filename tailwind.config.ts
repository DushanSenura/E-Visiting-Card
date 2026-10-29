import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#173D32",
          deep: "#0F2922",
        },
        gold: {
          DEFAULT: "#C5A46D",
          // Darker gold for small text so it keeps readable contrast on light backgrounds
          ink: "#8A6934",
        },
        champagne: "#E4D4B7",
        ivory: "#F8F6F1",
        ink: "#18201D",
        muted: "#5F6A65",
        line: "rgba(23, 61, 50, 0.10)",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "Cambria", '"Times New Roman"', "serif"],
        sans: ['"Manrope Variable"', "Manrope", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      borderRadius: {
        card: "22px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 41, 34, 0.04), 0 12px 40px -12px rgba(15, 41, 34, 0.14)",
        lift: "0 2px 4px rgba(15, 41, 34, 0.05), 0 20px 48px -16px rgba(15, 41, 34, 0.22)",
        button: "0 8px 20px -8px rgba(15, 41, 34, 0.45)",
        gold: "0 10px 24px -10px rgba(138, 105, 52, 0.55)",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
} satisfies Config;
