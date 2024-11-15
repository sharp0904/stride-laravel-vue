const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Flex', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'tc-primary': '#187a74',
        'tc-primary-light': '#58b9b3',
        'tc-primary-dark': '#074e4a'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('tailwind-scrollbar')
  ],
}
