/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        popins: ["'Poppins'", "sans-serif"]
      },
      colors: {
        'navBG': '#242424',
        'secondary': '#1f1f1f',
        'asideBG': '#121212',
        'textCOLOR': '#333'
      },
    },
  },
  plugins: [],
}

