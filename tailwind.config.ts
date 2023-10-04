import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chirp: ["var(--font-chirp)"],
        poppins: ["var(--font-poppins)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("windy-radix-palette"), require("@tailwindcss/aspect-ratio")],
};
export default config;
