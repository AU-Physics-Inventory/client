/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Serif',],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
