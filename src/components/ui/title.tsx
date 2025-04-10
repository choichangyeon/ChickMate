import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const titleVariant = cva('font-bold', {
  variants: {
    size: {
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    color: {
      default: 'text-black',
      gray: 'text-gray-500',
      red: 'text-red-500',
      primary: 'text-primary',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'lg',
    color: 'default',
    align: 'left',
  },
});

type AllowedHeadings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TextProps<T extends AllowedHeadings = 'h1'> = {
  as?: T;
  children: React.ReactNode;
} & VariantProps<typeof titleVariant> &
  Omit<React.ComponentPropsWithoutRef<T>, 'as'>;

const Title = <T extends AllowedHeadings = 'h1'>({ as, size, color, align, children, ...props }: TextProps<T>) => {
  const Component = as || 'h1';
  return (
    <Component className={titleVariant({ size, color, align })} {...props}>
      {children}
    </Component>
  );
};

export default Title;
