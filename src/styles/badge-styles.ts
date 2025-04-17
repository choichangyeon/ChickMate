import { cva } from 'class-variance-authority';

export const badgeStyle = cva('', {
  variants: {
    variant: {
      contained: 'bg-primary-orange-600, text-cool-gray-50',
      outline: 'bg-transparent border border-primary-orange-600 text-primary-orange-600',
    },
    color: {
      primary: 'primary-orange-600',
      secondary: 'secondary-amber',
      dark: 'cool-gray-900',
    },
    size: {
      small: 'py-[2px] px-[10px] text-sm',
      default: 'px-5 py-1',
    },
    ml: { 0: '', 1: 'ml-1', 2: 'ml-2', 3: 'ml-3', 4: 'ml-4', 5: 'ml-5' },
    mr: { 0: '', 1: 'mr-1', 2: 'mr-2', 3: 'mr-3', 4: 'mr-4', 5: 'mr-5' },
    mt: { 0: '', 1: 'mt-1', 2: 'mt-2', 3: 'mt-3', 4: 'mt-4', 5: 'mt-5' },
    mb: { 0: '', 1: 'mb-1', 2: 'mb-2', 3: 'mb-3', 4: 'mb-4', 5: 'mb-5' },
    mx: { 0: '', 1: 'mx-1', 2: 'mx-2', 3: 'mx-3', 4: 'mx-4', 5: 'mx-5' },
    my: { 0: '', 1: 'my-1', 2: 'my-2', 3: 'my-3', 4: 'my-4', 5: 'my-5' },
  },
  compoundVariants: [
    {
      variant: 'contained',
      color: 'primary',
      className: 'bg-primary-orange-600',
    },
    {
      variant: 'contained',
      color: 'secondary',
      className: 'bg-secondary-amber',
    },
    {
      variant: 'contained',
      color: 'dark',
      className: 'bg-cool-gray-900',
    },
    {
      variant: 'outline',
      color: 'secondary',
      className: 'border-secondary-amber text-secondary-amber',
    },
    {
      variant: 'outline',
      color: 'dark',
      className: 'border-cool-gray-900 text-cool-gray-900',
    },
  ],
  defaultVariants: {
    variant: 'contained',
    color: 'primary',
    size: 'default',
  },
});
