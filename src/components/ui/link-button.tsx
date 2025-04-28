'use client';
import Link from 'next/link';
import { buttonStyle } from '@/styles/button-styles';

type LinkButtonProps = {
  children: React.ReactNode;
  href: string;
  size?: 'large' | 'medium' | 'small' | 'fixed';
  square?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
  fontWeight?: 'normal' | 'medium' | 'bold' | 'black';
};

const LinkButton = (props: LinkButtonProps) => {
  const { children, href, target = '_self', square = false, size = 'medium', fontWeight = 'medium' } = props;
  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.blur();
  };

  return (
    <Link href={href} target={target} onClick={handleNavigate} className={buttonStyle({ size, square, fontWeight })}>
      {children}
    </Link>
  );
};

export default LinkButton;
