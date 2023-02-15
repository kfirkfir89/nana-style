/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '900': '56.25rem',
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
