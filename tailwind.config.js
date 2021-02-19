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
            / 30px 1fr 30px',
        },

        '.r-header': {
          gridArea: 'header',
        },

        '.r-header_item': {
          gridArea: 'header_item',

          display: 'grid',
          gridTemplate:
            '"font-family font-family font-family font-family font-larger font-smaller separator undo redo" 1fr\
            "font-bold font-italic font-underline text-color background-color underline-color separator zoom-in zoom-out" 1fr\
            / 1fr 1fr 1fr 1fr 1fr 1fr 3px 1fr 1fr'
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

        '.r-header_item__font-family': {
          gridArea: 'font-family',
        },

        '.r-header_item__font-larger': {
          gridArea: 'font-larger',
        },

        '.r-header_item__font-smaller': {
          gridArea: 'font-smaller',
        },

        '.r-header_item__font-bold': {
          gridArea: 'font-bold',
        },

        '.r-header_item__font-italic': {
          gridArea: 'font-italic',
        },

        '.r-header_item__font-underline': {
          gridArea: 'font-underline',
        },

        '.r-header_item__text-color': {
          gridArea: 'text-color',
        },

        '.r-header_item__background-color': {
          gridArea: 'background-color',
        },

        '.r-header_item__underline-color': {
          gridArea: 'underline-color',
        },

        '.r-header_item__separator': {
          gridArea: 'separator',
        },

        '.r-header_item__undo': {
          gridArea: 'undo',
        },

        '.r-header_item__redo': {
          gridArea: 'redo',
        },

        '.r-header_item__zoom-in': {
          gridArea: 'zoom-in',
        },

        '.r-header_item__zoom-out': {
          gridArea: 'zoom-out',
        },
      }

      addComponents(rawStyle)
    }),

    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.h-full-v': {
          height: '100vh',
        },

        '.center-v': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        },

        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },

        '.border-1': {
          borderWidth: '1px',
        },

        '.r-sup': {
          position: 'relative'
        },

        '.r-sup-sub__plus': {
          position: 'absolute',
          top: '-6px',
          right: '-6px',
        },

        '.r-sup-sub__minus': {
          position: 'absolute',
          top: '-3px',
          right: '-3px',
        }
      }

      addUtilities(newUtilities);

      const globalUtilities = {
        '[aria-disabled=true]': {
          display: 'none',
        },

        '.ui-font': {
          fontFamily: "'Noto Sans', sans-serif",
        },
      }

      addUtilities(globalUtilities);
    })
  ],
}
