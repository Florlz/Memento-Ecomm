module.exports = {
  content: ["./**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        notoserif: ['Noto Serif', 'serif'],
      },
      backgroundImage: {
        'fox-img': "url('../images/bg1.webp')",
      },
      maxWidth: {
        full: "100%",
        '7xl': "80rem", // Corrected value for 7xl
      },
      colors: {
        beige: '#FDF0D1',
        beigepalette2: '#FEECE2',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // Ensure the correct plugin syntax
  ],
};
