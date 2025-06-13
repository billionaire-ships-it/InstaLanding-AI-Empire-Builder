/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#4f46e5",
        empire: "#0f172a"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem"
      },
      boxShadow: {
        xl: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      }
    }
  },
  plugins: []
};
