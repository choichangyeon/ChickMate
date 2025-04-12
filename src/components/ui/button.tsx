import { buttonVariants } from '@/styles/button-styles';
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

const Button = (props: ButtonProps | LinkButtonProps) => {
  const { children, color = 'primary', variant = 'contained', link, type = 'button' } = props;
  if (link) {
    return (
      <Link href={props.href} className={buttonVariants({ variant, color })}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={buttonVariants({ variant, color })}>
      {children}
    </button>
  );
};
export default Button;
