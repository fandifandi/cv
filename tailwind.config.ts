// ===============================
// FILE: tailwind.config.ts
// ===============================
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      borderRadius: { "2xl": "1.25rem" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
