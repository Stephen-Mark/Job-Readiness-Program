/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mint: '#E8F5F2',
        teal: '#2DBFAD',
        cream: '#FFF0D6',
        amber: '#F5A623',
        coral: '#E8635A',
        navy: '#1A1753',
        mid: '#595959',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
};
