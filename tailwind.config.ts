import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        gateway: {
          navy: "#0a1628",
          slate: "#111f36",
          accent: "#00a3a3",
          accentDim: "#007d7d",
          gold: "#c9a227",
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
