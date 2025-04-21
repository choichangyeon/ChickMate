import clsx from 'clsx';
import { badgeStyle } from '@/styles/badge-styles';

type Margin = 0 | 1 | 2 | 3 | 4 | 5;
type Badge = {
  children: React.ReactNode;
  size?: 'small' | 'default';
  variant?: 'contained' | 'outline';
  color?: 'primary' | 'secondary' | 'dark';
  mx?: Margin;
  my?: Margin;
  mt?: Margin;
  mb?: Margin;
  ml?: Margin;
  mr?: Margin;
  display?: 'block' | 'inline' | 'inline-block';
};

const Badge = ({
  children,
  size = 'default',
  color = 'primary',
  variant = 'contained',
  mx = 0,
  my = 0,
  mt = 0,
  ml = 0,
  mr = 0,
  mb = 0,
  display = 'inline',
}: Badge) => {
  return (
    <span
      className={clsx(
        'rounded-[50px] text-center',
        badgeStyle({ color, variant, size, mr, ml, mt, mb, my, mx, display })
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
