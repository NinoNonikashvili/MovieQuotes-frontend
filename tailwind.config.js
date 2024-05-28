/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "helvetica-geo-100": ["helvetica-geo-200"],
        "helvetica-geo-200": ["helvetica-geo-300"],
        "helvetica-geo-300": ["helvetica-geo-400"],
        "helvetica-geo-400": ["helvetica-geo-500"],
        "helvetica-geo-500": ["helvetica-geo-600"],
        "helvetica-geo-600": ["helvetica-geo-700"],
        "helvetica-geo-700": ["helvetica-geo-800"],
        "helvetica-geo-800": ["helvetica-geo-900"],
        "helvetica-100": ["helvetica-100"],
        "helvetica-200": ["helvetica-200"],
        "helvetica-300": ["helvetica-300"],
        "helvetica-400": ["helvetica-400"],
        "helvetica-500": ["helvetica-500"],
        "helvetica-600": ["helvetica-600"],
        "helvetica-700": ["helvetica-700"],
        "helvetica-800": ["helvetica-800"],
        "helvetica-900": ["helvetica-900"],
      },
      colors: {
        "red-400": "#DC3545",
        "red-500": "#E33812",
        "red-600": "#E31221",
        "zinc-700": "#2d2a3f",
        "zinc-800": "#222030",
        "gray-100": "#CED4DA",
        "gray-200": "#A9B4BF",
        "gray-300": "#D9D9D9",
        "gray-500": "#6C757D",
        "blue-600": "#0D6EFD",
        "orangge-200": "#DDCCAA",
      },
      screens: {
        desktop: "1920px",
      },
    },
  },
  plugins: [],
};
