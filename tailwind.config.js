const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [
    './src/*.html',
    './src/**/*.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: {
        DEFAULT: '#2c579b',
        contrast: '#ffffff',
      },

      gray: {
        ...colors.trueGray,
        750: '#333333',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({addComponents, theme}) {
      const rawStyle = {
        '.r-container': {
          display: 'grid',
          gridTemplate:
            '"header header header" 48px\
            "header_item header_item header_item" 60px\
            "main_bg__l main main_bg__r" 1fr\
            "footer footer footer" 24px\
            /30px 1fr 30px',
        },

        '.r-header': {
          gridArea: 'header',
        },

        '.r-header_item': {
          gridArea: 'header_item',
        },

        '.r-main': {
          gridArea: 'main',
        },

        '.r-footer': {
          gridArea: 'footer',
        },

        '.r-main_bg__l': {
          gridArea: 'main_bg__l',
        },

        '.r-main_bg__r': {
          gridArea: 'main_bg__r',
        },
      }

      addComponents(rawStyle)
    }),

    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.h-full-v': {
          height: '100vh',
        },

        '[aria-disabled=true]': {
          display: 'none',
        },
      }

      addUtilities(newUtilities);
    })
  ],
}
