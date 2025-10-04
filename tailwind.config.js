/** @type {import('tailwindcss').Config} */

export default{
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend:{
      colors:{
        'brand-primary': '#007BFF',
        'brand-secondary': '#6C757D', // Color secundario
        'accent': '#FFC107', // Color de acento para botones o alertas
      },
       fontFamily: {
        // Define tus familias de fuentes. 'sans' es la por defecto.
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        // Define espaciados personalizados si es necesario.
        '128': '32rem',
      }
    },
  }
}