/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      colors: {
        heading: 'rgb(var(--color-heading))',
        navbar: 'rgb(var(--color-navbar))',
        body: 'rgb(var(--color-body))',
        common: 'rgb(var(--color-common))',
        border: 'rgb(var(--color-border))',
        cardbg: 'rgb(var(--color-cardbg))',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
