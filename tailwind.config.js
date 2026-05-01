/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#154212",
        "on-primary": "#ffffff",
        "primary-fixed": "#bcf0ae",
        "primary-fixed-dim": "#a1d494",
        "secondary": "#75593e",
        "on-secondary": "#ffffff",
        "secondary-fixed": "#ffdcbf",
        "tertiary": "#353c1f",
        "background": "#f9f9f7",
        "on-background": "#1a1c1b",
        "surface": "#f9f9f7",
        "on-surface": "#1a1c1b",
        "on-surface-variant": "#42493e",
        "surface-container-low": "#f4f4f2",
        "surface-container-highest": "#e2e3e1",
        "outline": "#72796e",
      },
      spacing: {
        "sm": "12px",
        "md": "24px",
        "lg": "48px",
        "xl": "80px",
        "gutter": "24px",
      },
      fontFamily: {
        "serif": ["Noto Serif", "serif"],
        "sans": ["Work Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}