/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/**/**/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or false
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
