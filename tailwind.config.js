/** @type {import('tailwindcss').Config} */
module.exports = {variants: {
  extend: {
    display: ['group-hover'],
    visibility: ['group-hover'],
  }
},
  content: ["./public/stylesheets/**/*.{html,js}","./views/*.{html,ejs,js}"],
  theme: {
    extend: {
      backgroundImage:{
        'hell-hole':"url('/images/hellhole.webp')"
      }
    },
  },
  plugins: [],
}

