module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius:{
        '4':'4px'
      },
      width:{
        '30':'7.5rem'
      },
      spacing:{
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px',
      },
      lineHeight:{
        '14':'14px',
      },
      fontSize: {
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '15': '15px',
        '18': '18px',
        '24': '24px',
        '60': '60px',
      },
      colors: {
        gray1: 'var(--gray1)',
        gray2: 'var(--gray2)',
        'theme-red': 'var(--theme-red)',
        link: 'var(--link)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        fail: 'var(--fail)',
        text: 'var(--text)',
        auxiliary: 'var(--auxiliary)',
        tip: 'var(--tip)',
        divider: 'var(--divider)',
        disable: 'var(--disable)',
        tableBg: 'var(--tableBg)',
        upcomingBg:'var(--bg-status-upcoming)',
        ongoingBg:'var(--bg-status-ongoing)',
        ongoingText:'var(--status-ongoing)',
        expiredBg:'var(--bg-status-expired)'
      },
      textColor: {
        gray1: 'var(--gray1)',
        gray2: 'var(--gray2)',
        'theme-red': 'var(--theme-red)',
        link: 'var(--link)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        fail: 'var(--fail)',
        text: 'var(--text)',
        auxiliary: 'var(--auxiliary)',
        tip: 'var(--tip)',
        divider: 'var(--divider)',
        disable: 'var(--disable)',
        tableBg: 'var(--tableBg)',
        upcomingBg:'var(--bg-status-upcoming)',
        ongoingBg:'var(--bg-status-ongoing)',
        ongoingText:'var(--status-ongoing)',
        expiredBg:'var(--bg-status-expired)'
      },
    },
  },
  plugins: [],
}
