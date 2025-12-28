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
          DEFAULT: "#0F766E", // Teal 700
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F59E0B", // Amber 500
          foreground: "#FFFFFF",
        },
        background: "#F8FAFC", // Slate 50
        surface: "#FFFFFF", // Card Background (White)
        text: {
          primary: "#1E293B", // Slate 800
          secondary: "#64748B", // Slate 500
        },
        success: "#10B981", // Emerald 500
        warning: "#F97316", // Orange 500
        error: "#EF4444", // Red 500
        info: "#3B82F6", // Blue 500
      },
    },
  },
  plugins: [],
};
export default config;
