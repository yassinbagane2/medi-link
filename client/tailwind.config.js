export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#1d4ed8',
        darkBlue: '#1e1b4b',
        lightBlue: '#1780a1',
        lightGray: '#f8f8f8',
        darkerGray: '#999',
        transparentBlue: '#2c4b68',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
