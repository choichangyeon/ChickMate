import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
          100: '#F3F4F6',
          50: '#F9FAFB',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
  safelist: Array.from({ length: 101 }, (_, i) => `w-[${i}%]`),
};
export default config;
