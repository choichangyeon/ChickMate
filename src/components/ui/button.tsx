import { buttonVariants } from '@/styles/button-styles';
import Link from 'next/link';

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: 'outline' | 'ghost' | 'contained';
  color?: 'primary' | 'secondary' | 'dark';
  size?: 'large' | 'medium' | 'small';
  square?: boolean;
};
type ButtonProps = ButtonBaseProps & {
  link?: false;
  type?: 'button' | 'submit' | 'reset';
  href?: never;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
type LinkButtonProps = ButtonBaseProps & {
  link: true;
  href: string;
  type?: never;
  onClick?: never;
};

const Button = (props: ButtonProps | LinkButtonProps) => {
  const { children, color = 'primary', variant = 'contained', link, size = 'medium', square = false } = props;

  if (link) {
    return (
      <Link href={props.href} className={buttonVariants({ variant, color, size, square })}>
        {children}
      </Link>
    );
  }

  const { type = 'button', onClick, disabled } = props;
  return (
    <button
      type={type}
      className={buttonVariants({ variant, color, size, square })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
