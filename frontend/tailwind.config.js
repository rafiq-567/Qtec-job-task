/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#4640DE',  
        navy:      '#202430',  
        'gray-body': '#515B6F', 
        'gray-sub':  '#7C8493', 
        'bg-light':  '#F8F8FD', 
        'border':    '#D6DDEB', 
      },
      fontFamily: {
        sans: ['Epilogue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};