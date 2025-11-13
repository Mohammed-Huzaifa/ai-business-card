import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cardBg: "#050816",
        cardAccent: "#111827",
        primary: "#1c1917"
      },
      boxShadow: {
        card: "0 18px 45px rgba(0,0,0,0.45)"
      }
    }
  },
  plugins: []
};

export default config;
