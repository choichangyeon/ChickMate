import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  variant?: 'outline' | 'ghost';
};

type ButtonProps = Props & {
  link?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

type LinkButtonProps = Props & {
  href: string;
};

const Button = (props: ButtonProps | LinkButtonProps) => {
  const { children, link = false, type } = props as ButtonProps;
  if (link) {
    const { href, children } = props as LinkButtonProps;
    return <LinkComp href={href}>{children}</LinkComp>;
  }

  return <button type={type}>{children}</button>;
};

export default Button;

export const LinkComp = (props: Omit<LinkButtonProps, 'as'>) => {
  const { href, children } = props;
  return <Link href={href}>{children}</Link>;
};
