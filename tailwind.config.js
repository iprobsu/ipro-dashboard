/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // 🌙 enables class-based dark mode toggle
  theme: {
    extend: {
      // You can define custom colors, fonts, etc. here
    },
  },
  plugins: [
    // Add Tailwind plugins like @tailwindcss/forms if needed
  ],
}
