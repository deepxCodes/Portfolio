/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        brand: {
          50: '#EEF6FF',
          100: '#D9ECFF',
          200: '#B3D7FF',
          300: '#8CC2FF',
          400: '#66ADFF',
          500: '#3E96FF',
          600: '#1E7FFF',
          700: '#0066F5',
          800: '#0049B2',
          900: '#002F73'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.25)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
