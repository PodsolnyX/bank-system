/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  darkMode: 'selector'
}

