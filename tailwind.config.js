const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/*.html',
    './src/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      gray: {
        ...colors.trueGray,
        750: "#333333",
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
