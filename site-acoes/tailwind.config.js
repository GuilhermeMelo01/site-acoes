/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Libre Baskerville"', ...defaultTheme.fontFamily.sans],
        suez: ['"Suez One"', ...defaultTheme.fontFamily.sans],
        russo: ['"Russo One"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

''