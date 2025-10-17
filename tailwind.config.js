// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULLT: '#59A5D8' ,
          50: '#EFF7FC',
          100: '#D7E9F7',
          200: '#B7D7F1',
          300: '#59A5D8', 
          400: '#3D8FCF',
          500: '#1E7ABF',
          600: '#1A69A6',
          700: '#15588C',
          800: '#104773',
          900: '#0B3659',

        },
       
        secondary:{
          DEFAULT: '#304D6D',
          50: '#E9EDF1',
          100: '#D3DBE3',
          200: '#A8B7C7',
          300: '#7D93AB',
          400: '#516F8F', // Color base
          500: '#304D6D',
          600: '#263E57',
          700: '#1D2F41',
          800: '#13202B',
          900: '#0A1116',
          
        } ,
        success:{
          DEFAULT: '#18F2B2',
          50: '#E8FEF7',
          100: '#C0FCE8',
          200: '#99FAD9',
          300: '#71F8CA',
          400: '#4AF6BB', // Color base
          500: '#18F2B2',
          600: '#0FBF8F',
          700: '#0B8C6B',
          800: '#075A44',
          900: '#04271E',
        } ,
         neutral: {
          DEFAULT: '#EBEBEB',
          50: '#F8F8F8',
          100: '#F2F2F2',
          200: '#E0E0E0',
          300: '#CECECE',
          400: '#BCBCBC', // Color base
          500: '#A9A9A9',
          600: '#8A8A8A',
          700: '#6B6B6B',
          800: '#4C4C4C',
          900: '#2D2D2D',
        },
        'neutral-50': {
          DEFAULT: '#DDF8E8',
          50: '#F5FDF8',
          100: '#EBFBF1',
          200: '#D6F6E3',
          300: '#C2F2D5', // Color base
          400: '#ADEDC7',
          500: '#99E9B9',
          600: '#7AE0A1',
          700: '#5BD789',
          800: '#3BCE71',
          900: '#2AA75B',
        },
        warning: colors.amber,
        error: colors.rose,
      },
      fontFamily: {
        sans: ['Poppins', 'Sans-Serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
 
};