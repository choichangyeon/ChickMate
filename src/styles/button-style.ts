import { cva } from 'class-variance-authority';

export const buttonVariants = cva('px-4 py-2 rounded-3xl', {
  variants: {
    variant: {
      contained: 'text-white bg-primary-orange-600',
      outline: 'border border-secondary bg-transparent',
      ghost: 'border-none bg-transparent hover:text-white hover:bg-secondary',
    },
    color: {
      primary: '',
      secondary: '',
    },
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
      variant: 'outline',
      color: 'primary',
      className: 'border-secondary text-secondary',
    },
    {
      variant: 'outline',
      color: 'secondary',
      className: 'border-dark text-dark',
    },
    {
      variant: 'ghost',
      color: 'primary',
      className: 'text-secondary hover:bg-secondary hover:text-white',
    },
    {
      variant: 'ghost',
      color: 'secondary',
      className: 'text-dark hover:bg-dark hover:text-white',
    },
  ],
  defaultVariants: {
    variant: 'contained',
    color: 'primary',
  },
});
