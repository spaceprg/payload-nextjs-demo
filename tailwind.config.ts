import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1e3a8a',
          light: '#3b82f6',
          dark: '#172554',
        },
        // GO MO homepage design system (dark theme, gradient accents)
        ink: '#070c11',
        mint: '#5cffd3',
        purple: '#bd27f6',
        'purple-deep': '#8e38f8',
        gomoblue: '#030cf4',
        cyan: '#00deff',
        turquoise: '#03ffff',
        pink: '#ff28bc',
        rose: '#ff5c7f',
        lime: '#eeff41',
      },
      maxWidth: {
        content: '1200px',
      },
      fontFamily: {
        sans: ['var(--font-nunito-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'ui-serif', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
