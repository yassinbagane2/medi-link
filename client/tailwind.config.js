export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#1d4ed8',
        darkBlue: '#1e1b4b',
        lightBlue: '#1780a1',
        lightGray: '#fbfbfb',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
