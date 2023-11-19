/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Libre Baskerville"', ...defaultTheme.fontFamily.sans],
        kdam: ['"Kdam Thmor Pro"', ...defaultTheme.fontFamily.sans],
        russo: ['"Russo One"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

''