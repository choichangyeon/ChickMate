import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const textVariant = cva('font-normal', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '6xl': 'text-6xl',
    },
    color: {
      default: 'text-cool-gray-900',
      white: 'text-white',
      primary: 'text-primary-orange',
      'secondary-amber': 'text-secondary-amber',
      'secondary-yellow': 'text-secondary-yellow',
      'gray-700': 'text-cool-gray-700',
      'gray-500': 'text-cool-gray-500',
      'gray-300': 'text-cool-gray-300',
      'gray-100': 'text-cool-gray-100',
      'gray-50': 'text-cool-gray-50',
    },
    weight: {
      thin: 'font-thin',
      medium: 'font-medium',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
    align: 'left',
    weight: 'medium',
  },
});

type AllowedTags = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TextProps<T extends AllowedTags = 'p'> = {
  as?: T;
  children: React.ReactNode;
} & VariantProps<typeof textVariant> &
  Omit<React.ComponentPropsWithoutRef<T>, 'as'>;

const Text = <T extends AllowedTags = 'p'>({ as, size, color, weight, align, children }: TextProps<T>) => {
  const Component = as || 'p';
  return <Component className={textVariant({ size, color, weight, align })}>{children}</Component>;
};

export default Text;
