/** @type {import('tailwindcss').Config} */
/* eslint-disable global-require */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
};
