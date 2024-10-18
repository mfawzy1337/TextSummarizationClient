/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#F00",
        grey:{
          100:"#FFF",
          200:"#EEE",
        }
      }
    },
  },
  plugins: [],
}

