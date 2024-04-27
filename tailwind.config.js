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
    },
  },
  plugins: [],
};
