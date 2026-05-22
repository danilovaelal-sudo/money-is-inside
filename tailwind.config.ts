import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#E7DDC8",
        sand: "#D8CBB3",
        card: "#EFE5D1",
        navy: "#171C3F",
        ink: "#1D2148",
        accent: "#F4A51C",
        lilac: "#8E7BC4",
        milk: "#F6EEDB",
        line: "rgba(23, 28, 63, 0.35)"
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        card: "0 24px 60px rgba(23, 28, 63, 0.12)",
        soft: "0 18px 40px rgba(23, 28, 63, 0.1)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.28) 0, rgba(255,255,255,0) 32%), radial-gradient(circle at 80% 0%, rgba(244,165,28,0.12) 0, rgba(244,165,28,0) 26%), linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))"
      },
      animation: {
        float: "float 14s ease-in-out infinite",
        marquee: "marquee 20s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
