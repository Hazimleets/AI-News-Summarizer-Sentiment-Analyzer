/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#FFD700",        // yellow button
        gradientStart: "#6a11cb", // purple
        gradientMid: "#2575fc",   // blue
        gradientEnd: "#ff512f",   // orange-pink
        textLight: "#ffffff",
        textMuted: "#cbd5e1",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
