/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
      extend: {
          colors: {
              bg_transparent: {
                  DEFAULT: 'rgba(0, 0, 0, 0.4)',
              },
          },
      },
  },
  plugins: [],
};
