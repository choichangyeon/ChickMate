import { cva, VariantProps } from 'class-variance-authority';

const titleVariant = cva('', {
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
    size: 'lg',
    color: 'default',
    align: 'left',
    weight: 'medium',
  },
});

type AllowedHeadings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TextProps<T extends AllowedHeadings = 'h1'> = {
  as?: T;
  children: React.ReactNode;
} & VariantProps<typeof titleVariant> &
  Omit<React.ComponentPropsWithoutRef<T>, 'as'>;

const Title = <T extends AllowedHeadings = 'h1'>({ as, size, color, weight, align, children }: TextProps<T>) => {
  const Component = as || 'h1';
  return <Component className={titleVariant({ size, color, weight, align })}>{children}</Component>;
};

export default Title;
