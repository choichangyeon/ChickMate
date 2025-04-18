import { cva } from 'class-variance-authority';

export const buttonStyle = cva('', {
  variants: {
    variant: {
      contained: 'text-cool-gray-50 bg-primary-orange-600',
      outline: 'border bg-transparent',
      ghost: 'border-none bg-transparent hover:text-cool-gray-50',
    },
    color: {
      primary: '',
      secondary: '',
      dark: '',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
    size: {
      large: 'px-[52px] py-[2px]',
      medium: 'px-5 py-1',
      small: 'px-4 py-[2px]',
    },
    square: {
      true: 'rounded-[4px]',
      false: 'rounded-[50px]',
    },
  },
  compoundVariants: [
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
      color: 'primary',
      className: 'border-primary-orange-600 text-primary-orange-600',
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
    {
      variant: 'ghost',
      color: 'primary',
      className: 'text-primary-orange-600 hover:bg-primary-orange-600 hover:text-cool-gray-50',
    },
    {
      variant: 'ghost',
      color: 'secondary',
      className: 'text-secondary-amber hover:bg-secondary-amber hover:text-cool-gray-50',
    },
    {
      variant: 'ghost',
      color: 'dark',
      className: 'text-cool-gray-900 hover:bg-cool-gray-900 hover:text-cool-gray-50',
    },
    {
      variant: 'contained',
      disabled: true,
      className: 'border-cool-gray-300 text-cool-gray-50 bg-cool-gray-300',
    },
    {
      variant: 'outline',
      disabled: true,
      className: 'border-cool-gray-300 text-cool-gray-300 bg-transparent',
    },
    {
      variant: 'ghost',
      disabled: true,
      className: 'text-cool-gray-300 hover:bg-cool-gray-300 hover:text-cool-gray-50',
    },
  ],
  defaultVariants: {
    variant: 'contained',
    color: 'primary',
    disabled: false,
  },
});
