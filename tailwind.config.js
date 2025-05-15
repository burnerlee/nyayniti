/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        darkGold: '#B8860B',
      },
      fontFamily: {
        librebaskerville: ['Libre Baskerville', 'serif'],
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(108.89deg, #1F1C11 2.28%, #191208 95.71%)',
      },
    },
  },
  plugins: [],
}
