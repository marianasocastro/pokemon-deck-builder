module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Caminho para os arquivos de origem
  ],
  theme: {
    colors: {
      "blue": "#2E6EB5",
      "yellow": "#E6BC2F",
      "red": "#E3350D",
      "black-primary": "#323232",
      "black-secondary": "#1F1F1F",
      "gray": "#F5F5F5",
      "white": "#FFFFFF"

    },
    extend: {
      fontFamily: {
        'signika': ['"Signika Negative"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};

