/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chocolate: ['Chocolate Classical Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["cupcake"],
  },
}
