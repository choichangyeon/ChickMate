import type { Config } from 'tailwindcss';
import scrollbarHide from 'tailwind-scrollbar-hide';

const config: Config = {
  content: [
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': {
          600: '#E55A27',
          700: '#C2410C',
        },
        'secondary-amber': '#FBBF24',
        'secondary-yellow': '#FDE047',
        'cool-gray': {
          900: '#111827',
          700: '#374151',
          500: '#6B7280',
          300: '#D1D5DB',
          200: '##E5E7EB',
          100: '#F3F4F6',
          50: '#F9FAFB',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      borderRadius: {
        'rounded-none': '0rem',
        'rounded-sm': '0.125rem',
        'rounded': '0.25rem',
        'rounded-md': '0.375rem',
        'rounded-lg': '0.5rem',
        'rounded-xl': '0.75rem',
        'rounded-2xl': '1rem',
        'rounded-3xl': '1.5rem',
        'rounded-full': '50%',
      },
    },
  },
  plugins: [scrollbarHide],
  safelist: Array.from({ length: 101 }, (_, i) => `w-[${i}%]`),
};
export default config;
