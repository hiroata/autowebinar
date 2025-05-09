module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#0071e3',
        'apple-gray': {
          50: '#f5f5f7',
          100: '#e8e8ed',
          200: '#d2d2d7',
          300: '#86868b',
          400: '#6e6e73',
          500: '#1d1d1f',
        },
      },
      fontFamily: {
        sans: [
          'SF Pro Text',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'sans-serif'
        ],
      },
      borderRadius: {
        'apple': '12px',
        'pill': '980px',
      },
      boxShadow: {
        'apple': '0 4px 8px rgba(0, 0, 0, 0.04)',
        'apple-hover': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
};
