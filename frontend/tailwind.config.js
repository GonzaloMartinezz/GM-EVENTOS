/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#0b0b0b",
        "surface-dark": "#121212",
        "surface-card": "#151515",
        "surface-border": "#272727",
        "accent": "#ff3c00",
        "accent-soft": "#ff5a26",
        "accent-muted": "#2d0f05",
        "on-surface": "#f1efe7",
        "on-surface-subtle": "#8a8883"
      },
      fontFamily: {
        "display": ["Archivo Black", "sans-serif"],
        "syne": ["Syne", "sans-serif"],
        "mono": ["Space Mono", "monospace"],
        "inter": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms')
  ],
}
