/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customOverlay: 'rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
};
