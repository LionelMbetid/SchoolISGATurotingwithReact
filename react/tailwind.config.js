/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        darkRed: "#960A00",
        darkishRed: "#570600",
        Red: "#D60E00",
        lightRed: "#E30F00",
        whiteCustom: "#EEEEEE",
        black: '#000000'

      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        boo: '12rem'
      },
      backgroundImage: {
        'picture-loginpage': "url('./src/assets/images/ISGACampus.jpg')",
        'isga-logo': "url('./src/assets/images/isgaLogo.png')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

