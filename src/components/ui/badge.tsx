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
}: Badge) => {
  return <span className={badgeStyle({ color, variant, size, mr, ml, mt, mb, my, mx })}>{children}</span>;
};

export default Badge;
