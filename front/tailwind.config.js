/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryBg: '#ffffff', // Fundo principal
        secondaryBg: '#f5f5f5', // Fundo secundário
        text: '#121212', // Texto principal
        accent: '#f5c518', // Amarelo do IMDb
        border: '#ddd', // Bordas e divisores
      },
      fontFamily: {
        body: ['Arial', 'sans-serif'], // Fonte padrão
      },
    },
  },
  plugins: [],
};
