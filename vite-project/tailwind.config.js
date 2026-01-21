/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Warm dark grey/brown for text
        secondary: '#f6dde1', // Very light pastel pink background
        accent: '#2b2222', // Soft pastel pink/coral
        'accent-dark': '#ffffff', // Slightly darker pink for hover
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
