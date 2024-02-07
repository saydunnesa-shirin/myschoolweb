/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
];
export const theme = {
  extend: {
    keyframes: {
      shimmer: {
        '100%': { transform: 'translateX(100%)' }
      }
    },
    animation: {
      shimmer: 'shimmer 1.5s infinite'
    }
  },
};
export const plugins = [];

