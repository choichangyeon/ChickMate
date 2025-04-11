import { cva } from 'class-variance-authority';
import Link from 'next/link';

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: 'outline' | 'ghost' | 'contained';
  color?: 'primary' | 'secondary';
};
type ButtonProps = ButtonBaseProps & {
  link?: false;
  type?: 'button' | 'submit' | 'reset';
  href?: never;
};
type LinkButtonProps = ButtonBaseProps & {
  link: true;
  href: string;
  type?: never;
};

const buttonVariants = cva('px-4 py-2 rounded-3xl', {
  variants: {
    variant: {
      contained: 'text-white bg-primary-orange-600',
      outline: 'border border-secondary-amber bg-transparent',
      ghost: 'border-none bg-transparent hover:text-white hover:bg-secondary-amber',
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

const Button = (props: ButtonProps | LinkButtonProps) => {
  const { children, color = 'primary', variant = 'contained' } = props;
  if ('link' in props && props.link) {
    return (
      <Link href={props.href} className={buttonVariants({ variant, color })}>
        {children}
      </Link>
    );
  }
  return (
    <button type={(props as ButtonProps).type || 'button'} className={buttonVariants({ variant, color })}>
      {children}
    </button>
  );
};
export default Button;
