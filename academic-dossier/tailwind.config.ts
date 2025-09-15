import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'academic-brown': '#8B4513',
        'academic-brown-dark': '#7A3F12',
        'academic-brown-light': '#A0522D',
      },
      fontFamily: {
        'times': ['Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;