/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./app.vue', './pages/**/*.{vue,js,ts,jsx,tsx}', './layouts/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1320px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      whitegray: '#FDFDFD',
      black: '#252321',
      gray: '#f1f1f1',
      red: '#EB001B',
      orange: {
        100: '#FADEC3',
        200: '#F4973C',
        400: '#FF7C33',
        600: '#EA5430',
      },
      blue: {
        100: '#E6F0F8',
      },
      yellowgreen: {
        100: '#F0EDBA',
      },
      yellow: {
        100: '#FEEDB1',
      },
    },
    extend: {
      boxShadow: {
        main: '0px 3px 25px 0px rgba(0, 0, 0, 0.03)',
        elevated: '0px 3px 25px 0px rgba(0, 0, 0, 0.07)',
      },
      spacing: {
        18: '4.5rem',
      },
      fontFamily: {
        sans: ['Ubuntu', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
