/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grey-main': '#F1F2F6',
        'grey-mid': '#5A6474',
        'grey-8a': '#757D8A',
        'grey-dark': '#404D61',
        'button-border': '#E0E0E0',
        'blue-main': '#5B6AD0'
      },
      boxShadow: {
        'search-shadow': '0px 0px 0px 10px #E2E6FF'
      }
    },
  },
  plugins: [],
}

