import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--mt-green-700)", // #0D8A43
          foreground: "var(--mt-white)",
          900: "var(--mt-green-900)",
          700: "var(--mt-green-700)",
          500: "var(--mt-green-500)",
          300: "var(--mt-green-300)",
          100: "var(--mt-green-100)",
        },
        secondary: {
          DEFAULT: "var(--mt-warning)", // #F59E0B
          foreground: "var(--mt-black)",
        },
        background: "var(--mt-cream)", // #FFF9E6
        surface: "var(--mt-white)", // #FFFFFF
        text: {
          primary: "var(--mt-black)", // #1A1A1A
          secondary: "var(--mt-gray-500)", // #666666
        },
        muted: "var(--mt-gray-100)",
        success: "var(--mt-success)",
        warning: "var(--mt-warning)",
        error: "var(--mt-error)",
        info: "var(--mt-info)",
      },
    },
    animation: {
      "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "shimmer": "shimmer 2s linear infinite",
    },
    keyframes: {
      shimmer: {
        "0%": { backgroundPosition: "0 0" },
        "100%": { backgroundPosition: "-200% 0" },
      },
    },
  },
  plugins: [],
};
export default config;
