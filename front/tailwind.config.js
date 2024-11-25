/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryBg: '#ffffff',
        secondaryBg: '#f5f5f5',
        text: '#121212',
        accent: '#f5c518',
        border: '#ddd',
      },
      fontFamily: {
        body: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
