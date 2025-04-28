import type { Config } from 'tailwindcss';
import scrollbarHide from 'tailwind-scrollbar-hide';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/*.ts',
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: '743px' },
        tablet: { min: '744px', max: '1279px' },
        desktop: { min: '1280px' },
      },
      maxWidth: {
        max: '1920px',
      },
      colors: {
        'primary-orange': {
          '600': '#E55A27',
          '700': '#C2410C',
        },
        'secondary-amber': '#FBBF24',
        'secondary-yellow': '#FDE047',
        'cool-gray': {
          '10': '#FAFBFC',
          '50': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '500': '#6B7280',
          '700': '#374151',
          '900': '#111827',
        },
        'naver-green': '#03C75A',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        'rounded-none': '0rem',
        'rounded-sm': '0.125rem',
        rounded: '0.25rem',
        'rounded-md': '0.375rem',
        'rounded-lg': '0.5rem',
        'rounded-xl': '0.75rem',
        'rounded-2xl': '1rem',
        'rounded-3xl': '1.5rem',
        'rounded-full': '50%',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      zIndex: {
        'notiflix-alert': '4001',
        modal: '100',
        header: '90',
        nav: '90',
        overlay: '10',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-out forwards',
      },
    },
  },
  plugins: [scrollbarHide, require('tailwindcss-animate')],
  safelist: Array.from({ length: 101 }, (_, i) => `w-[${i}%]`),
};
export default config;
