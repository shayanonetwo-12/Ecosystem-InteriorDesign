/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Soft, warm neutrals
        warmwhite: '#FAF9F7',
        ivory: '#F5F3EF',
        mist: '#ECEAE6',
        sand: '#E6DED3',
        stone: '#D5CCC2',
        // Accents
        sage: '#A8C3B0',
        olive: '#8FA58D',
        terracotta: '#C98F6F',
        dustyblue: '#AFC7D9',
        mutedteal: '#7BB8B2',
        champagne: '#D7C2A5',
        // Text
        ink: '#2B2B2B',
        slatey: '#626262',
        muted: '#8A8A8A',
        // Semantic
        success: '#6BBF8D',
        warning: '#E9B949',
        error: '#E57373',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(43, 43, 43, 0.06)',
        glass: '0 8px 32px rgba(43, 43, 43, 0.08)',
        glow: '0 0 40px rgba(168, 195, 176, 0.25)',
      },
      backdropBlur: {
        xs: '4px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        sway: 'sway 8s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        fadeUp: 'fadeUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
