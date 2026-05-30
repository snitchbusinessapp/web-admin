/** @type {import('tailwindcss').Config} */
const shared = require('../shared/tailwind/index.cjs');

module.exports = {
  ...shared,
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
};
