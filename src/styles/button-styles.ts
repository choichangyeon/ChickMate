import { cva } from 'class-variance-authority';

export const buttonStyle = cva(
  [
    'border',
    'border-cool-gray-900',
    'text-cool-gray-900',
    'hover:border-primary-orange-600',
    'hover:text-primary-orange-600',
    'focus:border-0',
    'focus:bg-primary-orange-600',
    'focus:text-cool-gray-10',
  ],
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed border-cool-gray-300 text-cool-gray-300 bg-transparent',
        false: '',
      },
      size: {
        small: 'px-4 py-[2px]',
        medium: 'px-5 py-1',
        large: 'px-[52px] py-[2px]',
        fixed: 'w-[174px] py-1 px-5',
      },
      square: {
        true: 'rounded-[4px]',
        false: 'rounded-[50px]',
      },
      fontWeight: {
        normal: 'font-normal',
        medium: 'font-medium',
        bold: 'font-bold',
        black: 'font-black',
      },
    },
    compoundVariants: [
      {
        disabled: true,
        className: 'hover:border-cool-gray-300 hover:text-cool-gray-300',
      },
    ],
    defaultVariants: {
      size: 'medium',
      disabled: false,
      square: false,
      fontWeight: 'medium',
    },
  }
);
