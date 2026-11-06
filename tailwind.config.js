/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"] },
      colors: {
        gold: { DEFAULT: "#D4A62A", bright: "#E9BC4B", dark: "#1A1300" },
        ink: { DEFAULT: "#0B0B0B", panel: "#171717", raised: "#1F1F1F", line: "#2B2B2B" },
        cream: "#F5F0E6",
        muted: "#9A9A9A",
        danger: "#E5484D",
        success: "#3FB67B",
      },
    },
  },
  plugins: [],
};
