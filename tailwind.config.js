/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'aublue': {
        100: '#e3f3ff',
        200: '#aadbff',
        300: '#71c3ff',
        400: '#39abff',
        500: '#0093ff',
        600: '#0073c6',
        700: '#00528e',
        800: '#003155',
        900: '#00101c',
        light: '#0073c6',
        DEFAULT: '#004a80',
        dark: '#003155'
      },
      'augold': {
        100: '#f7f4ea',
        200: '#e7dec1',
        300: '#d8c899',
        400: '#c8b270',
        500: '#b89c47',
        600: '#8f7937',
        700: '#665727',
        800: '#3d3418',
        900: '#141108',
        light: '#d8c899',
        DEFAULT: '#CBB677',
        dark: '#b89c47'
      }
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Serif',],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
