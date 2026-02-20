import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080C14',
        surface: '#0F1623',
        cyan: { DEFAULT: '#22D3EE', dark: '#0891B2' },
        gold: { DEFAULT: '#F0B429', dark: '#D97706' },
        primary: '#F8FAFC',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
