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
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
export default config
