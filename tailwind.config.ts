import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#04101f',
          900: '#0a1929',
          800: '#0D2347',
          700: '#122d5a',
          600: '#1B3A6B',
          500: '#1A5276',
          400: '#2471A3',
        },
        sky: {
          brand: '#2E86C1',
          light: '#E8F4FD',
        },
        amber: {
          brand: '#E8A020',
          dark: '#C8880E',
          light: '#FFF4E0',
        },
        slate: {
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 35s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-amber': 'pulseAmber 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-up': 'fadeUp 0.6s ease both',
        'truck': 'truckSlide 18s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseAmber: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(232,160,32,0.5)' },
          '50%': { boxShadow: '0 0 0 16px rgba(232,160,32,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        truckSlide: {
          '0%': { transform: 'translateX(-200px)', opacity: '0' },
          '5%': { opacity: '1' },
          '92%': { opacity: '1' },
          '100%': { transform: 'translateX(calc(100vw + 200px))', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-amber': '0 0 40px rgba(232,160,32,0.3)',
        'glow-navy': '0 0 60px rgba(27,58,107,0.4)',
        'card': '0 4px 24px rgba(27,58,107,0.08)',
        'card-hover': '0 20px 60px rgba(27,58,107,0.18)',
        'card-xl': '0 32px 80px rgba(27,58,107,0.24)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

export default config
