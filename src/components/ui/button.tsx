import { buttonStyle } from '@/styles/button-styles';
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
  target?: never;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
type LinkButtonProps = ButtonBaseProps & {
  link: true;
  href: string;
  type?: never;
  onClick?: never;
  target?: '_self' | '_blank' | '_parent' | '_top';
};

const Button = (props: ButtonProps | LinkButtonProps) => {
  const {
    children,
    color = 'primary',
    variant = 'contained',
    link,
    size = 'medium',
    square = false,
    target = '_self',
  } = props;

  if (link) {
    return (
      <Link href={props.href} target={target} className={buttonStyle({ variant, color, size, square })}>
        {children}
      </Link>
    );
  }

  const { type = 'button', onClick, disabled } = props;
  return (
    <button type={type} className={buttonStyle({ variant, color, size, square })} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default Button;
