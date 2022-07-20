const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
