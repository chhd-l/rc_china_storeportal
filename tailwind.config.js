module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineHeight:{
        '14':'14px'
      },
      fontSize: {
        '12': '12px',
        '60': '60px',
        '10': '10px',
      },
      colors: {
        gray1: 'var(--gray1)',
        gray2: 'var(--gray2)',
      },
      textColor: {
        gray1: 'var(--gray1)',
        gray2: 'var(--gray2)',
      },
    },
  },
  plugins: [],
}
