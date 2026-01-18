/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A403A', // Warm dark grey/brown for text
        secondary: '#FFF5F6', // Very light pastel pink background
        accent: '#A87676', // Soft pastel pink/coral
        'accent-dark': '#FF9E99', // Slightly darker pink for hover
        'pastel-cream': '#FFF9F0',
        'pastel-green': '#E2F0CB',
        white: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
