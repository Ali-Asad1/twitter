const { createPlugin } = require("windy-radix-palette");
const colors = createPlugin({
  opacitySupport: true,
});

/** @type {import('tailwindcss').Config} */
module.exports = {
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
  plugins: [colors.plugin, require("@tailwindcss/aspect-ratio")],
};
