import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const textVariant = cva('font-normal', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    color: {
      default: 'text-black',
      gray: 'text-gray-500',
      red: 'text-red-500',
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
  },
});

type AllowedTags = 'p' | 'span';

type TextProps<T extends AllowedTags = 'p'> = {
  as?: T;
  children: React.ReactNode;
} & VariantProps<typeof textVariant> &
  Omit<React.ComponentPropsWithoutRef<T>, 'as'>;

const Text = <T extends AllowedTags = 'p'>({ as, size, color, align, children, ...props }: TextProps<T>) => {
  const Component = as || 'p';
  return (
    <Component className={textVariant({ size, color, align })} {...props}>
      {children}
    </Component>
  );
};

export default Text;
